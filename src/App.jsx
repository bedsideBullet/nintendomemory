import React, { useState, useEffect } from "react";
import {
	ThemeProvider,
	CssBaseline,
	Button,
	Typography,
	Box,
} from "@mui/material";
import Menu from "./components/Menu";
import GameBoard from "./components/GameBoard";
import AppDrawer from "./components/AppDrawer";
import { lightTheme, darkTheme } from "./themes";
import nintendoImgD from "./assets/MainImages/dNintendo.png";
import nintendoImgL from "./assets/MainImages/nintendo.png";

const App = () => {
	const [currentTheme, setCurrentTheme] = useState(lightTheme);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [highScores, setHighScores] = useState([]);

	const handleCategorySelect = (category) => setSelectedCategory(category);

	const nintendoImg = currentTheme === lightTheme ? nintendoImgL : nintendoImgD;

	useEffect(() => {
		const storedHighScores = localStorage.getItem("highScores");
		if (storedHighScores) {
			setHighScores(JSON.parse(storedHighScores));
		} else {
			setHighScores([]);
		}
	}, [setHighScores]);

	const handleThemeSelect = (themeName) => {
		switch (themeName) {
			case "Light":
				setCurrentTheme(lightTheme);
				break;
			case "Dark":
				setCurrentTheme(darkTheme);
				break;
			default:
				setCurrentTheme(lightTheme);
		}
	};

	const handleEndGame = (updatedHighScores) => {
		setHighScores(updatedHighScores);
		setSelectedCategory(null);
	};

	return (
		<ThemeProvider theme={currentTheme}>
			<CssBaseline />{" "}
			<Box
				style={{
					textAlign: "center",
					padding: "20px",
					backgroundImage: currentTheme.backgroundImage,
					backgroundSize: "cover",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					backgroundAttachment: "fixed",
					minHeight: "100vh",
					transition: "background-image 0.3s ease-in-out",
					color: currentTheme.palette.text.primary,
				}}
			>
				<img
					src={nintendoImg}
					alt="logo"
					style={{
						width: "550px",
						height: "auto",
						marginTop: "-75px",
						marginBottom: "-150px",
					}}
				/>

				<Button
					style={{
						position: "absolute",
						top: "10px",
						left: "10px",
						height: "60px",
						fontSize: "3rem",
						backgroundColor: "transparent",
					}}
					onClick={() => setDrawerOpen(true)}
				>
					☰
				</Button>
				{selectedCategory ? (
					<GameBoard
						category={selectedCategory}
						onEndGame={handleEndGame}
						highScores={highScores}
						setHighScores={setHighScores}
					/>
				) : (
					<Menu onCategorySelect={handleCategorySelect} />
				)}

				<AppDrawer
					open={drawerOpen}
					onClose={() => setDrawerOpen(false)}
					onThemeSelect={handleThemeSelect}
					highScores={highScores}
				/>
			</Box>
		</ThemeProvider>
	);
};

export default App;
