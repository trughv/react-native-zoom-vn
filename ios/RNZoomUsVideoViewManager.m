//
//  RNZoomUsVideoViewManager.m
//  RNZoomUs
//
//  Created by Manh Pham on 11/20/22.
//

#import "RNZoomUsVideoViewManager.h"
#import "RNZoomUsVideoView.h"
@interface VideoViewLayout: NSObject {
    @private
    int background;
    int border;
    int width;
    int height;
    int x;
    int y;
    NSString * kind; // active, preview, ...
    bool showAudioOff;
    bool showUsername;
}
@end

@implementation VideoViewLayout
@end
@implementation RNZoomUsVideoViewManager

RCT_EXPORT_MODULE(RNZoomUsVideoView)
RCT_CUSTOM_VIEW_PROPERTY(layout, NSArray<__kindof VideoViewLayout*>, RNZoomUsVideoView)
{
    // Not implement at moment
    NSLog(@"%@", json);
}

- (UIView *)view
{
  return [[RNZoomUsVideoView alloc] init];
}
@end
