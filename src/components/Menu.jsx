import React from "react";
import { Grid, Typography, Box } from "@mui/material";

import marioLogo from "../assets/mario/marioLogo.png";
import dkLogo from "../assets/DK/dkLogo.png";
import pokemonLogo from "../assets/Pokemon/pokemonLogo.png";
import kirbyLogo from "../assets/kirby/kirbyLogo.png";
import switchImg from "../assets/mainImages/switch.png";
import zeldaLogo from "../assets/zelda/zeldaLogo.png";
import mainImage from "../assets/mainImages/category.png";

const Menu = ({ onCategorySelect }) => {
	const categories = [
		{ name: "Franchise One", image: marioLogo },
		{ name: "Franchise Two", image: dkLogo },
		{ name: "Franchise Three", image: kirbyLogo },
		{ name: "Franchise Four", image: zeldaLogo },
		{ name: "Franchise Five", image: pokemonLogo },
		{ name: "All Games", image: switchImg },
	];

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
