
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <React/RCTBridgeModule.h>
#endif

#import "RCTEventEmitter.h"
#import <MobileRTC/MobileRTC.h>
@class RNZoomUsVideoView;

@interface RNZoomUs : RCTEventEmitter<RCTBridgeModule, MobileRTCAuthDelegate, MobileRTCMeetingServiceDelegate, MobileRTCVideoServiceDelegate, MobileRTCAudioServiceDelegate, MobileRTCUserServiceDelegate> {
    
    __weak RNZoomUsVideoView *videoView;
    
}

@end

