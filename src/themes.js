import { createTheme } from "@mui/material/styles";

import lightBackgroundImageFile from "./assets/lightBg.png";
import darkBackgroundImageFile from "./assets/darkBg.png";

const nintendoRed = "#E60012";

const burbankFontFamily = "'Burbank Big Condensed Black', sans-serif";

export const lightTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#ff5722",
		},
		secondary: {
			main: "#ffc107",
		},
		background: {
			default: "#f5f5f5",
		},
		text: {
			primary: nintendoRed,
			secondary: nintendoRed,
		},
	},
	typography: {
		fontFamily: burbankFontFamily,
		fontWeight: 700,
	},
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
	},
});

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#00bcd4",
		},
		secondary: {
			main: "#ffeb3b",
		},
		background: {
			default: "#303030",
		},
		text: {
			primary: nintendoRed,
			secondary: nintendoRed,
		},
	},
	typography: {
		fontFamily: burbankFontFamily,
		fontWeight: 700,
	},
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
	},
});
