"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const styles = (props) => {
    return react_native_1.StyleSheet.create({
        container: {
            width: props.radius * 2,
            height: props.radius * 2,
            alignItems: 'center',
            justifyContent: 'center',
        },
        valueContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
        valueContainerRow: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        rotatingContainer: {
            transform: [{ rotate: `${props.rotation}deg` }],
        },
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
        },
        title: {
            textAlign: 'center',
            width: '70%',
            marginTop: props.showProgressValue ? props.radius * 0.05 : 0,
            color: props.titleColor || props.titleStyle?.color || props.activeStrokeColor,
            fontSize: props.titleFontSize || props.titleStyle?.fontSize || props.radius / 4,
        },
        subtitle: {
            color: props.subtitleColor ||
                props.subtitleStyle?.color ||
                props.activeStrokeColor,
            fontSize: props.subtitleFontSize ||
                props.subtitleStyle?.fontSize ||
                props.radius / 5,
        },
    });
};
exports.default = styles;
