// /**
//  * Theme Utilities for MR Startups
//  *
//  * Simple utility functions for working with the color theme system
//  */

// // Color utility functions
// export const getColor = (colorName: string): string => {
//   return `var(--color-${colorName})`;
// };

// // Common color getters
// export const colors = {
//   primary: () => getColor("primary"),
//   primaryLight: () => getColor("primary-light"),
//   primaryDark: () => getColor("primary-dark"),
//   secondary: () => getColor("secondary"),
//   secondaryLight: () => getColor("secondary-light"),
//   secondaryDark: () => getColor("secondary-dark"),
//   background: () => getColor("background"),
//   foreground: () => getColor("foreground"),
//   muted: () => getColor("muted"),
//   border: () => getColor("border"),
//   card: () => getColor("card"),
//   cardForeground: () => getColor("card-foreground"),
//   success: () => getColor("success"),
//   warning: () => getColor("warning"),
//   error: () => getColor("error"),
//   info: () => getColor("info"),
// } as const;

// // Style object creators
// export const createColorStyle = (colorName: string) => ({
//   color: getColor(colorName),
// });

// export const createBackgroundStyle = (colorName: string) => ({
//   backgroundColor: getColor(colorName),
// });

// export const createBorderStyle = (colorName: string) => ({
//   borderColor: getColor(colorName),
// });

// // Common style combinations
// export const styleCombinations = {
//   primaryButton: {
//     backgroundColor: colors.primary(),
//     color: colors.foreground(),
//   },
//   secondaryButton: {
//     backgroundColor: "transparent",
//     borderColor: colors.border(),
//     color: colors.foreground(),
//   },
//   card: {
//     backgroundColor: colors.card(),
//     color: colors.cardForeground(),
//     borderColor: colors.border(),
//   },
//   text: {
//     primary: createColorStyle("foreground"),
//     secondary: createColorStyle("muted"),
//     muted: createColorStyle("muted"),
//   },
//   background: {
//     primary: createBackgroundStyle("background"),
//     card: createBackgroundStyle("card"),
//   },
// } as const;

// // Type definitions
// export type ColorName =
//   | "primary"
//   | "primary-light"
//   | "primary-dark"
//   | "secondary"
//   | "secondary-light"
//   | "secondary-dark"
//   | "background"
//   | "foreground"
//   | "muted"
//   | "border"
//   | "card"
//   | "card-foreground"
//   | "success"
//   | "warning"
//   | "error"
//   | "info";

// export type StyleCombination = keyof typeof styleCombinations;
