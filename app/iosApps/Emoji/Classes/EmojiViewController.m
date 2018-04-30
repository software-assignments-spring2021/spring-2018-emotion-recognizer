//
//  EmojiViewController.m
//


// If this is being compiled for the iOS simulator, a demo mode is used since the camera isn't supported.
#if TARGET_IPHONE_SIMULATOR
#define DEMO_MODE
#endif

#import <CoreMotion/CoreMotion.h>

#import "UIDeviceHardware.h"
#import "EmojiViewController.h"
#import "EmojiFoundViewController.h"
#import "SoundEffect.h"

@interface EmojiViewController ()

@property (strong) AFDXFace *targetFace;

@property (strong) NSDate *dateOfLastFrame;
@property (strong) NSDate *dateOfLastProcessedFrame;
@property (strong) NSString *jsonFilename;
@property (strong) NSString *mediaFilename;

@property (strong) NSMutableArray *facePointsToDraw;
@property (strong) NSMutableArray *faceRectsToDraw;
@property (strong) NSMutableArray *viewControllers;

@property (strong) NSArray *availableClassifiers; // the array of dictionaries which contain all available classifiers
@property (strong) NSArray *emotions;   // the array of dictionaries of all emotion classifiers
@property (strong) NSArray *expressions; // the array of dictionaries of all expression classifiers
@property (strong) NSArray *emojis; // the array of dictionaries of all emoji classifiers

@property (strong) CMMotionManager *motionManager;

@property (strong) NSTimer *timer;
@property (strong) SoundEffect *sound;

@property (assign) AFDXCameraType cameraToUse;
@property (strong) NSMutableArray *lastEmojis;
@property (assign) BOOL ignoreRemainingCalls;

@end

@implementation EmojiViewController

#define EMOJI_QUEUE_DEPTH 3

#pragma mark -
#pragma mark AFDXDetectorDelegate Methods

#ifdef DEMO_MODE
- (void)detectorDidFinishProcessing:(AFDXDetector *)detector;
{
    [self stopDetector];
}
#endif

- (void)processedImageReady:(AFDXDetector *)detector image:(UIImage *)image faces:(NSDictionary *)faces atTime:(NSTimeInterval)time;
{
    if (self.ignoreRemainingCalls == TRUE) {
        return;
    }
    
    NSDate *now = [NSDate date];
    
    if (nil != self.dateOfLastProcessedFrame)
    {
        NSTimeInterval interval = [now timeIntervalSinceDate:self.dateOfLastProcessedFrame];
        
        if (interval > 0)
        {
            float fps = 1.0 / interval;
            self.fpsProcessed.text = [NSString stringWithFormat:@"FPS(P): %.1f", fps];
        }
    }
    
    self.dateOfLastProcessedFrame = now;
    
    // setup arrays of points and rects
    self.facePointsToDraw = [NSMutableArray new];
    self.faceRectsToDraw = [NSMutableArray new];

    // Handle each metric in the array
    NSArray *array = [faces allValues];
    if ([array count] > 0) {
        self.targetFace = [[faces allValues] objectAtIndex:0];
    } else {
        self.targetFace = nil;
    }

    // flip image if the front camera is being used so that the perspective is mirrored.
    if (self.cameraToUse == AFDX_CAMERA_FRONT) {
        image = [UIImage imageWithCGImage:image.CGImage
                                    scale:image.scale
                              orientation:UIImageOrientationUpMirrored];
    }
    
    self.targetFace.userInfo = @{@"image": image};

    if (self.targetFace != nil) {
        // add dominant emoji
        NSNumber *e = [NSNumber numberWithInteger:self.targetFace.emojis.dominantEmoji];
        if (self.lastEmojis == nil) {
            self.lastEmojis = [NSMutableArray array];
        }
        [self.lastEmojis addObject:e];
        if ([self.lastEmojis count] > EMOJI_QUEUE_DEPTH) {
            // remove head object (least recent)
            [self.lastEmojis removeObjectAtIndex:0];
            
            BOOL allEqual = TRUE; // assume all will be equal
            
            // evaluate all three to see if they are the same
//            NSLog(@"----");
            for (int i = 0; i < EMOJI_QUEUE_DEPTH; i++) {
//                NSLog(@"%@", [self.lastEmojis objectAtIndex:i]);
            }
//            NSLog(@"----");
            
            for (int i = 0; i < EMOJI_QUEUE_DEPTH - 1; i++) {
                
                Emoji e1 = [[self.lastEmojis objectAtIndex:i + 0] intValue];
                Emoji e2 = [[self.lastEmojis objectAtIndex:i + 1] intValue];
                
                if (e1 == AFDX_EMOJI_NONE || e2 == AFDX_EMOJI_NONE || e1 != e2) {
                    allEqual = FALSE;
                    break;
                }
            }
            
            if (allEqual == TRUE) {
                self.ignoreRemainingCalls = TRUE;
                [self stopDetector];
                [self performSegueWithIdentifier:@"emojiFound" sender:self];
                return;
            }
        }
    }
};

- (UIImage *)captureSnapshot;
{
    UIImage *result;
    
    self.settingsView.hidden = YES;

    UIGraphicsBeginImageContext(self.view.frame.size);
    [self.view drawViewHierarchyInRect:self.view.frame afterScreenUpdates:YES];
    result = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();

    self.settingsView.hidden = NO;

    return result;
}

- (IBAction)cameraButtonTouched:(id)sender;
{
    self.sound = [[SoundEffect alloc] initWithSoundNamed:@"camera-shutter.mp3"];
    [self.sound play];
    UIImage *snap = [self captureSnapshot];
    if (nil != snap) {
        UIImageWriteToSavedPhotosAlbum(snap, nil, nil, nil);
    }
}

- (IBAction)cameraSwapButtonTouched:(id)sender;
{
    if (self.cameraToUse == AFDX_CAMERA_FRONT) {
        self.cameraToUse = AFDX_CAMERA_BACK;
    } else {
        self.cameraToUse = AFDX_CAMERA_FRONT;
    }
    
    // restart the detector so that the other camera comes into view
    [self startDetector];
}

- (void)unprocessedImageReady:(AFDXDetector *)detector image:(UIImage *)image atTime:(NSTimeInterval)time;
{
    __block EmojiViewController *weakSelf = self;
    __block UIImage *newImage = image;
    dispatch_async(dispatch_get_main_queue(), ^{
        // do drawing here
        NSArray *rectangles = nil;
        if (self.targetFace != nil) {
            rectangles = @[[NSValue valueWithCGRect:weakSelf.targetFace.faceBounds]];
        }
        newImage = [AFDXDetector imageByDrawingPoints:nil
                                    andRectangles:rectangles
                                        andImages:nil
                                       withRadius:1.4
                                  usingPointColor:[UIColor whiteColor]
                              usingRectangleColor:[UIColor whiteColor]
                                  usingImageRects:nil
                                          onImage:newImage];
    
        // flip image if the front camera is being used so that the perspective is mirrored.
        if (weakSelf.cameraToUse == AFDX_CAMERA_FRONT)
        {
            UIImage *flippedImage = [UIImage imageWithCGImage:newImage.CGImage
                                                        scale:image.scale
                                                  orientation:UIImageOrientationUpMirrored];
            [weakSelf.imageView setImage:flippedImage];
        }
        else
        {
            [weakSelf.imageView setImage:newImage];
        }
    });
    
#ifdef DEMO_MODE
    static NSTimeInterval last = 0;
    const CGFloat timeConstant = 0.0000001;
    [[NSRunLoop currentRunLoop] runUntilDate:[NSDate dateWithTimeIntervalSinceNow:(time - last) * timeConstant]];
    last = time;
#endif
    
    // compute frames per second and show
    NSDate *now = [NSDate date];
    
    if (nil != weakSelf.dateOfLastFrame)
    {
        NSTimeInterval interval = [now timeIntervalSinceDate:weakSelf.dateOfLastFrame];
        
        if (interval > 0)
        {
            float fps = 1.0 / interval;
            dispatch_async(dispatch_get_main_queue(), ^{
                weakSelf.fps.text = [NSString stringWithFormat:@"FPS(C): %.1f", fps];
            });
        }
    }
    
    weakSelf.dateOfLastFrame = now;
}

- (void)detector:(AFDXDetector *)detector hasResults:(NSMutableDictionary *)faces forImage:(UIImage *)image atTime:(NSTimeInterval)time;
{
    if (nil == faces)
    {
        [self unprocessedImageReady:detector image:image atTime:time];
    }
    else
    {
        [self processedImageReady:detector image:image faces:faces atTime:time];
    }
}

- (void)detector:(AFDXDetector *)detector didStartDetectingFace:(AFDXFace *)face;
{
    
    self.timer = [NSTimer scheduledTimerWithTimeInterval:7.5
                                                  target:self
                                                selector:@selector(timerFired:)
                                                userInfo:nil
                                                 repeats:nil];
}

- (void)detector:(AFDXDetector *)detector didStopDetectingFace:(AFDXFace *)face;
{
    [self.timer invalidate];
}


#pragma mark -
#pragma mark ViewController Delegate Methods

+ (void)initialize;
{
    [[NSUserDefaults standardUserDefaults] registerDefaults:@{@"drawFacePoints" : [NSNumber numberWithBool:NO]}];
    [[NSUserDefaults standardUserDefaults] registerDefaults:@{@"drawEmojis" : [NSNumber numberWithBool:YES]}];
}

-(BOOL)canBecomeFirstResponder;
{
    return YES;
}

- (void)dealloc;
{
    self.detector = nil;
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

- (void)prepareForBackground:(id)sender;
{
    [self stopDetector];
}

- (void)prepareForForeground:(id)sender;
{
    [self startDetector];
}

- (void)viewDidLoad;
{
    [super viewDidLoad];
    
    self.cameraToUse = AFDX_CAMERA_FRONT;
    
    CGFloat scaleFactor = 1;
    BOOL iPhone = ([[UIDevice currentDevice] userInterfaceIdiom] == UIUserInterfaceIdiomPhone);
    if (iPhone == TRUE) {
        scaleFactor *= 1;
    }
    
    NSString *version = [[[NSBundle mainBundle] infoDictionary] objectForKey:(NSString *)kCFBundleVersionKey];
    NSString *shortVersion = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleShortVersionString"];

    self.versionLabel_compact.text = [NSString stringWithFormat:@"%@ (%@)", shortVersion, version];
    self.versionLabel_regular.text = self.versionLabel_compact.text;
    
    self.versionLabel_compact.hidden = YES;
    self.versionLabel_regular.hidden = YES;
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(prepareForBackground:)
                                                 name:UIApplicationDidEnterBackgroundNotification
                                               object:nil];

    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(prepareForForeground:)
                                                 name:UIApplicationWillEnterForegroundNotification
                                               object:nil];
}

- (void)timerFired:(NSTimer *)timer;
{
    if (self.targetFace != nil) {
        [self.detector stop];
        [self performSegueWithIdentifier:@"emojiFound" sender:self];
    }
}

- (void)viewWillDisappear:(BOOL)animated;
{
    [self.timer invalidate];
}

- (void)viewWillAppear:(BOOL)animated;
{
}

- (void)motionEnded:(UIEventSubtype)motion withEvent:(UIEvent *)event;
{
    if (event.subtype == UIEventSubtypeMotionShake)
    {
        self.versionLabel_compact.hidden = !self.versionLabel_compact.hidden;
        self.versionLabel_regular.hidden = !self.versionLabel_regular.hidden;
    }
    
    [super motionEnded:motion withEvent:event];
}

- (void)viewDidAppear:(BOOL)animated;
{
    [super viewDidAppear:animated];
    [self becomeFirstResponder];

#ifdef DEMO_MODE
    //self.mediaFilename = //[[NSBundle mainBundle] pathForResource:@"face1" ofType:@"m4v"];
//    self.mediaFilename = [[NSBundle mainBundle] pathForResource:@"faces_in_out" ofType:@"mp4"];
    
    if ([[NSFileManager defaultManager] fileExistsAtPath:self.mediaFilename] == YES)
    {
        [self startDetector];
    }
#else
    AVAuthorizationStatus status = [AVCaptureDevice authorizationStatusForMediaType:AVMediaTypeVideo];
    if(status == AVAuthorizationStatusAuthorized) {
        // authorized
        [self startDetector];
    } else if(status == AVAuthorizationStatusDenied){
        // denied
        [[[UIAlertView alloc] initWithTitle:@"Error!"
                                    message:@"AffdexMe doesn't have permission to use camera, please change privacy settings"
                                   delegate:self
                          cancelButtonTitle:@"OK"
                          otherButtonTitles:nil] show];
    } else if(status == AVAuthorizationStatusRestricted){
        // restricted
    } else if(status == AVAuthorizationStatusNotDetermined){
        // not determined
        [AVCaptureDevice requestAccessForMediaType:AVMediaTypeVideo completionHandler:^(BOOL granted) {
            if(granted){
                [self startDetector];
            } else {
                [[[UIAlertView alloc] initWithTitle:@"Error!"
                                            message:@"AffdexMe doesn't have permission to use camera, please change privacy settings"
                                           delegate:self
                                  cancelButtonTitle:@"OK"
                                  otherButtonTitles:nil] show];
            }
        }];
    }
#endif
}

- (void)stopDetector;
{
    [self.detector stop];
}

- (void)startDetector;
{
    self.ignoreRemainingCalls = FALSE;
    [self.detector stop];
    
#ifdef DEMO_MODE
    // create our detector with our desired facial expresions, using the front facing camera
    self.detector = [[AFDXDetector alloc] initWithDelegate:self usingFile:self.mediaFilename maximumFaces:1];
#else
    // create our detector with our desired facial expresions, using the front facing camera
    self.detector = [[AFDXDetector alloc] initWithDelegate:self usingCamera:self.cameraToUse maximumFaces:1];
#endif
    

    self.drawFacePoints = [[[NSUserDefaults standardUserDefaults] objectForKey:@"drawFacePoints"] boolValue];
    self.drawFaceRect = self.drawFacePoints;
    self.drawAppearanceIcons = [[[NSUserDefaults standardUserDefaults] objectForKey:@"drawAppearanceIcons"] boolValue];
    self.drawEmojis = [[[NSUserDefaults standardUserDefaults] objectForKey:@"drawEmojis"] boolValue];
    
    NSInteger maxProcessRate = [[[NSUserDefaults standardUserDefaults] objectForKey:@"maxProcessRate"] integerValue];
    if (0 == maxProcessRate)
    {
        maxProcessRate = 5;
    }
    
    if ([[[UIDeviceHardware new] platformString] isEqualToString:@"iPhone 4S"])
    {
        maxProcessRate = 4;
    }
    
    // this seems to work
    maxProcessRate = 5;
    self.detector.maxProcessRate = maxProcessRate;
    
    self.dateOfLastFrame = nil;
    self.dateOfLastProcessedFrame = nil;
    
    // tell the detector which facial expressions we want to measure
    [self.detector setDetectAllEmotions:NO];
    [self.detector setDetectAllExpressions:NO];
    [self.detector setDetectEmojis:YES];
    self.detector.gender = TRUE;
    self.detector.glasses = TRUE;
    
    for (NSString *s in self.selectedClassifiers)
    {
        for (NSArray *a in self.availableClassifiers)
        {
            for (NSDictionary *d in a) {
                if ([s isEqualToString:[d objectForKey:@"name"]])
                {
                    NSString *pn = [d objectForKey:@"propertyName"];
                    if (nil != pn) {
                        [self.detector setValue:[NSNumber numberWithBool:YES] forKey:pn];
                    } else {
                        [self.detector setDetectEmojis:YES];
                    }
                    break;
                }
            }
        }
    }
    
    // let's start it up!
    NSError *error = [self.detector start];
    
    if (nil != error)
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Detector Error" message:[error localizedDescription] delegate:self cancelButtonTitle:@"OK" otherButtonTitles:nil, nil];
        
        [alert show];
        
        return;
    }
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
}

-(void)addSubView:(UIView *)highlightView withFrame:(CGRect)frame
{
    highlightView.frame = frame;
    highlightView.layer.borderWidth = 1;
    highlightView.layer.borderColor = [[UIColor whiteColor] CGColor];
    [self.imageView addSubview:highlightView];
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations;
{
    NSUInteger result;
    
    result = UIInterfaceOrientationMaskAll;
    
    return result;
}

- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender;
{
    EmojiFoundViewController *vc = segue.destinationViewController;
    
    vc.face = self.targetFace;
}

-(IBAction)prepareForUnwind:(UIStoryboardSegue *)segue
{
}


@end
