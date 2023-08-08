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
const react_native_svg_1 = __importStar(require("react-native-svg"));
const react_native_reanimated_1 = __importDefault(require("react-native-reanimated"));
const useCircleValues_1 = __importDefault(require("../../hooks/useCircleValues"));
const colors_1 = __importDefault(require("../../utils/colors"));
const circleGradient_1 = __importDefault(require("../circleGradient"));
const dashedCircle_1 = __importDefault(require("../dashedCircle"));
const styles_1 = __importDefault(require("./styles"));
const AnimatedCircle = react_native_reanimated_1.default.createAnimatedComponent(react_native_svg_1.Circle);
const ProgressCircle = ({ circleBackgroundColor = colors_1.default.TRANSPARENT, radius = 60, strokeLinecap = 'round', activeStrokeColor = colors_1.default.GREEN, activeStrokeSecondaryColor = null, activeStrokeWidth = 10, inActiveStrokeColor = colors_1.default.BLACK_30, inActiveStrokeWidth = 10, inActiveStrokeOpacity = 1, dashedStrokeConfig, animatedCircleProps, }) => {
    const viewBox = (0, react_1.useMemo)(() => radius + Math.max(activeStrokeWidth, inActiveStrokeWidth), [radius, activeStrokeWidth, inActiveStrokeWidth]);
    const { inactiveCircleRadius, activeCircleRadius, circleCircumference } = (0, useCircleValues_1.default)({
        radius,
        activeStrokeWidth,
        inActiveStrokeWidth,
    });
    const maskId = (0, react_1.useMemo)(() => dashedStrokeConfig &&
        dashedStrokeConfig?.count > 0 &&
        dashedStrokeConfig?.width > 0
        ? 'url(#dashed-circle)'
        : undefined, [dashedStrokeConfig]);
    const strokeColor = (0, react_1.useMemo)(() => (activeStrokeSecondaryColor ? 'url(#grad)' : activeStrokeColor), [activeStrokeSecondaryColor, activeStrokeColor]);
    return (<react_native_svg_1.default testID="progress-circle" width={radius * 2} height={radius * 2} viewBox={`0 0 ${viewBox * 2} ${viewBox * 2}`} style={styles_1.default.svg}>
      <circleGradient_1.default activeStrokeColor={activeStrokeColor} activeStrokeSecondaryColor={activeStrokeSecondaryColor}/>
      <dashedCircle_1.default circleCircumference={circleCircumference} inActiveStrokeWidth={inActiveStrokeWidth} activeStrokeWidth={activeStrokeWidth} inactiveCircleRadius={inactiveCircleRadius} activeCircleRadius={activeCircleRadius} dashedStrokeConfig={dashedStrokeConfig}/>
      <react_native_svg_1.G mask={maskId}>
        <react_native_svg_1.Circle cx="50%" cy="50%" stroke={inActiveStrokeColor} strokeWidth={inActiveStrokeWidth} r={inactiveCircleRadius} fill={circleBackgroundColor} strokeOpacity={inActiveStrokeOpacity}/>
        <AnimatedCircle cx="50%" cy="50%" stroke={strokeColor} strokeWidth={activeStrokeWidth} r={activeCircleRadius} fill={colors_1.default.TRANSPARENT} strokeDasharray={circleCircumference} strokeLinecap={strokeLinecap} animatedProps={animatedCircleProps}/>
      </react_native_svg_1.G>
    </react_native_svg_1.default>);
};
exports.default = ProgressCircle;
