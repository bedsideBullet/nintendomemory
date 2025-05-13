import { createTheme } from "@mui/material/styles";

import lightBackgroundImageFile from "./assets/lightBg.png";
import darkBackgroundImageFile from "./assets/darkBg.png";

// Define the Nintendo Red color
const nintendoRed = "#E60012";

const burbankFontFamily = "'Burbank Big Condensed Black', sans-serif";

export const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#ff5722", // Example
		},
		secondary: {
			main: "#ffc107", // Example
		},
		background: {
			default: "#f5f5f5", // A light background color
		},
		text: {
			primary: nintendoRed,
			secondary: nintendoRed, // You might adjust this for less prominent text
		},
	},
	typography: {
		fontFamily: burbankFontFamily,
		fontWeight: 700, // Attempt to set the default font weight
		// You can still add variations for headings, etc., with different weights if needed
	},
	// Custom property for background image
	backgroundImage: `url(${lightBackgroundImageFile})`,
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					fontFamily: burbankFontFamily,
					fontWeight: 700,
					color: nintendoRed,
				},
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					fontFamily: burbankFontFamily,
					fontWeight: 700,
					color: nintendoRed,
				},
			},
		},
		// Override other components as needed
	},
});

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#00bcd4", // Example
		},
		secondary: {
			main: "#ffeb3b", // Example
		},
		background: {
			default: "#303030", // A dark background color
		},
		text: {
			primary: nintendoRed,
			secondary: nintendoRed, // You might adjust this for less prominent text
		},
	},
	typography: {
		fontFamily: burbankFontFamily,
		fontWeight: 700, // Attempt to set the default font weight
		// You can still add variations for headings, etc., with different weights if needed
	},
	// Custom property for background image
	backgroundImage: `url(${darkBackgroundImageFile})`,
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					fontFamily: burbankFontFamily,
					fontWeight: 700,
					color: nintendoRed,
				},
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					fontFamily: burbankFontFamily,
					fontWeight: 700,
					color: nintendoRed,
				},
			},
		},
		// Override other components as needed
	},
});
