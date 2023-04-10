//
//  MeetingViewController.h
//  ZoomiOSSDKDemoInObjC
//
//  Created by Manh Pham on 11/19/22.
//  Copyright © 2022 Zoom Video Communications. All rights reserved.
//

#import <UIKit/UIKit.h>
#import "VideoViewController.h"
#import "SDKActionPresenter.h"
NS_ASSUME_NONNULL_BEGIN

@interface MeetingViewController : UIViewController
@property (strong, nonatomic) VideoViewController           * remoteVC;
@property (strong, nonatomic) VideoViewController           * videoVC;
@property (strong, nonatomic) SDKActionPresenter     *actionPresenter;

- (void)showVideoView;
@end

NS_ASSUME_NONNULL_END
@interface MeetingViewController (MeetingDelegate)

- (void)onMeetingStateChange:(MobileRTCMeetingState)state;

- (void)onSinkMeetingActiveVideo:(NSUInteger)userID;

- (void)onSinkMeetingAudioStatusChange:(NSUInteger)userID;

- (void)onSinkMeetingMyAudioTypeChange;

- (void)onSinkMeetingVideoStatusChange:(NSUInteger)userID;

- (void)onMyVideoStateChange;

- (void)onSinkMeetingUserJoin:(NSUInteger)userID;

- (void)onSinkMeetingUserLeft:(NSUInteger)userID;

- (void)onSinkMeetingActiveShare:(NSUInteger)userID;

- (void)onSinkShareSizeChange:(NSUInteger)userID;

- (void)onSinkMeetingShareReceiving:(NSUInteger)userID;

- (void)onWaitingRoomStatusChange:(BOOL)needWaiting;

- (void)onSinkMeetingPreviewStopped;

- (void)onMeetingReady;
@end
