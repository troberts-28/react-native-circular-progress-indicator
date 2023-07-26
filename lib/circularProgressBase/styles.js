"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const styles = (props) => react_native_1.StyleSheet.create({
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
    rotatingContainer: {
        transform: [{ rotate: `${props.rotation}deg` }],
    },
});
exports.default = styles;
