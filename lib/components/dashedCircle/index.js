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
const react_native_svg_1 = require("react-native-svg");
const colors_1 = __importDefault(require("../../utils/colors"));
const DashedCircle = ({ dashedStrokeConfig = { count: 0, width: 0 }, circleCircumference, inActiveStrokeWidth, activeStrokeWidth, inactiveCircleRadius, activeCircleRadius, }) => {
    const strokeDashArray = (0, react_1.useMemo)(() => {
        const totalDashSpace = dashedStrokeConfig.width * dashedStrokeConfig.count;
        const dashGap = (circleCircumference - totalDashSpace) / dashedStrokeConfig.count;
        return `${dashedStrokeConfig.width} ${dashGap}`;
    }, [circleCircumference, dashedStrokeConfig]);
    const strokeWidth = (0, react_1.useMemo)(() => Math.max(inActiveStrokeWidth, activeStrokeWidth), [inActiveStrokeWidth, activeStrokeWidth]);
    const radius = (0, react_1.useMemo)(() => Math.max(inactiveCircleRadius, activeCircleRadius), [inactiveCircleRadius, activeCircleRadius]);
    if (dashedStrokeConfig?.count > 0 && dashedStrokeConfig?.width > 0) {
        return (<react_native_svg_1.Defs>
        <react_native_svg_1.Mask id="dashed-circle">
          <react_native_svg_1.Circle cx="50%" cy="50%" stroke={colors_1.default.WHITE} fill={colors_1.default.TRANSPARENT} strokeWidth={strokeWidth} r={radius} strokeOpacity={1} strokeDasharray={strokeDashArray}/>
        </react_native_svg_1.Mask>
      </react_native_svg_1.Defs>);
    }
    return null;
};
exports.default = react_1.default.memo(DashedCircle);
