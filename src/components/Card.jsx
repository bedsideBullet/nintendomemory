import React from "react";
import { useTheme } from "@mui/material/styles";

import switchImg from "../assets/mainImages/switch.png";

const Card = ({ image, category, id, isFlipped, onClick }) => {
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === "light";

	const cardBackStyles = {
		position: "absolute",
		width: "100%",
		height: "100%",
		backfaceVisibility: "hidden",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: "8px",
		boxShadow: "7px 10px 5px rgba(0,0,0,0.5)",
		transition: "background-color 0.3s ease-in-out",

		backgroundColor: isLightTheme ? "#686b72" : "#686b72",
		backgroundImage: `url(${switchImg})`,
		backgroundSize: "contain",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		padding: "10px",
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
					height: "18vh",
					position: "relative",
					transformStyle: "preserve-3d",
					transition: "transform 0.3s ease-in-out",
					transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
				}}
			>
				<div
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						backfaceVisibility: "hidden",
						backgroundColor: "rgba(230, 24, 54, 1)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "column",
						borderRadius: "8px",
						boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
						transform: "rotateY(180deg)",
						padding: "5px",
					}}
				>
					<img
						src={image}
						alt={`Token ${id}`}
						style={{ maxWidth: "100%", maxHeight: "70%", objectFit: "contain" }}
					/>
				</div>

				<div style={cardBackStyles}></div>
			</div>
		</div>
	);
};

export default Card;
