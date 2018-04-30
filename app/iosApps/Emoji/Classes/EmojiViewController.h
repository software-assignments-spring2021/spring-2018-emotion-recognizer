//
//  EmojiViewController.h
//  faceDetection


#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>
#import <Affdex/Affdex.h>

@interface EmojiViewController : UIViewController <AFDXDetectorDelegate, AVCaptureVideoDataOutputSampleBufferDelegate>

@property (strong) IBOutlet UIImageView *imageView;
@property (weak) IBOutlet UIImageView *processedImageView;
@property (strong) AVCaptureSession *session;
@property (weak) IBOutlet UILabel *fps;
@property (weak) IBOutlet UILabel *fpsProcessed;
@property (strong) AFDXDetector *detector;
@property (assign) BOOL drawFacePoints;
@property (assign) BOOL drawAppearanceIcons;
@property (assign) BOOL drawEmojis;
@property (assign) BOOL drawFaceRect;
@property (weak) IBOutlet UIView *classifiersView;
@property (weak, nonatomic) IBOutlet UIView *settingsView;

@property (strong) NSMutableArray *selectedClassifiers;

@property (weak) IBOutlet UILabel *versionLabel_compact;
@property (weak) IBOutlet UILabel *versionLabel_regular;

- (void)startDetector;
- (void)stopDetector;

- (IBAction)cameraButtonTouched:(id)sender;
- (IBAction)cameraSwapButtonTouched:(id)sender;

@end
