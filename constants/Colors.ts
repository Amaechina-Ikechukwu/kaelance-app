/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const pink = "#FF8888";
export const blue = "#6BC1FF";
export const error = "#FF4F4F";

export const Colors = {
  light: {
    text: "#111111",
    background: "#FCFCFC",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    hueTint: "#ECECEC",
    boxLinear1: "#F4F4F4",
    boxLinear2: "#ECECEC",
  },
  dark: {
    text: "#FCFCFC",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    hueTint: "#282828",
    boxLinear1: "#222222",
    boxLinear2: "#2E2E2E",
  },
};
