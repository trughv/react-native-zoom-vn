//
//  SDKActionPresenter.h
//  ZoomiOSSDKDemoInObjC
//
//  Created by Manh Pham on 11/19/22.
//  Copyright © 2022 Zoom Video Communications. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface SDKActionPresenter : NSObject

- (BOOL)isMeetingHost;

- (void)leaveMeeting;

- (void)EndMeeting;

- (void)presentParticipantsViewController;

- (BOOL)lockMeeting;

- (BOOL)lockShare;
@end

NS_ASSUME_NONNULL_END
