"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RNZoomUs = exports.RNZoomUsVideoView = exports.VideoAspectModeEnum = void 0;
const react_native_1 = require("react-native");
exports.VideoAspectModeEnum = {
    VIDEO_ASPECT_ORIGINAL: 0,
    VIDEO_ASPECT_FULL_FILLED: 1,
    VIDEO_ASPECT_LETTER_BOX: 2,
    VIDEO_ASPECT_PAN_AND_SCAN: 3,
    VIDEO_ASPECT_TRUSTEE: 4,
};
exports.RNZoomUsVideoView = (react_native_1.requireNativeComponent('RNZoomUsVideoView'));
exports.RNZoomUs = react_native_1.NativeModules.RNZoomUs;
if (!exports.RNZoomUs)
    console.error('[react-native-zoom-us] RNZoomUs native module is not linked.');
