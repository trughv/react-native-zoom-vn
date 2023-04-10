import { NativeModule } from 'react-native';
export declare const ZoomEmitter: NativeModule;
declare type AndroidStatusEvent = 'MEETING_STATUS_IDLE' | 'MEETING_STATUS_WAITINGFORHOST' | 'MEETING_STATUS_CONNECTING' | 'MEETING_STATUS_INMEETING' | 'MEETING_STATUS_DISCONNECTING' | 'MEETING_STATUS_RECONNECTING' | 'MEETING_STATUS_FAILED' | 'MEETING_STATUS_IN_WAITING_ROOM' | 'MEETING_STATUS_WEBINAR_PROMOTE' | 'MEETING_STATUS_WEBINAR_DEPROMOTE' | 'MEETING_STATUS_UNKNOWN';
declare type IOSStatusExtraEvent = 'MEETING_STATUS_WAITING_EXTERNAL_SESSION_KEY' | 'MEETING_STATUS_ENDED' | 'MEETING_STATUS_LOCKED' | 'MEETING_STATUS_UNLOCKED' | 'MEETING_STATUS_JOIN_BO' | 'MEETING_STATUS_LEAVE_BO';
declare type IOSStatusEvent = AndroidStatusEvent | IOSStatusExtraEvent;
export declare type ZoomUsMeetingStatusEvent = AndroidStatusEvent | IOSStatusEvent;
declare function onMeetingStatusChange(fn: (data: {
    event: ZoomUsMeetingStatusEvent;
}) => any): import("react-native").EmitterSubscription;
declare function onMeetingJoined(fn: () => any): import("react-native").EmitterSubscription;
declare const _default: {
    onMeetingStatusChange: typeof onMeetingStatusChange;
    onMeetingJoined: typeof onMeetingJoined;
};
export default _default;
