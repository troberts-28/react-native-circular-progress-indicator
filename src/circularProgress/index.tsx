import React, { useEffect, useMemo } from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
import Svg, { G, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  withDelay,
  runOnJS,
  useDerivedValue,
  Easing,
} from 'react-native-reanimated';
import COLORS from '../utils/colors';
import styles from './styles';

const AnimatedInput = Animated.createAnimatedComponent(TextInput);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export interface CircularProgressProps {
  /**
   * progress value
   */
  value: number;
  /**
   * initial progress value. Helpful when used as a countdown timer
   */
  initialValue?: number;
  /**
   * progress circle background color
   */
  circleBackgroundColor?: string;
  /**
   * progress circle radius
   */
  radius?: number;
  /**
   * progress animation duration
   */
  duration?: number;
  /**
   * progress animation delay
   */
  delay?: number;
  /**
   * progress maximum value. Percentage calculation is based on the maximum value provided
   */
  maxValue?: number;
  /**
   * progress stroke line cap
   */
  strokeLinecap?: 'butt' | 'round' | 'square';
  /**
   * callback when animation is completed.
   */
  onAnimationComplete?: () => void;
  /**
   * active progress circle color
   */
  activeStrokeColor?: string;
  /**
   * active progress secondary color. Use this to provide a gradient effect
   */
  activeStrokeSecondaryColor?: string | null;
  /**
   * inactive progress circle color
   */
  inActiveStrokeColor?: string;
  /**
   * inactive progress circle opacity value
   */
  inActiveStrokeOpacity?: number;
  /**
   * active progress circle stroke width
   */
  activeStrokeWidth?: number;
  /**
   * inactive progress circle stroke width
   */
  inActiveStrokeWidth?: number;
  /**
   * custom child component for circular progress
   */
  children?: React.ReactNode;
  /**
   * change direction of progress ring
   */
  clockwise?: boolean;
  /**
   * rotate the progress ring by this value
   * accepts a number from -360 to 360
   */
  rotation?: number;
  /**
   * title to display below the progress value
   */
  title?: string;
  /**
   * title text style
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * title text color
   */
  titleColor?: string;
  /**
   * title text font size
   */
  titleFontSize?: number;
  /**
   * progress value text color
   */
  progressValueColor?: string;
  /**
   * progress value text style
   */
  progressValueStyle?: StyleProp<TextStyle>;
  /**
   * progress value text font size
   */
  fontSize?: number;
  /**
   * prefix value
   */
  valuePrefix?: string;
  /**
   * suffix value
   */
  valueSuffix?: string;
  /**
   * show or hide the progress text value
   */
  showProgressValue?: boolean;
  /**
   * subtitle text value
   */
  subtitle?: string;
  /**
   * subtitle text style
   */
  subtitleStyle?: StyleProp<TextStyle>;
  /**
   * subtitle text color
   */
  subtitleColor?: string;
  /**
   * subtitle text font size
   */
  subtitleFontSize?: number;
  /**
   * function to format the progress value.
   * By default, the value is rounded to the nearest integer.
   * Make sure to define it as a worklet function.
   * https://docs.swmansion.com/react-native-reanimated/docs/2.2.0/worklets/
   */
  progressFormatter?: (v: number) => number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  initialValue = 0,
  circleBackgroundColor = COLORS.TRANSPARENT,
  radius = 60,
  duration = 500,
  delay = 0,
  maxValue = 100,
  strokeLinecap = 'round',
  onAnimationComplete = () => null,
  activeStrokeColor = COLORS.GREEN,
  activeStrokeSecondaryColor = null,
  activeStrokeWidth = 10,
  inActiveStrokeColor = COLORS.BLACK_30,
  inActiveStrokeWidth = 10,
  inActiveStrokeOpacity = 1,
  clockwise = true,
  rotation = 0,
  title = '',
  titleStyle = {},
  titleColor,
  titleFontSize,
  progressValueColor,
  progressValueStyle = {},
  fontSize,
  valuePrefix = '',
  valueSuffix = '',
  showProgressValue = true,
  subtitle = '',
  subtitleStyle = {},
  subtitleColor,
  subtitleFontSize,
  progressFormatter = (v: number) => {
    'worklet';

    return Math.round(v);
  },
}: CircularProgressProps) => {
  const animatedValue = useSharedValue(initialValue);
  const viewBox = radius + Math.max(activeStrokeWidth, inActiveStrokeWidth);
  const circleCircumference = 2 * Math.PI * radius;

  const styleProps = useMemo(
    () => ({
      radius,
      rotation,
      progressValueColor,
      fontSize,
      progressValueStyle,
      activeStrokeColor,
      titleStyle,
      titleColor,
      titleFontSize,
      showProgressValue,
      subtitleColor,
      subtitleFontSize,
    }),
    [
      radius,
      rotation,
      progressValueColor,
      fontSize,
      progressValueStyle,
      activeStrokeColor,
      titleStyle,
      titleColor,
      titleFontSize,
      showProgressValue,
      subtitleColor,
      subtitleFontSize,
    ]
  );

  const animatedCircleProps = useAnimatedProps(() => {
    let biggestValue = Math.max(initialValue, maxValue);
    biggestValue = biggestValue <= 0 ? 1 : biggestValue;
    const maxPercentage: number = clockwise
      ? (100 * animatedValue.value) / biggestValue
      : (100 * -animatedValue.value) / biggestValue;
    return {
      strokeDashoffset:
        circleCircumference - (circleCircumference * maxPercentage) / 100,
    };
  });

  useEffect(() => {
    animatedValue.value = withDelay(
      delay,
      withTiming(value, { duration, easing: Easing.linear }, (isFinished) => {
        if (isFinished) {
          runOnJS(onAnimationComplete)?.();
        }
      })
    );
  }, [value]);

  const progressValue = useDerivedValue(() => {
    return `${valuePrefix}${progressFormatter(
      animatedValue.value
    )}${valueSuffix}`;
  });

  const animatedTextProps = useAnimatedProps(() => {
    return {
      text: progressValue.value,
    } as any;
  });

  return (
    <View style={styles(styleProps).container}>
      <View style={styles(styleProps).rotatingContainer}>
        <Svg
          width={radius * 2}
          height={radius * 2}
          viewBox={`0 0 ${viewBox * 2} ${viewBox * 2}`}
        >
          {activeStrokeSecondaryColor ? (
            <Defs>
              <LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <Stop offset="0%" stopColor={activeStrokeSecondaryColor} />
                <Stop offset="100%" stopColor={activeStrokeColor} />
              </LinearGradient>
            </Defs>
          ) : null}
          <G rotation="270" origin={`${viewBox}, ${viewBox}`}>
            <Circle
              cx="50%"
              cy="50%"
              stroke={inActiveStrokeColor}
              strokeWidth={inActiveStrokeWidth}
              r={radius}
              fill={circleBackgroundColor}
              strokeOpacity={inActiveStrokeOpacity}
            />
            <AnimatedCircle
              cx="50%"
              cy="50%"
              stroke={
                activeStrokeSecondaryColor ? 'url(#grad)' : activeStrokeColor
              }
              strokeWidth={activeStrokeWidth}
              r={radius}
              fill="transparent"
              strokeDasharray={circleCircumference}
              animatedProps={animatedCircleProps}
              strokeLinecap={strokeLinecap}
            />
          </G>
        </Svg>
      </View>
      <View
        style={[
          StyleSheet.absoluteFillObject,
          styles(styleProps).valueContainer,
        ]}
      >
        {showProgressValue && (
          <AnimatedInput
            underlineColorAndroid="transparent"
            editable={false}
            defaultValue={`${valuePrefix}${initialValue}${valueSuffix}`}
            style={[
              styles(styleProps).input,
              progressValueStyle,
              styles(styleProps).fromProps,
            ]}
            animatedProps={animatedTextProps}
          />
        )}
        {title && title !== '' ? (
          <Text
            style={[styles(styleProps).title, titleStyle]}
            numberOfLines={1}
          >
            {title}
          </Text>
        ) : null}
        {subtitle && subtitle !== '' ? (
          <Text
            style={[
              styles(styleProps).title,
              styles(styleProps).subtitle,
              subtitleStyle,
            ]}
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

export default CircularProgress;
