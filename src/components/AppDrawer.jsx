import React, { useState, useEffect } from "react";
import {
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
	Box,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const AppDrawer = ({ open, onClose, onThemeSelect, highScores }) => {
	const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1000);
	const theme = useTheme(); // Access the current theme
	const isLightTheme = theme.palette.mode === "light"; // Determine if the light theme is active

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 1000);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const drawerWidth = isSmallScreen ? 250 : 400;

	// Define the themes available
	const themes = ["Light", "Dark"];

	// Prepare high scores with padding
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
		<Drawer
			anchor="left"
			open={open}
			onClose={onClose}
			PaperProps={{
				style: {
					width: drawerWidth,
					backgroundColor: isLightTheme
						? theme.palette.background.default
						: theme.palette.background.paper,
					color: theme.palette.text.primary,
					borderRadius: "0 15px 15px 0", // Rounded right edges
				},
			}}
		>
			<Box
				sx={{
					padding: 2,
					display: "flex",
					flexDirection: "column",
					height: "100%",
					justifyContent: "space-between",
				}}
			>
				{/* High Scores Section */}
				<Box>
					<Typography
						variant="h6"
						gutterBottom
						sx={{
							fontWeight: 700,
							textAlign: "center",
							color: theme.palette.primary.main,
							borderBottom: `2px solid ${theme.palette.primary.main}`,
							marginBottom: 2,
							paddingBottom: 1,
						}}
					>
						High Scores
					</Typography>
					<List dense>
						{paddedHighScores.map((entry, index) => (
							<ListItem
								key={index}
								disablePadding
								sx={{
									marginBottom: "8px",
									backgroundColor: isLightTheme ? "#f9f9f9" : "#424242",
									borderRadius: "8px",
									padding: "8px",
									boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
								}}
							>
								<ListItemText
									primary={`${index + 1}. ${entry.name} - Level ${
										entry.level
									} - ${entry.score} pts`}
									primaryTypographyProps={{
										fontWeight: 600,
										fontSize: "1rem",
										color: theme.palette.text.primary,
									}}
								/>
							</ListItem>
						))}
					</List>
				</Box>

				{/* Theme Selection Section */}
				<Box>
					<Typography
						variant="h6"
						gutterBottom
						sx={{
							fontWeight: 700,
							textAlign: "center",
							color: theme.palette.primary.main,
							borderBottom: `2px solid ${theme.palette.primary.main}`,
							marginBottom: 2,
							paddingBottom: 1,
						}}
					>
						Choose Your Theme
					</Typography>
					<List>
						{themes.map((themeName) => (
							<ListItem
								key={themeName}
								disablePadding
								sx={{
									marginBottom: "8px",
									backgroundColor: isLightTheme ? "#f9f9f9" : "#424242",
									borderRadius: "8px",
									padding: "8px",
									boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
								}}
							>
								<ListItemButton
									onClick={() => onThemeSelect(themeName)}
									sx={{
										justifyContent: "center",
									}}
								>
									<ListItemText
										primary={themeName}
										primaryTypographyProps={{
											textAlign: "center",
											fontWeight: 600,
											fontSize: "1rem",
											color: theme.palette.text.primary,
										}}
									/>
								</ListItemButton>
							</ListItem>
						))}
					</List>
				</Box>
			</Box>
		</Drawer>
	);
};

export default AppDrawer;
