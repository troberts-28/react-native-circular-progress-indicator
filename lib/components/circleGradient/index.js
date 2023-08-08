"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_svg_1 = require("react-native-svg");
const CircleGradient = ({ activeStrokeSecondaryColor, activeStrokeColor, }) => {
    if (activeStrokeSecondaryColor) {
        return (<react_native_svg_1.Defs>
        <react_native_svg_1.LinearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <react_native_svg_1.Stop offset="0%" stopColor={activeStrokeSecondaryColor}/>
          <react_native_svg_1.Stop offset="100%" stopColor={activeStrokeColor}/>
        </react_native_svg_1.LinearGradient>
      </react_native_svg_1.Defs>);
    }
    return null;
};
exports.default = react_1.default.memo(CircleGradient);
