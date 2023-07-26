"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_native_reanimated_1 = require("react-native-reanimated");
const react_native_redash_1 = require("react-native-redash");
const useCircleValues_1 = __importDefault(require("./useCircleValues"));
function useAnimatedValue({ initialValue = 0, radius = 60, maxValue = 100, clockwise, startInPausedState, delay = 0, value, duration, onAnimationComplete = () => null, activeStrokeWidth = 10, inActiveStrokeWidth = 10, progressFormatter = (v) => {
    'worklet';
    return Math.round(v);
}, strokeColorConfig = undefined, easing = react_native_reanimated_1.Easing.linear, }) {
    const paused = (0, react_native_reanimated_1.useSharedValue)(startInPausedState);
    const animatedValue = (0, react_native_reanimated_1.useSharedValue)(initialValue);
    const { circleCircumference } = (0, useCircleValues_1.default)({
        radius,
        activeStrokeWidth,
        inActiveStrokeWidth,
    });
    const pause = (0, react_1.useCallback)(() => {
        paused.value = true;
    }, [paused]);
    const play = (0, react_1.useCallback)(() => {
        paused.value = false;
    }, [paused]);
    const resetAnimatedValue = (0, react_1.useCallback)(() => {
        // reset the paused state to false regardless of the value of
        // startInPausedState, as calling reAnimate is expected to restart
        // the animation.
        paused.value = false;
        animatedValue.value = initialValue;
    }, [animatedValue, initialValue, paused]);
    const animateValue = (0, react_1.useCallback)(() => {
        animatedValue.value = (0, react_native_redash_1.withPause)((0, react_native_reanimated_1.withDelay)(delay, (0, react_native_reanimated_1.withTiming)(value, { duration, easing }, isFinished => {
            if (isFinished) {
                (0, react_native_reanimated_1.runOnJS)(onAnimationComplete)?.();
            }
        })), paused);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [animatedValue, delay, duration, paused, value]);
    const reAnimate = () => {
        resetAnimatedValue();
        animateValue();
    };
    const sortedStrokeColors = (0, react_1.useMemo)(() => {
        if (!strokeColorConfig) {
            return null;
        }
        return strokeColorConfig.sort((a, b) => a.value - b.value);
    }, [strokeColorConfig]);
    const colors = (0, react_1.useMemo)(() => {
        if (!sortedStrokeColors) {
            return null;
        }
        return sortedStrokeColors.map(item => item.color);
    }, [sortedStrokeColors]);
    const values = (0, react_1.useMemo)(() => {
        if (!sortedStrokeColors) {
            return null;
        }
        return sortedStrokeColors.map(item => item.value);
    }, [sortedStrokeColors]);
    const animatedCircleProps = (0, react_native_reanimated_1.useAnimatedProps)(() => {
        let biggestValue = Math.max(initialValue, maxValue);
        biggestValue = biggestValue <= 0 ? 1 : biggestValue;
        const maxPercentage = clockwise
            ? (100 * animatedValue.value) / biggestValue
            : (100 * -animatedValue.value) / biggestValue;
        const config = {
            strokeDashoffset: circleCircumference - (circleCircumference * maxPercentage) / 100,
        };
        const strokeColor = colors && values
            ? (0, react_native_reanimated_1.interpolateColor)(animatedValue.value, values, colors)
            : undefined;
        if (strokeColor) {
            config.stroke = strokeColor;
        }
        return config;
    }, [], (0, react_native_reanimated_1.createAnimatedPropAdapter)(props => {
        if (Object.keys(props).includes('stroke')) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            props.stroke = { type: 0, payload: (0, react_native_reanimated_1.processColor)(props.stroke) };
        }
    }, ['stroke']));
    (0, react_1.useEffect)(() => {
        animateValue();
    }, [animateValue]);
    const progressValue = (0, react_native_reanimated_1.useDerivedValue)(() => {
        return `${progressFormatter(animatedValue.value)}`;
    });
    const animatedTextProps = (0, react_native_reanimated_1.useAnimatedProps)(() => {
        return {
            text: progressValue.value,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        };
    });
    return {
        animatedCircleProps,
        animatedTextProps,
        progressValue,
        pause,
        play,
        reAnimate,
    };
}
exports.default = useAnimatedValue;
