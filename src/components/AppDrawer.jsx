// import React, { useState, useEffect } from "react";
// import {
// 	Drawer,
// 	List,
// 	ListItem,
// 	ListItemButton, 
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
// 		return () => {
// 			window.removeEventListener("resize", handleResize);
// 		};
// 	}, []);

// 	const drawerWidth = isSmallScreen ? 250 : 500;

// 	const themes = [
// 		"Light",
// 		"Dark",
// 	];

// 	const paddedHighScores = [
// 		...highScores.map((entry) => ({
// 			name: entry.name || "---",
// 			level: entry.level || 0,
// 			score: entry.score || 0,
// 		})),
// 		...Array(Math.max(0, 5 - highScores.length)).fill({
// 			name: "---",
// 			level: 0,
// 			score: 0,
// 		}),
// 	].slice(0, 5);

// 	return (
// 		<Drawer anchor="left" open={open} onClose={onClose}>
// 			<Box sx={{ width: drawerWidth, padding: (theme) => theme.spacing(2) }}>
// 				<Typography variant="h6" gutterBottom>
// 					{" "}
// 					High Scores
// 				</Typography>
// 				<List dense>
// 					{" "}
// 					{paddedHighScores.map((entry, index) => (
// 						<ListItem key={index} disablePadding>
// 							<ListItemText
// 								primary={`${index + 1}. ${entry.name} - Level ${
// 									entry.level
// 								} - ${entry.score}pts`}
// 							/>
// 						</ListItem>
// 					))}
// 				</List>

// 				<Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
// 					{" "}
// 					Choose Your Theme
// 				</Typography>
// 				<List>
// 					{themes.map(
// 						(
// 							themeName 
// 						) => (
// 							<ListItem key={themeName} disablePadding>
// 								<ListItemButton onClick={() => onThemeSelect(themeName)}>
// 									<ListItemText primary={themeName} />
// 								</ListItemButton>
// 							</ListItem>
// 						)
// 					)}
// 				</List>
// 			</Box>
// 		</Drawer>
// 	);
// };

// export default AppDrawer;

import React, { useState, useEffect } from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemText, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

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
  const theme = useTheme();
  const drawerWidth = isSmallScreen ? 250 : 500;

  const themes = ["Light", "Dark"];

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
      <Box sx={{ width: drawerWidth }}>
        <Typography variant="h6" gutterBottom>
          High Scores
        </Typography>
        <List dense>
          {paddedHighScores.map((entry, index) => (
            <ListItem key={index} disablePadding>
              <ListItemText
                primary={`${index + 1}. ${entry.name} - Level ${entry.level} - ${entry.score}pts`}
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
          Choose Your Theme
        </Typography>
        <List>
          {themes.map((themeName) => (
            <ListItem key={themeName} disablePadding>
              <ListItemButton onClick={() => onThemeSelect(themeName)}>
                <ListItemText primary={themeName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default AppDrawer;