import { HostComponent, StyleProp, ViewStyle } from 'react-native';
export declare const VideoAspectModeEnum: {
    readonly VIDEO_ASPECT_ORIGINAL: 0;
    readonly VIDEO_ASPECT_FULL_FILLED: 1;
    readonly VIDEO_ASPECT_LETTER_BOX: 2;
    readonly VIDEO_ASPECT_PAN_AND_SCAN: 3;
    readonly VIDEO_ASPECT_TRUSTEE: 4;
};
declare type Values<T> = T[keyof T];
export declare type VideoAspectMode = Values<typeof VideoAspectModeEnum>;
export interface NativeLayoutUnit {
    kind: "active" | "preview" | "share" | "attendee" | "active-share";
    x: number;
    y: number;
    width: number;
    height: number;
    border?: boolean;
    showUsername?: boolean;
    showAudioOff?: boolean;
    userIndex?: number;
    background?: string;
    aspectMode?: VideoAspectMode;
}
export interface NativeVideoProps {
    style?: StyleProp<ViewStyle>;
    layout: NativeLayoutUnit[];
}
export declare const RNZoomUsVideoView: HostComponent<NativeVideoProps> | null;
export declare const RNZoomUs: any;
export {};
