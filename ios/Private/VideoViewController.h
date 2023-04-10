//
//  VideoViewController.h
//  ZoomiOSSDKDemoInObjC
//
//  Created by Manh Pham on 11/19/22.
//  Copyright © 2022 Zoom Video Communications. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <MobileRTC/MobileRTC.h>
NS_ASSUME_NONNULL_BEGIN

@interface VideoViewController : UIViewController
@property (strong, nonatomic) MobileRTCPreviewVideoView  * preVideoView;
@property (strong, nonatomic) MobileRTCVideoView        * videoView;
@end

NS_ASSUME_NONNULL_END
