"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomUsVideoView = void 0;
const react_native_1 = require("react-native");
const invariant_1 = __importDefault(require("invariant"));
const native_1 = require("./native");
const events_1 = __importDefault(require("./src/events"));
const DEFAULT_USER_TYPE = 2;
const applyLanguageMapping = (language) => {
    const androidLanguageMapping = {
        "zh-Hans": "zh-CN",
        "zh-Hant": "zh-TW",
    };
    if (react_native_1.Platform.OS === "android") {
        return androidLanguageMapping[language] || language;
    }
    return language;
};
async function initialize({ domain = "zoom.us", ...params }, { language = "en", enableCustomizedMeetingUI = true, 
// ios only
// more details inside: https://github.com/mieszko4/react-native-zoom-us/issues/28
disableShowVideoPreviewWhenJoinMeeting = true, 
// ios only
disableMinimizeMeeting = false, disableClearWebKitCache = false, } = {}) {
    invariant_1.default(typeof params === "object", "ZoomUs.initialize expects object param. Consider to check migration docs. " +
        "Check Link: https://github.com/mieszko4/react-native-zoom-us/blob/master/docs/UPGRADING.md");
    if ("jwtToken" in params) {
        invariant_1.default(params.jwtToken, "ZoomUs.initialize requires jwtToken");
    }
    else {
        invariant_1.default(params.clientKey, "ZoomUs.initialize requires clientKey");
        invariant_1.default(params.clientSecret, "ZoomUs.initialize requires clientSecret");
    }
    const mappedSettings = {
        language: applyLanguageMapping(language),
        enableCustomizedMeetingUI,
        disableShowVideoPreviewWhenJoinMeeting,
        disableMinimizeMeeting,
        disableClearWebKitCache,
    };
    const mappedParams = {
        domain,
        ...params,
    };
    return native_1.RNZoomUs.initialize(mappedParams, mappedSettings);
}
function isInitialized() {
    return native_1.RNZoomUs.isInitialized();
}
async function joinMeeting(params) {
    let { meetingNumber, noAudio = false, noVideo = false, autoConnectAudio = false, } = params;
    invariant_1.default(meetingNumber, "ZoomUs.joinMeeting requires meetingNumber");
    if (typeof meetingNumber !== "string")
        meetingNumber = meetingNumber.toString();
    // without noAudio, noVideo fields SDK can stack on joining meeting room for release build
    return native_1.RNZoomUs.joinMeeting({
        ...params,
        meetingNumber,
        noAudio: !!noAudio,
        noVideo: !!noVideo,
        autoConnectAudio,
    });
}
async function joinMeetingWithPassword(userName, meetingNumber, password) {
    console.warn("ZoomUs.joinMeetingWithPassword is deprecated. Use joinMeeting({ password: 'xxx', ... })");
    return joinMeeting({
        userName,
        meetingNumber,
        password,
    });
}
async function leaveMeeting() {
    return native_1.RNZoomUs.leaveMeeting();
}
async function connectAudio() {
    return native_1.RNZoomUs.connectAudio();
}
async function isMeetingConnected() {
    return native_1.RNZoomUs.isMeetingConnected();
}
async function isMeetingHost() {
    return native_1.RNZoomUs.isMeetingHost();
}
async function getInMeetingUserIdList() {
    return native_1.RNZoomUs.getInMeetingUserIdList();
}
async function rotateMyVideo(rotation) {
    if (react_native_1.Platform.OS === "android") {
        return native_1.RNZoomUs.rotateMyVideo(rotation);
    }
    else {
        throw new Error("Only support android");
    }
}
async function muteMyVideo(muted) {
    return native_1.RNZoomUs.muteMyVideo(muted);
}
async function muteMyAudio(muted) {
    return native_1.RNZoomUs.muteMyAudio(muted);
}
async function muteAttendee(userId, muted) {
    return native_1.RNZoomUs.muteAttendee(userId, muted);
}
async function muteAllAttendee(allowUnmuteSelf) {
    return native_1.RNZoomUs.muteAllAttendee(allowUnmuteSelf);
}
async function startShareScreen() {
    return native_1.RNZoomUs.startShareScreen();
}
async function stopShareScreen() {
    return native_1.RNZoomUs.stopShareScreen();
}
async function switchCamera() {
    return native_1.RNZoomUs.switchCamera();
}
async function raiseMyHand() {
    return native_1.RNZoomUs.raiseMyHand();
}
async function lowerMyHand() {
    return native_1.RNZoomUs.lowerMyHand();
}
var video_view_1 = require("./video-view");
Object.defineProperty(exports, "ZoomUsVideoView", { enumerable: true, get: function () { return __importDefault(video_view_1).default; } });
__exportStar(require("./src/events"), exports);
exports.default = {
    initialize,
    joinMeeting,
    joinMeetingWithPassword,
    leaveMeeting,
    connectAudio,
    isInitialized,
    isMeetingHost,
    isMeetingConnected,
    getInMeetingUserIdList,
    rotateMyVideo,
    muteMyVideo,
    muteMyAudio,
    muteAttendee,
    muteAllAttendee,
    startShareScreen,
    stopShareScreen,
    switchCamera,
    raiseMyHand,
    lowerMyHand,
    ...events_1.default,
};
