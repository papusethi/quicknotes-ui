import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import App from "./App";
import { useAppSelector } from "./redux/hooks";

const LightTheme = createTheme({
	palette: { mode: "light" },
	typography: {
		button: { textTransform: "none" },
	},
});

const DarkTheme = createTheme({
	palette: { mode: "dark" },
	typography: {
		button: { textTransform: "none" },
	},
});

const AppWrapper: React.FC = () => {
	const theme = useAppSelector((state) => state.app.theme);

	return (
		<ThemeProvider theme={theme === "dark" ? DarkTheme : LightTheme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	);
};

export default AppWrapper;
