import * as React from 'react';
import { NativeVideoProps } from './native';
export interface Props {
    style?: NativeVideoProps["style"];
    layout: NativeVideoProps["layout"];
}
declare const ZoomUsVideoView: React.FC<Props>;
export default ZoomUsVideoView;
