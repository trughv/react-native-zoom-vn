//
//  VideoViewController.m
//  ZoomiOSSDKDemoInObjC
//
//  Created by Manh Pham on 11/19/22.
//  Copyright © 2022 Zoom Video Communications. All rights reserved.
//

#import "VideoViewController.h"

@interface VideoViewController ()

@end

@implementation VideoViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    [self.view addSubview:self.videoView];
    [self.view addSubview:self.preVideoView];
}

- (void)viewDidAppear:(BOOL)animated
{
    [super viewDidAppear:animated];
}

- (void)viewDidDisappear:(BOOL)animated
{
    [super viewDidDisappear:animated];
}

- (void)dealloc
{

}

- (void)viewDidLayoutSubviews
{
    [super viewDidLayoutSubviews];
    
    CGRect frame = self.view.bounds;
    self.videoView.frame = frame;
    self.preVideoView.frame = frame;
}

- (MobileRTCVideoView*)videoView
{
    if (!_videoView)
    {
        _videoView = [[MobileRTCVideoView alloc] initWithFrame:self.view.bounds];
        [_videoView setVideoAspect:MobileRTCVideoAspect_PanAndScan];
    }
    return _videoView;
}
- (MobileRTCPreviewVideoView*)preVideoView
{
    if (!_preVideoView)
    {
        _preVideoView = [[MobileRTCPreviewVideoView alloc] initWithFrame:self.view.bounds];
    }
    return _preVideoView;
}
@end
