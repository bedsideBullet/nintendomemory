import React from "react";
import { Grid, Typography, Box } from "@mui/material";

const Menu = ({ onCategorySelect }) => {
	const categories = [
		{ name: "Franchise One", image: "src/assets/marioLogo.png" },
		{ name: "Franchise Two", image: "src/assets/dkLogo.png" },
		{ name: "Franchise Three", image: "src/assets/kirbyLogo.png" },
		{ name: "Franchise Four", image: "src/assets/zeldaLogo.png" },
		{ name: "Franchise Five", image: "src/assets/pokemonLogo.png" },
		{ name: "All Games", image: "src/assets/switch.png" },
	];

	const mainImage = "src/assets/category.png";

	return (
		<div
			style={{
				padding: "20px",
				textAlign: "center",
				maxWidth: "600px",
				margin: "0 auto",
			}}
		>
			<img
				src={mainImage}
				alt="Category Selection"
				style={{
					display: "block",
					margin: "0 auto 10px",
					maxWidth: "300px",
					height: "auto",
				}}
			/>
			<Grid container spacing={2} justifyContent="center">
				{categories.map((category, index) => (
					<Grid item key={index}>
						<Box
							component="button"
							onClick={() => onCategorySelect(category.name)}
							sx={{
								width: "170px", // Set button width larger than image
								height: "170px", // Set button height larger than image
								display: "flex", // Use flexbox to center the image
								justifyContent: "center", // Center horizontally
								alignItems: "center", // Center vertically
								border: "none", // No border
								background: "none", // Transparent background
								cursor: "pointer", // Pointer cursor on hover
								"&:hover": {
									opacity: 0.8, // Hover effect
								},
							}}
						>
							<img
								src={category.image}
								alt={category.name}
								style={{
									backgroundColor: "rgba(230, 24, 54, 1)",
									border: "3px solid black",
									width: "150px",
									height: "150px",
									objectFit: "contain",
									borderRadius: "28px",
									padding: "5px",
								}}
							/>
						</Box>
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default Menu;
