import { NativeModule, Platform } from "react-native";
import invariant from "invariant";
import { RNZoomUs } from "./native";
import events from "./src/events";

const DEFAULT_USER_TYPE = 2;

type Language =
  | "de"
  | "ja"
  | "en"
  | "zh-Hant"
  | "es"
  | "zh-Hans"
  | "it"
  | "ko"
  | "vi"
  | "ru"
  | "pt-PT"
  | "fr";

const applyLanguageMapping = (language: Language): string => {
  const androidLanguageMapping = {
    "zh-Hans": "zh-CN",
    "zh-Hant": "zh-TW",
  };
  if (Platform.OS === "android") {
    return androidLanguageMapping[language] || language;
  }

  return language;
};
interface RNZoomUsInitializeCommonParams {
  domain?: string;
  iosAppGroupId?: string;
  iosScreenShareExtensionId?: string;
}
export interface RNZoomUsInitializeParams
  extends RNZoomUsInitializeCommonParams {
  clientKey: string;
  clientSecret: string;
}

export interface RNZoomUsSDKInitParams extends RNZoomUsInitializeCommonParams {
  jwtToken: string;
  // we don't care for the rest, for now
}

type InitializeSettings = {
  language?: Language;
  enableCustomizedMeetingUI?: boolean;
  disableShowVideoPreviewWhenJoinMeeting?: boolean;
  disableMinimizeMeeting?: boolean;
  disableClearWebKitCache?: boolean;
};

async function initialize(
  {
    domain = "zoom.us",
    ...params
  }: RNZoomUsInitializeParams | RNZoomUsSDKInitParams,
  {
    language = "en",
    enableCustomizedMeetingUI = true,

    // ios only
    // more details inside: https://github.com/mieszko4/react-native-zoom-us/issues/28
    disableShowVideoPreviewWhenJoinMeeting = true,

    // ios only
    disableMinimizeMeeting = false,

    disableClearWebKitCache = false,
  }: InitializeSettings = {}
): Promise<string> {
  invariant(
    typeof params === "object",
    "ZoomUs.initialize expects object param. Consider to check migration docs. " +
      "Check Link: https://github.com/mieszko4/react-native-zoom-us/blob/master/docs/UPGRADING.md"
  );

  if ("jwtToken" in params) {
    invariant(params.jwtToken, "ZoomUs.initialize requires jwtToken");
  } else {
    invariant(params.clientKey, "ZoomUs.initialize requires clientKey");
    invariant(params.clientSecret, "ZoomUs.initialize requires clientSecret");
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

  return RNZoomUs.initialize(mappedParams, mappedSettings);
}

function isInitialized(): Promise<boolean> {
  return RNZoomUs.isInitialized();
}

export interface RNZoomUsJoinMeetingParams {
  userName: string;
  meetingNumber: string | number;
  password?: string;
  autoConnectAudio?: boolean;
  noAudio?: boolean;
  noVideo?: boolean;
}
async function joinMeeting(params: RNZoomUsJoinMeetingParams) {
  let {
    meetingNumber,
    noAudio = false,
    noVideo = false,
    autoConnectAudio = false,
  } = params;
  invariant(meetingNumber, "ZoomUs.joinMeeting requires meetingNumber");
  if (typeof meetingNumber !== "string")
    meetingNumber = meetingNumber.toString();

  // without noAudio, noVideo fields SDK can stack on joining meeting room for release build
  return RNZoomUs.joinMeeting({
    ...params,
    meetingNumber,
    noAudio: !!noAudio, // required
    noVideo: !!noVideo, // required
    autoConnectAudio, // required
  });
}

async function joinMeetingWithPassword(
  userName: RNZoomUsJoinMeetingParams["userName"],
  meetingNumber: NonNullable<RNZoomUsJoinMeetingParams["meetingNumber"]>,
  password: NonNullable<RNZoomUsJoinMeetingParams["password"]>
) {
  console.warn(
    "ZoomUs.joinMeetingWithPassword is deprecated. Use joinMeeting({ password: 'xxx', ... })"
  );
  return joinMeeting({
    userName,
    meetingNumber,
    password,
  });
}

async function leaveMeeting() {
  return RNZoomUs.leaveMeeting();
}

async function connectAudio() {
  return RNZoomUs.connectAudio();
}

async function isMeetingConnected() {
  return RNZoomUs.isMeetingConnected();
}

async function isMeetingHost() {
  return RNZoomUs.isMeetingHost();
}

async function getInMeetingUserIdList() {
  return RNZoomUs.getInMeetingUserIdList();
}

async function rotateMyVideo(rotation: number) {
  if (Platform.OS === "android") {
    return RNZoomUs.rotateMyVideo(rotation);
  } else {
    throw new Error("Only support android");
  }
}

async function muteMyVideo(muted: boolean) {
  return RNZoomUs.muteMyVideo(muted);
}

async function muteMyAudio(muted: boolean) {
  return RNZoomUs.muteMyAudio(muted);
}

async function muteAttendee(userId: string, muted: boolean) {
  return RNZoomUs.muteAttendee(userId, muted);
}

async function muteAllAttendee(allowUnmuteSelf: boolean) {
  return RNZoomUs.muteAllAttendee(allowUnmuteSelf);
}

async function startShareScreen() {
  return RNZoomUs.startShareScreen();
}

async function stopShareScreen() {
  return RNZoomUs.stopShareScreen();
}

async function switchCamera() {
  return RNZoomUs.switchCamera();
}

async function raiseMyHand() {
  return RNZoomUs.raiseMyHand();
}

async function lowerMyHand() {
  return RNZoomUs.lowerMyHand();
}

export { default as ZoomUsVideoView } from "./video-view";

export * from "./src/events";
export default {
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
  ...events,
};
