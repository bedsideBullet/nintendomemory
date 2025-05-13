import React from "react";
import { useTheme } from "@mui/material/styles"; // Import useTheme hook
// import nintendoImg from "../assets/nintendo.png"; // This is for the front, if used, or general branding
import switchImg from "../assets/switch.png"; // This is the image for the card back

const Card = ({ image, category, id, isFlipped, onClick }) => {
	const theme = useTheme(); // Get the current theme object
	const isLightTheme = theme.palette.mode === "light";

	// Define dynamic styles for the card's back based on the theme
	const cardBackStyles = {
		position: "absolute",
		width: "100%",
		height: "100%",
		backfaceVisibility: "hidden",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "8px",
		boxShadow: "7px 10px 5px rgba(0,0,0,0.5)", // Original shadow
		transition: "background-color 0.3s ease-in-out", // Smooth transition for color change

		// Theme-specific properties
		backgroundColor: isLightTheme ? "#686b72" : "#686b72", // White for light, #686b72 for dark
		backgroundImage: `url(${switchImg})`, // Image is always visible
		backgroundSize: "contain", // Always contain the image
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		padding: "10px", // Padding, mainly for the switchImg layout
		// Text color on the back (if any text was present and you want it to contrast)
		// color: isLightTheme ? theme.palette.getContrastText('#FFFFFF') : theme.palette.getContrastText('#686b72'),
	};

	return (
		<div
			onClick={() => onClick(id)}
			style={{
				perspective: "1000px",
				cursor: "pointer",
			}}
		>
			<div
				style={{
					width: "100%",
					height: "18vh", // Or your desired card height
					position: "relative",
					transformStyle: "preserve-3d",
					transition: "transform 0.3s ease-in-out", // Reduced duration for faster flip
					transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
				}}
			>
				{/* Front of the Card */}
				<div
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						backfaceVisibility: "hidden",
						backgroundColor: "rgba(230, 24, 54, 1)", //theme.palette.background.paper, // Use theme's paper color for front bg
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "column",
						borderRadius: "8px",
						boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
						transform: "rotateY(180deg)", // Front is initially 'hidden' by rotation
						padding: "5px", // Added some padding for the image
					}}
				>
					<img
						src={image} // This is the unique image for the card's front
						alt={`Token ${id}`}
						style={{ maxWidth: "100%", maxHeight: "70%", objectFit: "contain" }}
					/>
				</div>

				{/* Back of the Card */}
				<div style={cardBackStyles}>
					{/* Content is primarily the background image and color */}
				</div>
			</div>
		</div>
	);
};

export default Card;
