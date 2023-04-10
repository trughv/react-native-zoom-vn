"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const color_1 = __importDefault(require("color"));
const native_1 = require("./native");
const ZoomUsVideoView = (props) => {
    const { layout = [], ...otherProps } = props;
    const nativeLayout = layout.map(unit => {
        return Object.assign({}, unit, {
            x: Math.ceil(unit.x * 100),
            y: Math.ceil(unit.y * 100),
            width: Math.ceil(unit.width * 100),
            height: Math.ceil(unit.height * 100),
            background: color_1.default(unit.background || '#000000').rgbNumber(),
        });
    });
    const nativeEl = React.useRef(null);
    React.useEffect(() => {
        (async function register() {
            if (nativeEl.current) {
                await native_1.RNZoomUs.addVideoView(react_native_1.findNodeHandle(nativeEl.current));
            }
        })();
        return () => {
            (async function unregister() {
                if (nativeEl.current) {
                    await native_1.RNZoomUs.removeVideoView(react_native_1.findNodeHandle(nativeEl.current));
                }
            })();
        };
    }, [nativeEl.current]);
    if (native_1.RNZoomUsVideoView) {
        return (<native_1.RNZoomUsVideoView ref={nativeEl} layout={nativeLayout} {...otherProps}/>);
    }
    else {
        return (<react_native_1.View {...otherProps}/>);
    }
};
exports.default = ZoomUsVideoView;
