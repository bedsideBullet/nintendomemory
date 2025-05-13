// import React, { useState, useEffect } from "react";
// import {
// 	Drawer,
// 	List,
// 	ListItem,
// 	ListItemText,
// 	Typography,
// 	Box,
// } from "@mui/material";

// const AppDrawer = ({ open, onClose, onThemeSelect, highScores }) => {
// 	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);

// 	useEffect(() => {
// 		const handleResize = () => {
// 			setIsSmallScreen(window.innerWidth < 1000);
// 		};

// 		window.addEventListener("resize", handleResize);

// 		// Clean up the event listener
// 		return () => {
// 			window.removeEventListener("resize", handleResize);
// 		};
// 	}, []);

// 	const drawerWidth = isSmallScreen ? 250 : 500;

// 	const themes = [
// 		"Retro Light",
// 		"Retro Dark",
// 		"Futuristic Light",
// 		"Futuristic Dark",
// 	];

// 	// Ensure high scores have valid entries and pad to 5
// 	const paddedHighScores = [
// 		...highScores.map((entry) => ({
// 			name: entry.name || "---",
// 			level: entry.level || 0,
// 			score: entry.score || 0,
// 		})),
// 		...Array(5 - highScores.length).fill({ name: "---", level: 0, score: 0 }),
// 	].slice(0, 5);

// 	return (
// 		<Drawer anchor="left" open={open} onClose={onClose}>
// 			<Box sx={{ width: drawerWidth, padding: (theme) => theme.spacing(2) }}>
// 				<Typography variant="h6">High Scores</Typography>
// 				<List>
// 					{paddedHighScores.map((entry, index) => (
// 						<ListItem key={index}>
// 							<ListItemText
// 								primary={`${index + 1}. ${entry.name} - Level ${
// 									entry.level
// 								} - ${entry.score}pts`}
// 							/>
// 						</ListItem>
// 					))}
// 				</List>
// 				<Typography variant="h6">Choose Your Theme</Typography>
// 				<List>
// 					{themes.map((theme, index) => (
// 						<ListItem button key={index} onClick={() => onThemeSelect(theme)}>
// 							<ListItemText primary={theme} />
// 						</ListItem>
// 					))}
// 				</List>
// 			</Box>
// 		</Drawer>
// 	);
// };

// export default AppDrawer;

// src/components/AppDrawer.js
import React, { useState, useEffect } from "react";
import {
	Drawer,
	List,
	ListItem,
	ListItemButton, // Using ListItemButton for better semantics
	ListItemText,
	Typography,
	Box,
} from "@mui/material";

const AppDrawer = ({ open, onClose, onThemeSelect, highScores }) => {
	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 1000);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const drawerWidth = isSmallScreen ? 250 : 500;

	const themes = [
		// Updated theme names
		"Light",
		"Dark",
	];

	// Ensure high scores have valid entries and pad to 5
	const paddedHighScores = [
		...highScores.map((entry) => ({
			name: entry.name || "---",
			level: entry.level || 0,
			score: entry.score || 0,
		})),
		...Array(Math.max(0, 5 - highScores.length)).fill({
			name: "---",
			level: 0,
			score: 0,
		}),
	].slice(0, 5);

	return (
		<Drawer anchor="left" open={open} onClose={onClose}>
			<Box sx={{ width: drawerWidth, padding: (theme) => theme.spacing(2) }}>
				<Typography variant="h6" gutterBottom>
					{" "}
					{/* Added gutterBottom for spacing */}
					High Scores
				</Typography>
				<List dense>
					{" "}
					{/* Added dense for a more compact list */}
					{paddedHighScores.map((entry, index) => (
						<ListItem key={index} disablePadding>
							<ListItemText
								primary={`${index + 1}. ${entry.name} - Level ${
									entry.level
								} - ${entry.score}pts`}
							/>
						</ListItem>
					))}
				</List>

				<Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
					{" "}
					{/* Added gutterBottom and marginTop */}
					Choose Your Theme
				</Typography>
				<List>
					{themes.map(
						(
							themeName // Changed variable name for clarity
						) => (
							<ListItem key={themeName} disablePadding>
								<ListItemButton onClick={() => onThemeSelect(themeName)}>
									<ListItemText primary={themeName} />
								</ListItemButton>
							</ListItem>
						)
					)}
				</List>
			</Box>
		</Drawer>
	);
};

export default AppDrawer;
