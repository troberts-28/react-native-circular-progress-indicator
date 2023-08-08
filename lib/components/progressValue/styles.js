"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const styles = (props) => {
    return react_native_1.StyleSheet.create({
        fromProps: {
            fontSize: props.progressValueFontSize ||
                props.progressValueStyle?.fontSize ||
                props.radius / 2,
            color: props.progressValueColor ||
                props.progressValueStyle?.color ||
                props.activeStrokeColor,
        },
        input: {
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 0,
        },
    });
};
exports.default = styles;
