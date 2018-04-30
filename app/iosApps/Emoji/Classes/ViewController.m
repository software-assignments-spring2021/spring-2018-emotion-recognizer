//
//  ViewController.m
//
//

#import "ViewController.h"

@interface ViewController ()

@property float stretchFactorX;
@property float stretchFactorY;
@property (strong) ExpressionViewController *smileView;
@property (strong) ExpressionViewController *browRaiseView;
@property (strong) ExpressionViewController *browFurrowView;
@property (strong) ExpressionViewController *lipCornerDepressorView;
@property (strong) ExpressionViewController *valenceView;
@property (strong) ExpressionViewController *engagementView;

@property (weak) IBOutlet UILabel *smileScore;
@property (weak) IBOutlet UILabel *browFurrowScore;
@property (weak) IBOutlet UILabel *browRaiseScore;
@property (weak) IBOutlet UILabel *lipCornerDepressorScore;
@property (weak) IBOutlet UILabel *valenceScore;
@property (strong) NSDate *dateOfLastFrame;
@property (strong) NSDate *dateOfLastProcessedFrame;

#if TARGET_IPHONE_SIMULATOR
@property (strong) NSArray *videoArray;
@property int nextVideo;
#endif

@end

@implementation ViewController

#pragma mark
#pragma mark ViewController Delegate Methods

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    // setup views
    self.imageView = [[UIImageView alloc] initWithFrame:CGRectMake(0.0, 0.0, 0.0, 0.0)];
    [self.imageView setTranslatesAutoresizingMaskIntoConstraints:NO];
    NSLayoutConstraint *constraint = [NSLayoutConstraint constraintWithItem:self.imageView
                                                                  attribute:NSLayoutAttributeHeight
                                                                  relatedBy:NSLayoutRelationEqual
                                                                     toItem:self.imageView
                                                                  attribute:NSLayoutAttributeWidth
                                                                 multiplier:4.0/3.0 //Aspect ratio: 4*height = 3*width
                                                                   constant:0.0f];
    [self.imageView addConstraint:constraint];
    
    constraint = [NSLayoutConstraint constraintWithItem:self.view
                                                                  attribute:NSLayoutAttributeLeading
                                                                  relatedBy:NSLayoutRelationEqual
                                                                     toItem:self.imageView
                                                                  attribute:NSLayoutAttributeLeading
                                                                 multiplier:1.0
                                                                   constant:0.0f];
    
    [self.view addConstraint:constraint];

    constraint = [NSLayoutConstraint constraintWithItem:self.view
                                              attribute:NSLayoutAttributeHeight
                                              relatedBy:NSLayoutRelationEqual
                                                 toItem:self.imageView
                                              attribute:NSLayoutAttributeHeight
                                             multiplier:1.0
                                               constant:0.0f];
    
    [self.view addConstraint:constraint];

    constraint = [NSLayoutConstraint constraintWithItem:self.view
                                              attribute:NSLayoutAttributeCenterY
                                              relatedBy:NSLayoutRelationEqual
                                                 toItem:self.imageView
                                              attribute:NSLayoutAttributeCenterY
                                             multiplier:1.0
                                               constant:0.0f];
    
    [self.view addConstraint:constraint];

    [self.view addSubview:self.imageView];

#if TARGET_IPHONE_SIMULATOR
    self.nextVideo = 0;
    self.videoArray = [[NSBundle mainBundle] URLsForResourcesWithExtension:@"m4v" subdirectory:nil];
    
    // create our detector with our desired facial expresions, using the front facing camera
    self.detector = [[AFDXDetector alloc] initWithDelegate:self
                                                 usingFile:[[NSBundle mainBundle] pathForResource:@"test" ofType:@"m4v"]];
#else
    // create our detector with our desired facial expresions, using the front facing camera
    self.detector = [[AFDXDetector alloc] initWithDelegate:self
                                               usingCamera:AFDX_CAMERA_FRONT];
#endif
    
    // tell the detector which facial expressions we want to measure
    self.detector.smile = TRUE;
    self.smileView = [[ExpressionViewController alloc] initWithName:@"SMILE"];

    self.detector.browRaise = TRUE;
    self.browRaiseView = [[ExpressionViewController alloc] initWithName:@"BROW RAISE"];

    self.detector.browFurrow = TRUE;
    self.browFurrowView = [[ExpressionViewController alloc] initWithName:@"BROW FURROW"];

    self.detector.lipCornerDepressor = TRUE;
    self.lipCornerDepressorView = [[ExpressionViewController alloc] initWithName:@"LIP DEPRESSOR"];

    self.detector.valence = TRUE;
    self.valenceView = [[ExpressionViewController alloc] initWithName:@"VALENCE"];

    self.detector.engagement = TRUE;
    self.engagementView = [[ExpressionViewController alloc] initWithName:@"ENGAGEMENT"];
    
    self.detector.sendUnprocessedFrames = YES;

    self.dateOfLastFrame = nil;
    self.dateOfLastProcessedFrame = nil;
    self.detector.licensePath = [[NSBundle mainBundle] pathForResource:@"sdk" ofType:@"license"];
    
    // let's start it up!
    NSError *error = [self.detector start];
    
    if (nil != error)
    {
        UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Detector Error" message:[error localizedDescription] delegate:self cancelButtonTitle:@"OK" otherButtonTitles:nil, nil];
        
        [alert show];
    }
}

- (void)viewWillAppear:(BOOL)animated;
{
    CGFloat borderOffset = 40.0;
    
    if (iPhoneInUse())
    {
        borderOffset *= 0.5;
    }
    
    [self.view setTranslatesAutoresizingMaskIntoConstraints:NO];
   
    ExpressionViewController *vc = self.smileView;

    {
        [self.view addSubview:vc.view];
        [vc.view setTranslatesAutoresizingMaskIntoConstraints:NO];

        [vc.view addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                             attribute:NSLayoutAttributeWidth
                                                             relatedBy:NSLayoutRelationEqual
                                                                toItem:nil
                                                             attribute:NSLayoutAttributeNotAnAttribute
                                                            multiplier:1.0
                                                              constant:vc.view.bounds.size.width]];
         
        [vc.view addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                            attribute:NSLayoutAttributeHeight
                                                            relatedBy:NSLayoutRelationEqual
                                                               toItem:nil
                                                            attribute:NSLayoutAttributeNotAnAttribute
                                                           multiplier:1.0
                                                             constant:vc.view.bounds.size.height]];
        
        [vc.view.superview addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                                      attribute:NSLayoutAttributeCenterX
                                                                      relatedBy:NSLayoutRelationEqual
                                                                         toItem:vc.view.superview
                                                                      attribute:NSLayoutAttributeCenterX
                                                                     multiplier:1.0
                                                                       constant:0.0]];
        
        [vc.view.superview addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                                      attribute:NSLayoutAttributeBottom
                                                                      relatedBy:NSLayoutRelationEqual
                                                                         toItem:vc.view.superview
                                                                      attribute:NSLayoutAttributeBottom
                                                                     multiplier:1.0
                                                                       constant:-10.0]];
    }
    
    vc = self.browRaiseView;
    {
        [self.view addSubview:vc.view];
        [vc.view setTranslatesAutoresizingMaskIntoConstraints:NO];
        
        [vc.view.superview addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                                      attribute:NSLayoutAttributeLeading
                                                                      relatedBy:NSLayoutRelationEqual
                                                                         toItem:vc.view.superview
                                                                      attribute:NSLayoutAttributeLeading
                                                                     multiplier:1.0
                                                                       constant:10.0]];
        
        [vc.view.superview addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                                      attribute:NSLayoutAttributeTop
                                                                      relatedBy:NSLayoutRelationEqual
                                                                         toItem:vc.view.superview
                                                                      attribute:NSLayoutAttributeTop
                                                                     multiplier:1.0
                                                                       constant:30.0]];
    }
    
    vc = self.browFurrowView;
    {
        [self.view addSubview:vc.view];
        [vc.view setTranslatesAutoresizingMaskIntoConstraints:NO];
        
        [vc.view addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                            attribute:NSLayoutAttributeWidth
                                                            relatedBy:NSLayoutRelationEqual
                                                               toItem:nil
                                                            attribute:NSLayoutAttributeNotAnAttribute
                                                           multiplier:1.0
                                                             constant:vc.view.bounds.size.width]];
        
        [vc.view addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                            attribute:NSLayoutAttributeHeight
                                                            relatedBy:NSLayoutRelationEqual
                                                               toItem:nil
                                                            attribute:NSLayoutAttributeNotAnAttribute
                                                           multiplier:1.0
                                                             constant:vc.view.bounds.size.height]];
        
        [vc.view.superview addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                                      attribute:NSLayoutAttributeTrailing
                                                                      relatedBy:NSLayoutRelationEqual
                                                                         toItem:vc.view.superview
                                                                      attribute:NSLayoutAttributeTrailing
                                                                     multiplier:1.0
                                                                       constant:-10.0]];
        
        [vc.view.superview addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                                      attribute:NSLayoutAttributeTop
                                                                      relatedBy:NSLayoutRelationEqual
                                                                         toItem:vc.view.superview
                                                                      attribute:NSLayoutAttributeTop
                                                                     multiplier:1.0
                                                                       constant:30.0]];
    }
    
    vc = self.lipCornerDepressorView;
    {
        [self.view addSubview:vc.view];
        [vc.view setTranslatesAutoresizingMaskIntoConstraints:NO];
        
        [vc.view addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                            attribute:NSLayoutAttributeWidth
                                                            relatedBy:NSLayoutRelationEqual
                                                               toItem:nil
                                                            attribute:NSLayoutAttributeNotAnAttribute
                                                           multiplier:1.0
                                                             constant:vc.view.bounds.size.width]];
        
        [vc.view addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                            attribute:NSLayoutAttributeHeight
                                                            relatedBy:NSLayoutRelationEqual
                                                               toItem:nil
                                                            attribute:NSLayoutAttributeNotAnAttribute
                                                           multiplier:1.0
                                                             constant:vc.view.bounds.size.height]];
        
        [vc.view.superview addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                                      attribute:NSLayoutAttributeTrailing
                                                                      relatedBy:NSLayoutRelationEqual
                                                                         toItem:vc.view.superview
                                                                      attribute:NSLayoutAttributeTrailing
                                                                     multiplier:1.0
                                                                       constant:-10.0]];
        
        [vc.view.superview addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                                      attribute:NSLayoutAttributeBottom
                                                                      relatedBy:NSLayoutRelationEqual
                                                                         toItem:vc.view.superview
                                                                      attribute:NSLayoutAttributeBottom
                                                                     multiplier:1.0
                                                                       constant:-10.0]];
    }
    
    vc = self.valenceView;
    {
        [self.view addSubview:vc.view];
        [vc.view setTranslatesAutoresizingMaskIntoConstraints:NO];
        
        [vc.view addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                            attribute:NSLayoutAttributeWidth
                                                            relatedBy:NSLayoutRelationEqual
                                                               toItem:nil
                                                            attribute:NSLayoutAttributeNotAnAttribute
                                                           multiplier:1.0
                                                             constant:vc.view.bounds.size.width]];
        
        [vc.view addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                            attribute:NSLayoutAttributeHeight
                                                            relatedBy:NSLayoutRelationEqual
                                                               toItem:nil
                                                            attribute:NSLayoutAttributeNotAnAttribute
                                                           multiplier:1.0
                                                             constant:vc.view.bounds.size.height]];
        
        [vc.view.superview addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                                      attribute:NSLayoutAttributeLeading
                                                                      relatedBy:NSLayoutRelationEqual
                                                                         toItem:vc.view.superview
                                                                      attribute:NSLayoutAttributeLeading
                                                                     multiplier:1.0
                                                                       constant:10.0]];
        
        [vc.view.superview addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                                      attribute:NSLayoutAttributeBottom
                                                                      relatedBy:NSLayoutRelationEqual
                                                                         toItem:vc.view.superview
                                                                      attribute:NSLayoutAttributeBottom
                                                                     multiplier:1.0
                                                                       constant:-(self.engagementView.view.bounds.size.height + 20.0)]];
    }

    vc = self.engagementView;
    {
        [self.view addSubview:vc.view];
        [vc.view setTranslatesAutoresizingMaskIntoConstraints:NO];
        
        [vc.view addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                            attribute:NSLayoutAttributeWidth
                                                            relatedBy:NSLayoutRelationEqual
                                                               toItem:nil
                                                            attribute:NSLayoutAttributeNotAnAttribute
                                                           multiplier:1.0
                                                             constant:vc.view.bounds.size.width]];
        
        [vc.view addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                            attribute:NSLayoutAttributeHeight
                                                            relatedBy:NSLayoutRelationEqual
                                                               toItem:nil
                                                            attribute:NSLayoutAttributeNotAnAttribute
                                                           multiplier:1.0
                                                             constant:vc.view.bounds.size.height]];
        
        [vc.view.superview addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                                      attribute:NSLayoutAttributeLeading
                                                                      relatedBy:NSLayoutRelationEqual
                                                                         toItem:vc.view.superview
                                                                      attribute:NSLayoutAttributeLeading
                                                                     multiplier:1.0
                                                                       constant:10.0]];
        
        [vc.view.superview addConstraint:[NSLayoutConstraint constraintWithItem:vc.view
                                                                      attribute:NSLayoutAttributeBottom
                                                                      relatedBy:NSLayoutRelationEqual
                                                                         toItem:vc.view.superview
                                                                      attribute:NSLayoutAttributeBottom
                                                                     multiplier:1.0
                                                                       constant:-10.0]];
    }
}

- (void)dealloc;
{
    self.detector = nil;
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


#pragma mark -
#pragma mark AFDXDetectorDelegate Methods

- (void)detectorDidFinishProcessing:(AFDXDetector *)detector;
{
}

- (void)detectorDidStartDetectingFace:(AFDXDetector *)detector;
{
    [self.smileView faceDetected];
    [self.browRaiseView faceDetected];
    [self.browFurrowView faceDetected];
    [self.lipCornerDepressorView faceDetected];
    [self.valenceView faceDetected];
    [self.engagementView faceDetected];
}

- (void)detectorDidStopDetectingFace:(AFDXDetector *)detector;
{
    [self.smileView faceUndetected];
    [self.browRaiseView faceUndetected];
    [self.browFurrowView faceUndetected];
    [self.lipCornerDepressorView faceUndetected];
    [self.valenceView faceUndetected];
    [self.engagementView faceUndetected];
}

- (void)detector:(AFDXDetector *)detector hasResults:(NSArray *)metrics forImage:(UIImage *)image atTime:(NSTimeInterval)time;
{
    // Since all video frames are now passed, we determine if this is an "analyzed" frame by looking at the
    // metrics object. If it's nil, we merely set the image of our image view to the passed image, and do
    // some math to compute the frame rate.
    if (nil == metrics)
    {
        [self.imageView setImage:image];
#if TARGET_IPHONE_SIMULATOR
        static NSTimeInterval last = 0;
        [[NSRunLoop currentRunLoop] runUntilDate:[NSDate dateWithTimeIntervalSinceNow:(time - last) * 0.1]];
        last = time;
#endif
    }
    else
    {
    }
    
    if (nil == metrics)
    {
        // compute frames per second and show
        NSDate *now = [NSDate date];
        
        if (nil != self.dateOfLastFrame)
        {
            NSTimeInterval interval = [now timeIntervalSinceDate:self.dateOfLastFrame];
            
            if (interval > 0)
            {
                float fps = 1.0 / interval;
                self.fps.text = [NSString stringWithFormat:@"FPS(C): %.1f", fps];
            }
        }
        
        self.dateOfLastFrame = now;
    }
    else
    {
        // This frame has metrics data, so it has been processed by the detector.
        // Well compute the frame rate for processed frames (P)
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
        
        // Handle each metric in the array
        for (AFDXMetric *metric in metrics)
        {
            // dispatch the metric to the appropriate handler
            if ([metric isKindOfClass:[AFDXSmileMetric class]])
            {
                [self handleSmile:(AFDXSmileMetric *)metric];
            }
            else
            if ([metric isKindOfClass:[AFDXBrowFurrowMetric class]])
            {
                [self handleBrowFurrow:(AFDXBrowFurrowMetric *)metric];
            }
            else
            if ([metric isKindOfClass:[AFDXBrowRaiseMetric class]])
            {
                [self handleBrowRaise:(AFDXBrowRaiseMetric *)metric];
            }
            else
            if ([metric isKindOfClass:[AFDXLipCornerDepressorMetric class]])
            {
                [self handleLipCornerDepressor:(AFDXLipCornerDepressorMetric *)metric];
            }
            else
            if ([metric isKindOfClass:[AFDXValenceMetric class]])
            {
                [self handleValence:(AFDXValenceMetric *)metric];
            }
            else
            if ([metric isKindOfClass:[AFDXEngagementMetric class]])
            {
                [self handleEngagement:(AFDXEngagementMetric *)metric];
            }
        }
    }
}


#pragma mark -
#pragma mark Metric-Specific Methods

- (void)handleSmile:(AFDXSmileMetric *)metric;
{
    float prob = [metric.value floatValue];

    self.smileView.metric = prob;
}

- (void)handleBrowFurrow:(AFDXBrowFurrowMetric *)metric;
{
    float prob = [metric.value floatValue];
    
    self.browFurrowView.metric = prob;
}

- (void)handleBrowRaise:(AFDXBrowRaiseMetric *)metric;
{
    float prob = [metric.value floatValue];
    
    self.browRaiseView.metric = prob;
}

- (void)handleLipCornerDepressor:(AFDXLipCornerDepressorMetric *)metric;
{
    float prob = [metric.value floatValue];
    
    self.lipCornerDepressorView.metric = prob;
}

- (void)handleValence:(AFDXValenceMetric *)metric;
{
    float prob = [metric.value floatValue];
    
    self.valenceView.metric = prob;
}

- (void)handleEngagement:(AFDXEngagementMetric *)metric;
{
    float prob = [metric.value floatValue];
    
    self.engagementView.metric = prob;
}

@end
