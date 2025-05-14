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
								width: "170px", 
								height: "170px", 
								display: "flex", 
								justifyContent: "center",
								alignItems: "center", 
								border: "none", 
								background: "none", 
								cursor: "pointer", 
								"&:hover": {
									scale: 1.2, 
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

