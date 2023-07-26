"use strict";
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
const progressCircle_1 = __importDefault(require("../components/progressCircle"));
const useAnimatedValue_1 = __importDefault(require("../hooks/useAnimatedValue"));
const colors_1 = __importDefault(require("../utils/colors"));
const styles_1 = __importDefault(require("./styles"));
const CircularProgressBase = (0, react_1.forwardRef)((props, ref) => {
    const { value, initialValue = 0, circleBackgroundColor = colors_1.default.TRANSPARENT, radius = 60, duration = 500, delay = 0, maxValue = 100, strokeLinecap = 'round', onAnimationComplete = () => null, activeStrokeColor = colors_1.default.GREEN, activeStrokeSecondaryColor = null, activeStrokeWidth = 10, inActiveStrokeColor = colors_1.default.BLACK_30, inActiveStrokeWidth = 10, inActiveStrokeOpacity = 1, clockwise = true, startInPausedState = false, rotation = 0, dashedStrokeConfig = { count: 0, width: 0 }, strokeColorConfig = undefined, easing, children, } = props;
    const { animatedCircleProps, play, pause, reAnimate } = (0, useAnimatedValue_1.default)({
        initialValue,
        radius,
        maxValue,
        clockwise,
        startInPausedState,
        delay,
        value,
        duration,
        onAnimationComplete,
        activeStrokeWidth,
        inActiveStrokeWidth,
        strokeColorConfig,
        easing,
    });
    (0, react_1.useImperativeHandle)(ref, () => ({
        play,
        pause,
        reAnimate,
    }));
    const styleProps = (0, react_1.useMemo)(() => ({
        radius,
        rotation,
    }), [radius, rotation]);
    return (<react_native_1.View style={(0, styles_1.default)(styleProps).container} testID="progress-bar">
        <react_native_1.View style={(0, styles_1.default)(styleProps).rotatingContainer}>
          <progressCircle_1.default circleBackgroundColor={circleBackgroundColor} radius={radius} strokeLinecap={strokeLinecap} activeStrokeColor={activeStrokeColor} activeStrokeSecondaryColor={activeStrokeSecondaryColor} activeStrokeWidth={activeStrokeWidth} inActiveStrokeColor={inActiveStrokeColor} inActiveStrokeWidth={inActiveStrokeWidth} inActiveStrokeOpacity={inActiveStrokeOpacity} animatedCircleProps={animatedCircleProps} dashedStrokeConfig={dashedStrokeConfig}/>
        </react_native_1.View>
        <react_native_1.View style={[
            react_native_1.StyleSheet.absoluteFillObject,
            (0, styles_1.default)(styleProps).valueContainer,
        ]}>
          {children}
        </react_native_1.View>
      </react_native_1.View>);
});
exports.default = CircularProgressBase;
