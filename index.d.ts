declare type Language = "de" | "ja" | "en" | "zh-Hant" | "es" | "zh-Hans" | "it" | "ko" | "vi" | "ru" | "pt-PT" | "fr";
interface RNZoomUsInitializeCommonParams {
    domain?: string;
    iosAppGroupId?: string;
    iosScreenShareExtensionId?: string;
}
export interface RNZoomUsInitializeParams extends RNZoomUsInitializeCommonParams {
    clientKey: string;
    clientSecret: string;
}
export interface RNZoomUsSDKInitParams extends RNZoomUsInitializeCommonParams {
    jwtToken: string;
}
declare type InitializeSettings = {
    language?: Language;
    enableCustomizedMeetingUI?: boolean;
    disableShowVideoPreviewWhenJoinMeeting?: boolean;
    disableMinimizeMeeting?: boolean;
    disableClearWebKitCache?: boolean;
};
declare function initialize({ domain, ...params }: RNZoomUsInitializeParams | RNZoomUsSDKInitParams, { language, enableCustomizedMeetingUI, disableShowVideoPreviewWhenJoinMeeting, disableMinimizeMeeting, disableClearWebKitCache, }?: InitializeSettings): Promise<string>;
declare function isInitialized(): Promise<boolean>;
export interface RNZoomUsJoinMeetingParams {
    userName: string;
    meetingNumber: string | number;
    password?: string;
    autoConnectAudio?: boolean;
    noAudio?: boolean;
    noVideo?: boolean;
}
declare function joinMeeting(params: RNZoomUsJoinMeetingParams): Promise<any>;
declare function joinMeetingWithPassword(userName: RNZoomUsJoinMeetingParams["userName"], meetingNumber: NonNullable<RNZoomUsJoinMeetingParams["meetingNumber"]>, password: NonNullable<RNZoomUsJoinMeetingParams["password"]>): Promise<any>;
declare function leaveMeeting(): Promise<any>;
declare function connectAudio(): Promise<any>;
declare function isMeetingConnected(): Promise<any>;
declare function isMeetingHost(): Promise<any>;
declare function getInMeetingUserIdList(): Promise<any>;
declare function rotateMyVideo(rotation: number): Promise<any>;
declare function muteMyVideo(muted: boolean): Promise<any>;
declare function muteMyAudio(muted: boolean): Promise<any>;
declare function muteAttendee(userId: string, muted: boolean): Promise<any>;
declare function muteAllAttendee(allowUnmuteSelf: boolean): Promise<any>;
declare function startShareScreen(): Promise<any>;
declare function stopShareScreen(): Promise<any>;
declare function switchCamera(): Promise<any>;
declare function raiseMyHand(): Promise<any>;
declare function lowerMyHand(): Promise<any>;
export { default as ZoomUsVideoView } from "./video-view";
export * from "./src/events";
declare const _default: {
    onMeetingStatusChange: (fn: (data: {
        event: "MEETING_STATUS_IDLE" | "MEETING_STATUS_WAITINGFORHOST" | "MEETING_STATUS_CONNECTING" | "MEETING_STATUS_INMEETING" | "MEETING_STATUS_DISCONNECTING" | "MEETING_STATUS_RECONNECTING" | "MEETING_STATUS_FAILED" | "MEETING_STATUS_IN_WAITING_ROOM" | "MEETING_STATUS_WEBINAR_PROMOTE" | "MEETING_STATUS_WEBINAR_DEPROMOTE" | "MEETING_STATUS_UNKNOWN" | "MEETING_STATUS_WAITING_EXTERNAL_SESSION_KEY" | "MEETING_STATUS_ENDED" | "MEETING_STATUS_LOCKED" | "MEETING_STATUS_UNLOCKED" | "MEETING_STATUS_JOIN_BO" | "MEETING_STATUS_LEAVE_BO";
    }) => any) => import("react-native").EmitterSubscription;
    onMeetingJoined: (fn: () => any) => import("react-native").EmitterSubscription;
    initialize: typeof initialize;
    joinMeeting: typeof joinMeeting;
    joinMeetingWithPassword: typeof joinMeetingWithPassword;
    leaveMeeting: typeof leaveMeeting;
    connectAudio: typeof connectAudio;
    isInitialized: typeof isInitialized;
    isMeetingHost: typeof isMeetingHost;
    isMeetingConnected: typeof isMeetingConnected;
    getInMeetingUserIdList: typeof getInMeetingUserIdList;
    rotateMyVideo: typeof rotateMyVideo;
    muteMyVideo: typeof muteMyVideo;
    muteMyAudio: typeof muteMyAudio;
    muteAttendee: typeof muteAttendee;
    muteAllAttendee: typeof muteAllAttendee;
    startShareScreen: typeof startShareScreen;
    stopShareScreen: typeof stopShareScreen;
    switchCamera: typeof switchCamera;
    raiseMyHand: typeof raiseMyHand;
    lowerMyHand: typeof lowerMyHand;
};
export default _default;
