"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("@testing-library/react-native");
const index_1 = __importDefault(require("./index"));
describe('render circular progress base', () => {
    it('should render progress with minimum items', () => {
        const { queryByTestId } = (0, react_native_1.render)(<index_1.default value={50}/>);
        expect(queryByTestId('progress-bar')).toBeDefined();
        expect(queryByTestId('progress-circle')).toBeDefined();
    });
    it('should call onAnimationComplete function', async () => {
        const onAnimationCompleted = jest.fn();
        (0, react_native_1.render)(<index_1.default value={50} duration={1500} onAnimationComplete={onAnimationCompleted}/>);
        expect(onAnimationCompleted).toHaveBeenCalledTimes(1);
    });
});
