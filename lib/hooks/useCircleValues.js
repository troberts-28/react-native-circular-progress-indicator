"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useCircleValues({ radius, activeStrokeWidth, inActiveStrokeWidth, }) {
    const isSameStrokeWidth = (0, react_1.useMemo)(() => activeStrokeWidth === inActiveStrokeWidth, [activeStrokeWidth, inActiveStrokeWidth]);
    const isActiveStrokeBigger = (0, react_1.useMemo)(() => {
        return activeStrokeWidth > inActiveStrokeWidth;
    }, [activeStrokeWidth, inActiveStrokeWidth]);
    const findRadius = (0, react_1.useCallback)(() => {
        if (isSameStrokeWidth) {
            return radius + inActiveStrokeWidth / 2;
        }
        if (isActiveStrokeBigger) {
            return radius + activeStrokeWidth / 2;
        }
        return radius + inActiveStrokeWidth / 2;
    }, [
        isSameStrokeWidth,
        isActiveStrokeBigger,
        radius,
        inActiveStrokeWidth,
        activeStrokeWidth,
    ]);
    const inactiveCircleRadius = (0, react_1.useMemo)(() => findRadius(), [findRadius]);
    const activeCircleRadius = (0, react_1.useMemo)(() => findRadius(), [findRadius]);
    const circleCircumference = (0, react_1.useMemo)(() => 2 * Math.PI * activeCircleRadius, [activeCircleRadius]);
    return {
        inactiveCircleRadius,
        activeCircleRadius,
        circleCircumference,
    };
}
exports.default = useCircleValues;
