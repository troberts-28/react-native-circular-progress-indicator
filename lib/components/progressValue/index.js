"use strict";
// implementation reference from
// https://github.com/wcandillon/react-native-redash/blob/master/src/ReText.tsx
// and https://github.com/coinjar/react-native-wagmi-charts/
// blob/master/src/components/AnimatedText.tsx for web compatibility
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_reanimated_1 = __importStar(require("react-native-reanimated"));
const colors_1 = __importDefault(require("../../utils/colors"));
const styles_1 = __importDefault(require("./styles"));
react_native_reanimated_1.default.addWhitelistedNativeProps({ text: true });
const AnimatedInput = react_native_reanimated_1.default.createAnimatedComponent(react_native_1.TextInput);
const ProgressValue = ({ initialValue = 0, radius = 60, activeStrokeColor = colors_1.default.GREEN, progressValueColor, progressValueStyle = {}, progressValueFontSize, progressValue, animatedTextProps, allowFontScaling = true, }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inputRef = (0, react_1.useRef)(null);
    if (react_native_1.Platform.OS === 'web') {
        // only run the reaction on web platform.
        // eslint-disable-next-line react-hooks/rules-of-hooks
        (0, react_native_reanimated_1.useAnimatedReaction)(() => {
            return progressValue.value;
        }, (data, prevData) => {
            if (data !== prevData && inputRef.current) {
                inputRef.current.value = data;
            }
        });
    }
    const styleProps = (0, react_1.useMemo)(() => ({
        radius,
        progressValueColor,
        progressValueFontSize,
        progressValueStyle,
        activeStrokeColor,
    }), [
        radius,
        progressValueColor,
        progressValueFontSize,
        progressValueStyle,
        activeStrokeColor,
    ]);
    return (<AnimatedInput testID="progress-value-text" ref={inputRef} underlineColorAndroid={colors_1.default.TRANSPARENT} editable={false} defaultValue={`${initialValue}`} style={[
            (0, styles_1.default)(styleProps).input,
            progressValueStyle,
            (0, styles_1.default)(styleProps).fromProps,
        ]} animatedProps={animatedTextProps} allowFontScaling={allowFontScaling}/>);
};
exports.default = ProgressValue;
