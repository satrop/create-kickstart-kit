// Color configuration that mirrors the Sass color map
// This should be kept in sync with _colors.scss
// This file is safe to modify - add, remove, or change colors as needed
export const colors = {
  red: {
    300: "#ea3d3d",
    400: "#e01717", 
    500: "#d11515",
  },
  yellow: {
    300: "#fff4c7",
    500: "#eeca75",
  },
  peach: {
    300: "#fbc7a7",
  },
  slate: {
    300: "#c0d6d9",
  },
  gray: {
    300: "#353535",
  },
  blue: {
    300: "#60a5fa",
    500: "#3b82f6",
    700: "#1d4ed8",
  },
} as const;
