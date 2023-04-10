"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoomEmitter = void 0;
const react_native_1 = require("react-native");
const native_1 = require("../native");
exports.ZoomEmitter = native_1.RNZoomUs;
const EventEmitter = new react_native_1.NativeEventEmitter(exports.ZoomEmitter);
function onMeetingStatusChange(fn) {
    return EventEmitter.addListener('MeetingStatus', (data) => {
        // here we can add extra params, if needed
        fn(data);
    });
}
function onMeetingJoined(fn) {
    return onMeetingStatusChange(({ event }) => {
        if (event === 'MEETING_STATUS_INMEETING') {
            fn();
        }
    });
}
exports.default = {
    onMeetingStatusChange,
    onMeetingJoined,
};
