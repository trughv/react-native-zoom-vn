//
//  MeetingViewController.m
//  ZoomiOSSDKDemoInObjC
//
//  Created by Manh Pham on 11/19/22.
//  Copyright © 2022 Zoom Video Communications. All rights reserved.
//

#import "MeetingViewController.h"
#define SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO(v)  ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedAscending)
#define IS_IPAD (UI_USER_INTERFACE_IDIOM() == UIUserInterfaceIdiomPad)
#define SHRINKMODEWIDTH (IS_IPAD ? 200 : 90)
#define SHRINKMODEHEIGHT (SHRINKMODEWIDTH*4/3)
@interface MeetingViewController ()<MobileRTCAnnotationServiceDelegate, MobileRTCWaitingRoomServiceDelegate>
@property (retain, nonatomic) UIPanGestureRecognizer    * panGesture;
@property (strong, nonatomic) UIView                    * baseView;
@end

@implementation MeetingViewController
- (UIView*)baseView
{
    if (!_baseView)
    {
        _baseView = [[UIView alloc] initWithFrame:self.view.bounds];
        _baseView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    }
    return _baseView;
}

- (VideoViewController*)videoVC
{
    if (!_videoVC)
    {
        _videoVC = [[VideoViewController alloc]init];
        _videoVC.view.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    }
    return _videoVC;
}

- (VideoViewController*)remoteVC
{
    if (!_remoteVC)
    {
        _remoteVC = [[VideoViewController alloc]init];
        _remoteVC.view.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    }
    return _remoteVC;
}
- (void)initGuestureRecognizer
{
    if (!_panGesture)
    {
        UIPanGestureRecognizer *pan = [[UIPanGestureRecognizer alloc]initWithTarget:self action:@selector(onPanView:)];
        self.panGesture = pan;
        [self.view addGestureRecognizer:pan];
    }
}

- (void)disableGuestureRecognizer
{
    self.panGesture.enabled = NO;
}

- (void)enableGuestureRecognizer
{
    self.panGesture.enabled = YES;
}

- (void)onPanView:(UIPanGestureRecognizer*)pan
{
   if (!self.parentViewController)
   {
       return;
   }
   
   UIView * parentView = self.parentViewController.view;
   CGPoint center = pan.view.center;
   
   CGPoint translation = [pan translationInView:parentView];
   
   pan.view.center = CGPointMake(center.x + translation.x, center.y + translation.y);
   [pan setTranslation:CGPointZero inView:parentView];
   
   if (pan.state != UIGestureRecognizerStateEnded) {
       return;
   }
   
   CGPoint velocity = [pan velocityInView:parentView];
   CGFloat magnitude = sqrtf((velocity.x * velocity.x) + (velocity.y * velocity.y));
   CGFloat slideMult = magnitude / 500;
   
   float slideFactor = 0.1 * slideMult;
   CGPoint finalPoint = CGPointMake(center.x + (velocity.x * slideFactor), center.y + (velocity.y * slideFactor));
   
   finalPoint.x = MIN(MAX(finalPoint.x, SHRINKMODEWIDTH / 2.0),parentView.bounds.size.width - SHRINKMODEWIDTH / 2.0);
   finalPoint.y = MIN(MAX(finalPoint.y, SHRINKMODEHEIGHT / 2.0),parentView.bounds.size.height - SHRINKMODEHEIGHT / 2.0);
   
   [UIView animateWithDuration:slideFactor*2
                         delay:0
                       options:UIViewAnimationOptionCurveEaseOut
                    animations:^{
                        pan.view.center = finalPoint;
                    }
                    completion:nil];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    self.view.backgroundColor = [UIColor blackColor];
    
    [self.view addSubview:self.baseView];
//    [self initGuestureRecognizer];
    [self showVideoView];
    
    MobileRTCAnnotationService *as = [[MobileRTC sharedRTC] getAnnotationService];
    MobileRTCWaitingRoomService *ws = [[MobileRTC sharedRTC] getWaitingRoomService];
    as.delegate = self;
    ws.delegate = self;
    
}

- (void)dealloc {
    MobileRTCAnnotationService *as = [[MobileRTC sharedRTC] getAnnotationService];
    MobileRTCWaitingRoomService *ws = [[MobileRTC sharedRTC] getWaitingRoomService];
    as.delegate = nil;
    ws.delegate = nil;
}

/*
 #pragma mark - Navigation
 
 // In a storyboard-based application, you will often want to do a little preparation before navigation
 - (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender {
 // Get the new view controller using [segue destinationViewController].
 // Pass the selected object to the new view controller.
 }
 */

- (void)showVideoView {
    { // remote
        [self addChildViewController:self.remoteVC];
        [self.baseView addSubview:self.remoteVC.view];
        [self.remoteVC didMoveToParentViewController:self];
        self.remoteVC.view.translatesAutoresizingMaskIntoConstraints = NO;
        [NSLayoutConstraint activateConstraints: @[
            [self.remoteVC.view.topAnchor constraintEqualToAnchor:self.baseView.topAnchor],
            [self.remoteVC.view.leadingAnchor constraintEqualToAnchor:self.baseView.leadingAnchor],
            [self.baseView.trailingAnchor constraintEqualToAnchor:self.remoteVC.view.trailingAnchor],
            [self.baseView.bottomAnchor constraintEqualToAnchor:self.remoteVC.view.bottomAnchor]
        ]];
    }
    { // selfie
        [self addChildViewController:self.videoVC];
        [self.baseView addSubview:self.videoVC.view];
        [self.videoVC didMoveToParentViewController:self];
        self.videoVC.view.translatesAutoresizingMaskIntoConstraints = NO;
        [NSLayoutConstraint activateConstraints: @[
            [self.videoVC.view.widthAnchor constraintEqualToAnchor:self.baseView.widthAnchor multiplier:0.2],
            [self.videoVC.view.heightAnchor constraintEqualToAnchor:self.baseView.heightAnchor multiplier:0.2],
            [self.baseView.trailingAnchor constraintEqualToAnchor:self.videoVC.view.trailingAnchor constant:16],
            [self.baseView.bottomAnchor constraintEqualToAnchor:self.videoVC.view.bottomAnchor]
        ]];
    }
  
}

- (void)updateRemoteVideoFor: (NSUInteger) userID {
    if (userID != [[[MobileRTC sharedRTC] getMeetingService] myselfUserID]) {
        [self.remoteVC.videoView showAttendeeVideoWithUserID: userID];
    }
   
}

- (void) updateMyVideo {
    [self.videoVC.videoView showAttendeeVideoWithUserID: [[[MobileRTC sharedRTC] getMeetingService] myselfUserID]];
}
- (void) updateMyAudioStatus {
    
}
- (void) updateMyVideoStatus {
    
}
#pragma mark - waiting room service delegate -
- (void)onWaitingRoomUserJoin:(NSUInteger)userId {
    MobileRTCWaitingRoomService *ws = [[MobileRTC sharedRTC] getWaitingRoomService];
    NSArray *arr = [ws waitingRoomList];
    MobileRTCMeetingUserInfo *userInfo = [ws waitingRoomUserInfoByID:userId];
    NSLog(@"Waiting Room: %@", arr);
    NSLog(@"userInfo: %@", userInfo);
    [ws admitToMeeting:userId];
}

- (void)onWaitingRoomUserLeft:(NSUInteger)userId {
    MobileRTCWaitingRoomService *ws = [[MobileRTC sharedRTC] getWaitingRoomService];
    MobileRTCMeetingUserInfo *userInfo = [ws waitingRoomUserInfoByID:userId];
    NSLog(@"userInfo: %@", userInfo);
}

@end
@implementation  MeetingViewController (MeetingDelegate)

- (void)onMeetingStateChange:(MobileRTCMeetingState)state
{
    if (state == MobileRTCMeetingState_InMeeting) {
        [self.videoVC.preVideoView removeFromSuperview];
    }
}

- (void)onSinkMeetingActiveVideo:(NSUInteger)userID
{
    [self updateRemoteVideoFor: userID];
}

- (void)onSinkMeetingPreviewStopped
{
}

- (void)onSinkMeetingAudioStatusChange:(NSUInteger)userID
{
    [self updateMyAudioStatus];

    [self updateRemoteVideoFor: userID];
}

- (void)onSinkMeetingMyAudioTypeChange
{
    [self updateMyAudioStatus];
}

- (void)onSinkMeetingVideoStatusChange:(NSUInteger)userID
{
    [self updateMyVideoStatus];

    [self updateRemoteVideoFor: userID];
}

- (void)onMyVideoStateChange
{
    [self updateMyVideoStatus];

    [self updateMyVideo];
}

- (void)onSinkMeetingUserJoin:(NSUInteger)userID
{
    [self updateRemoteVideoFor: userID];
}

- (void)onSinkMeetingUserLeft:(NSUInteger)userID
{
    [self updateRemoteVideoFor: userID];
}

- (void)onSinkMeetingActiveShare:(NSUInteger)userID
{
   
}

- (void)onSinkShareSizeChange:(NSUInteger)userID
{
   
}

- (void)onSinkMeetingShareReceiving:(NSUInteger)userID
{
    
}

- (void)onWaitingRoomStatusChange:(BOOL)needWaiting
{
//    if (needWaiting)
//    {
//        UIViewController *vc = [UIViewController new];
//
//        vc.title = @"Need wait for host Approve";
//
//        UIBarButtonItem *leaveItem = [[UIBarButtonItem alloc] initWithTitle:NSLocalizedString(@"Leave", @"") style:UIBarButtonItemStylePlain target:self action:@selector(onEndButtonClick:)];
//        [vc.navigationItem setRightBarButtonItem:leaveItem];
//
//        UINavigationController *nav = [[UINavigationController alloc] initWithRootViewController:vc];
//        nav.modalPresentationStyle = UIModalPresentationFullScreen;
//        [self presentViewController:nav animated:YES completion:NULL];
//
//    }
//    else
//    {
//        [self dismissViewControllerAnimated:YES completion:NULL];
//    }
}

- (void)onEndButtonClick:(id)sender
{
    [self.actionPresenter leaveMeeting];
    [self dismissViewControllerAnimated:YES completion:NULL];
}

-(void) onMeetingReady {
    NSLog(@"Ready...");
}

- (BOOL)onClickedAudioButton:(UIViewController*)parentVC {
    
    MobileRTCMeetingService *ms = [[MobileRTC sharedRTC] getMeetingService];
    if (!ms) {
        return NO;
    }
    
    MobileRTCAudioType audioType = [ms myAudioType];
    switch (audioType)
    {
        case MobileRTCAudioType_VoIP: //voip
        case MobileRTCAudioType_Telephony: //phone
        {
            if (![ms canUnmuteMyAudio])
            {
                break;
            }
            BOOL isMuted = [ms isMyAudioMuted];
            [ms muteMyAudio:!isMuted];
            break;
        }
        case MobileRTCAudioType_None:
        {
            //Supported VOIP
            if ([ms isSupportedVOIP])
            {
                if (SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO(@"8"))
                {
                    UIAlertController *alertController = [UIAlertController alertControllerWithTitle:NSLocalizedString(@"To hear others\n please join audio", @"")
                                                                                             message:nil
                                                                                      preferredStyle:UIAlertControllerStyleAlert];
                    
                    [alertController addAction:[UIAlertAction actionWithTitle:NSLocalizedString(@"Call via Internet", @"") style:UIAlertActionStyleDefault handler:^(UIAlertAction *action) {
                        //Join VOIP
                        MobileRTCMeetingService *ms = [[MobileRTC sharedRTC] getMeetingService];
                        if (ms)
                        {
                            [ms connectMyAudio:YES];
                        }
                    }]];
                    
                    [alertController addAction:[UIAlertAction actionWithTitle:NSLocalizedString(@"Cancel", nil) style:UIAlertActionStyleCancel handler:^(UIAlertAction *action) {
                    }]];
                    [parentVC presentViewController:alertController animated:YES completion:nil];
                }
            }
            break;
        }
    }
    
    return YES;
}
@end
