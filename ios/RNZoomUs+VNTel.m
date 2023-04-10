//
//  RNZoomUs+VNTel.m
//  ZoomiOSSDKDemoInObjC
//
//  Created by Manh Pham on 11/19/22.
//  Copyright © 2022 Zoom Video Communications. All rights reserved.
//

#import "RNZoomUs+VNTel.h"
#import <MobileRTC/MobileRTC.h>
#import "SDKMeetingSettingPresenter.h"
#import <objc/runtime.h>
#import <React/RCTUtils.h>
#import <React/RCTUIManager.h>
#import "RNZoomUsVideoView.h"
static void * vntelCustomMeetingPropertyKey = &vntelCustomMeetingPropertyKey;
@implementation RNZoomUs (VNTel)

RCT_EXPORT_METHOD(addVideoView: (nonnull NSNumber *) reactTagId
                  withResolve: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject) {
    RCTUnsafeExecuteOnMainQueueSync(^{
        RCTUIManager* uiManager = [self.bridge moduleForClass:[RCTUIManager class]];
        RNZoomUsVideoView *videoView = (RNZoomUsVideoView*)[uiManager viewForReactTag: reactTagId];
        self->videoView = videoView;
        [self addVideoControllerIfNeeded];
        resolve(@"OK");
    });
}

RCT_EXPORT_METHOD(removeVideoView: (nonnull NSNumber *) reactTagId
                  withResolve: (RCTPromiseResolveBlock)resolve
                  rejecter: (RCTPromiseRejectBlock)reject) {
    RCTUnsafeExecuteOnMainQueueSync(^{
        RCTUIManager* uiManager = [self.bridge moduleForClass:[RCTUIManager class]];
        RNZoomUsVideoView *videoView = (RNZoomUsVideoView*)[uiManager viewForReactTag: reactTagId];
        if(!self.customMeetingVC) {
            [self.customMeetingVC willMoveToParentViewController:nil];
            [self.customMeetingVC.view removeFromSuperview];
            [self.customMeetingVC removeFromParentViewController];
            self.customMeetingVC = nil;
        }
        resolve(@"OK");
    });
}

- (void) addVideoControllerIfNeeded {
    if (self->videoView && self.customMeetingVC) {
        [videoView addSubview:self.customMeetingVC.view];
        self.customMeetingVC.view.translatesAutoresizingMaskIntoConstraints = NO;
        [NSLayoutConstraint activateConstraints:@[
            [self.customMeetingVC.view.topAnchor constraintEqualToAnchor:videoView.topAnchor],
            [self.customMeetingVC.view.leadingAnchor constraintEqualToAnchor:videoView.leadingAnchor],
            [videoView.trailingAnchor constraintEqualToAnchor:self.customMeetingVC.view.trailingAnchor],
            [videoView.bottomAnchor constraintEqualToAnchor:self.customMeetingVC.view.bottomAnchor]
        ]];
    }
}
- (MeetingViewController *)customMeetingVC {
    return objc_getAssociatedObject(self, vntelCustomMeetingPropertyKey);
}

- (void)setCustomMeetingVC:(MeetingViewController *)value {
    objc_setAssociatedObject(self, vntelCustomMeetingPropertyKey, value, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

@end
@interface RNZoomUs (CustomizedUIMeetingDelegate)<MobileRTCCustomizedUIMeetingDelegate>

@end
@implementation RNZoomUs (CustomizedUIMeetingDelegate)

- (void)onDestroyMeetingView {
    if(!self.customMeetingVC) {
        [self.customMeetingVC willMoveToParentViewController:nil];
        [self.customMeetingVC.view removeFromSuperview];
        [self.customMeetingVC removeFromParentViewController];
        self.customMeetingVC = nil;
    }
}

- (void)onInitMeetingView {
    self.customMeetingVC = [[MeetingViewController alloc] init];
    [self addVideoControllerIfNeeded];
}

@end
@interface RNZoomUs (AudioServiceDelegate)

@end

@implementation RNZoomUs (AudioServiceDelegate)
- (void)onJoinMeetingConfirmed
{
    NSString *meetingNo = [[MobileRTCInviteHelper sharedInstance] ongoingMeetingNumber];
    NSLog(@"onJoinMeetingConfirmed MeetingNo: %@", meetingNo);
}
- (void)onWaitingRoomStatusChange:(BOOL)needWaiting
{
    if (self.customMeetingVC)
    {
        [self.customMeetingVC onWaitingRoomStatusChange:needWaiting];
    }
}

- (void)onSinkWebinarNeedRegister:(NSString *)registerURL
{
    NSLog(@"%@",registerURL);
}
- (void)onMeetingError:(MobileRTCMeetError)error message:(NSString*)message
{
    NSLog(@"onMeetingError:%zd, message:%@", error, message);
}

- (void)onVNTelMeetingStateChange:(MobileRTCMeetingState)state
{
    
    NSLog(@"onVNTelMeetingStateChange:%d", state);
    if (self.customMeetingVC) {
        [self.customMeetingVC onMeetingStateChange:state];
    }
}
- (void)onMeetingReady
{
    if (self.customMeetingVC) {
        [self.customMeetingVC onMeetingReady];
    }
}
- (void)onVNTelSinkMeetingActiveVideo:(NSUInteger)userID
{
    if (self.customMeetingVC)
    {
        [self.customMeetingVC onSinkMeetingActiveVideo:userID];
    }
}

- (void)onVNTelSinkMeetingPreviewStopped
{
    if (self.customMeetingVC)
    {
        [self.customMeetingVC onSinkMeetingPreviewStopped];
    }
}


- (void)onVNTelSinkMeetingVideoStatusChange:(NSUInteger)userID
{
    if (self.customMeetingVC)
    {
        [self.customMeetingVC onSinkMeetingVideoStatusChange:userID];
    }
}

- (void)onVNTelSinkMeetingVideoStatusChange:(NSUInteger)userID videoStatus:(MobileRTC_VideoStatus)videoStatus
{
    NSLog(@"onSinkMeetingVideoStatusChange=%@, videoStatus=%@",@(userID), @(videoStatus));
}

- (void)onVNTelMyVideoStateChange
{
    if (self.customMeetingVC)
    {
        [self.customMeetingVC onMyVideoStateChange];
    }
}

- (void)onSinkMeetingVideoQualityChanged:(MobileRTCNetworkQuality)qality userID:(NSUInteger)userID
{
    NSLog(@"onSinkMeetingVideoQualityChanged: %zd userID:%zd",qality,userID);
}

- (void)onVNTelSinkMeetingVideoRequestUnmuteByHost:(void (^)(BOOL Accept))completion
{
    if (completion)
    {
        completion(YES);
    }
}

@end

