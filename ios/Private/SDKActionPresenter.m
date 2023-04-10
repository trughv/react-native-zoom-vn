//
//  SDKActionPresenter.m
//  ZoomiOSSDKDemoInObjC
//
//  Created by Manh Pham on 11/19/22.
//  Copyright © 2022 Zoom Video Communications. All rights reserved.
//

#import "SDKActionPresenter.h"
#import <MobileRTC/MobileRTC.h>
@implementation SDKActionPresenter

- (BOOL)isMeetingHost
{
    return [[[MobileRTC sharedRTC] getMeetingService] isMeetingHost];
}

- (void)leaveMeeting
{
    MobileRTCMeetingService *ms = [[MobileRTC sharedRTC] getMeetingService];
    if (!ms) return;
    [ms leaveMeetingWithCmd:LeaveMeetingCmd_Leave];
}

- (void)EndMeeting
{
    MobileRTCMeetingService *ms = [[MobileRTC sharedRTC] getMeetingService];
    if (!ms) return;
    [ms leaveMeetingWithCmd:LeaveMeetingCmd_End];
}

- (void)presentParticipantsViewController
{
    [self doesNotRecognizeSelector: _cmd];
}

- (BOOL)lockMeeting
{
    MobileRTCMeetingService *ms = [[MobileRTC sharedRTC] getMeetingService];
    return [ms lockMeeting:!ms.isMeetingLocked];
}

- (BOOL)lockShare
{
    MobileRTCMeetingService *ms = [[MobileRTC sharedRTC] getMeetingService];
    return [ms lockShare:!ms.isShareLocked];
}
@end
