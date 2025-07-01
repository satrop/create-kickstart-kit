// Color configuration that mirrors the Sass color map
// This file is auto-generated from _colors.scss
// DO NOT EDIT MANUALLY - run 'pnpm run colors:sync' to regenerate
export const colors = {
  "red": {
    "300": "#ea3d3d",
    "400": "#e01717",
    "500": "#d11515"
  },
  "peach": {
    "300": "#fbc7a7"
  },
  "slate": {
    "300": "#c0d6d9"
  },
  "gray": {
    "300": "#353535"
  },
  "blue": {
    "300": "#60a5fa",
    "500": "#3b82f6",
    "700": "#1d4ed8"
  },
  "green": {
    "300": "#86efac",
    "500": "#22c55e",
    "700": "#15803d",
    "800": "#166534",
    "900": "#14532d"
  },
  "neutral": {
    "0-30": "#ffffff4d"
  },
  "yellow": {
    "100-75": "#ffbd2fbf"
  }
} as const;

export type ColorName = keyof typeof colors;
export type ColorShade<T extends ColorName> = keyof typeof colors[T];
export type ColorValue<T extends ColorName, S extends ColorShade<T>> = typeof colors[T][S];
