import React, { useEffect, useState, useRef } from "react";
import { Typography, Button } from "@mui/material";
import Swal from "sweetalert2";
import Card from "./Card";
import tokens from "../tokens";

const GameBoard = ({ category, onEndGame, highScores, setHighScores }) => {
	const matchPoint = 200;
	const misMatch = -50; 
	const timeBonus = 100;
	const gameTimerDuration = 60; 
	const timerReducer = 5; 
	const minTimerDuration = 10;

	const [gameTokens, setGameTokens] = useState([]);
	const [flippedCards, setFlippedCards] = useState([]);
	const [matchedIds, setMatchedIds] = useState([]);
	const [incorrectAttempts, setIncorrectAttempts] = useState(0);
	const [timeLeft, setTimeLeft] = useState(gameTimerDuration); 
	const [gameOver, setGameOver] = useState(false);
	const [isPreviewPhase, setIsPreviewPhase] = useState(true); 
	const [isGameStarted, setIsGameStarted] = useState(false); 
	const [level, setLevel] = useState(1); 
	const [initialScore, setInitialScore] = useState(0);
	const timerIntervalRef = useRef(null); 

	const effectiveTimerDuration = Math.max(
		gameTimerDuration - (level - 1) * timerReducer,
		minTimerDuration
	);

	useEffect(() => {
		const storedHighScores = localStorage.getItem("highScores");
		if (storedHighScores) {
			setHighScores(JSON.parse(storedHighScores));
		} else {
			setHighScores([]); 
		}
	}, [setHighScores]);

	const checkAndUpdateHighScore = (score, level) => {
		if (
			highScores.length < 5 ||
			highScores.some((entry) => score > entry.score)
		) {
			Swal.fire({
				title: "New High Score!",
				text: "Enter your 3-character initials:",
				input: "text",
				inputAttributes: {
					maxlength: 3,
					autocapitalize: "off",
					autocorrect: "off",
				},
				inputValidator: (value) => {
					if (!value || value.length !== 3 || !/^[A-Za-z0-9]{3}$/.test(value)) {
						return "Please enter exactly 3 alphanumeric characters!";
					}
				},
				confirmButtonText: "Submit",
				allowOutsideClick: false,
				allowEscapeKey: false,
			}).then((result) => {
				if (result.isConfirmed && result.value) {
					const newHighScores = [
						...highScores,
						{ name: result.value.toUpperCase(), score, level },
					]
						.sort((a, b) => b.score - a.score) 
						.slice(0, 5); 
					setHighScores(newHighScores);
					localStorage.setItem("highScores", JSON.stringify(newHighScores));
				}
				onEndGame(newHighScores); 
			});
		} else {
			onEndGame(highScores); 
		}
	};

	const resetGame = () => {
		let filteredTokens = [];
		if (category === "All Games") {
			filteredTokens = tokens;
		} else {
			const categoryNumber = categoriesMap[category];
			filteredTokens = tokens.filter(
				(token) => token.category === categoryNumber.toString()
			);
		}

		const selectedTokens = [];
		while (selectedTokens.length < 8 && filteredTokens.length > 0) {
			const randomIndex = Math.floor(Math.random() * filteredTokens.length);
			selectedTokens.push(filteredTokens.splice(randomIndex, 1)[0]);
		}

		const duplicatedTokens = [...selectedTokens, ...selectedTokens];
		const shuffledTokens = duplicatedTokens
			.map((token) => ({ ...token }))
			.sort(() => Math.random() - 0.5)
			.map((token, index) => ({ ...token, uniqueIndex: index }));

		setGameTokens(shuffledTokens);
		setFlippedCards([]);
		setMatchedIds([]);
		setIncorrectAttempts(0);
		setGameOver(false);
		setIsPreviewPhase(true);
		setIsGameStarted(false);
		setTimeLeft(effectiveTimerDuration);
	};

	useEffect(() => {
		resetGame();

		const showCardsPreview = () => {
			setIsPreviewPhase(true); 
			const previewTimeout = setTimeout(() => {
				setIsPreviewPhase(false);
				setIsGameStarted(true); 
				setTimeLeft(effectiveTimerDuration); 
				timerIntervalRef.current = setInterval(() => {
					setTimeLeft((prevTime) => {
						if (prevTime <= 1) {
							clearInterval(timerIntervalRef.current);
							setGameOver(true); 
							return 0;
						}
						return prevTime - 1;
					});
				}, 1000);
			}, 3000);
			return () => clearTimeout(previewTimeout); 
		};

		const cleanupPreview = showCardsPreview();
		Swal.fire({
			title: "Get Ready!",
			html: "The Game is About To Start!",
			timer: 3000,
			timerProgressBar: true,
			backdrop: "rgba(0, 0, 0, 0.3)", 
			showConfirmButton: false, 
			didOpen: () => {
				const popup = Swal.getPopup();
				popup.style.opacity = "0.8"; 
				popup.style.backgroundColor = "rgba(255, 255, 255, 0.7)"; 
				popup.style.backdropFilter = "blur(2px)"; 
				popup.style.height = "300px"; 
			},
			allowOutsideClick: false,
			allowEscapeKey: false,
		});

		
		return () => {
			cleanupPreview();
			if (timerIntervalRef.current) {
				clearInterval(timerIntervalRef.current);
			}
		};
	}, [category, level]);

	const handleCardClick = (index) => {
		if (isPreviewPhase || !isGameStarted || gameOver) return; 

		const clickedCard = gameTokens[index];

		if (
			flippedCards.length === 2 ||
			flippedCards.some((card) => card.index === index) ||
			matchedIds.includes(clickedCard.id)
		) {
			return;
		}

		const newFlipped = [...flippedCards, { ...clickedCard, index }];
		setFlippedCards(newFlipped);

		if (newFlipped.length === 2) {
			const [first, second] = newFlipped;
			if (first.id === second.id) {
				const newMatchedIds = [...matchedIds, first.id];
				setMatchedIds(newMatchedIds);
				if (newMatchedIds.length === 8) {
					setGameOver(true); 
					if (timerIntervalRef.current) {
						clearInterval(timerIntervalRef.current);
					}
					const baseScore =
						newMatchedIds.length * matchPoint + incorrectAttempts * misMatch;
					const timeBonusPoints = timeLeft * timeBonus;
					const finalScore = initialScore + baseScore + timeBonusPoints;
					Swal.fire({
						title: "🎉 Congrats, you won!",
						html: `
							You've matched all the cards!<br><br>
							Matched points: ${baseScore}<br>
							+<br>
							Time Bonus: ${timeBonusPoints}<br>
							=<br>
							Final Score: ${finalScore}
						`,
						showCancelButton: true,
						confirmButtonText: "Continue",
						cancelButtonText: "Menu",
					}).then((result) => {
						if (result.isConfirmed) {
							setInitialScore(finalScore); 
							setLevel((prev) => prev + 1); 
						} else {
							checkAndUpdateHighScore(finalScore, level);
						}
					});
				}
			} else {
				setIncorrectAttempts((prev) => prev + 1); 
			}
			setTimeout(() => setFlippedCards([]), 1000);
		}
	};

	const isFlipped = (index) => {
		const token = gameTokens[index];
		return (
			isPreviewPhase || 
			flippedCards.some((card) => card.index === index) ||
			matchedIds.includes(token.id)
		);
	};

	const baseScore =
		initialScore +
		matchedIds.length * matchPoint +
		incorrectAttempts * misMatch;

	const finalScore =
		matchedIds.length === 8 ? baseScore + timeLeft * timeBonus : baseScore;

	useEffect(() => {
		if (gameOver && matchedIds.length < 8) {
			Swal.fire({
				title: "💀 Game Over!",
				html: `Time's up!<br><strong>Final Score:</strong> ${finalScore}`,
				confirmButtonText: "Menu",
			}).then(() => {
				checkAndUpdateHighScore(finalScore, level);
			});
		}
	}, [gameOver, matchedIds, timeLeft, finalScore, level]);

	const handleEndGame = () => {
		if (timerIntervalRef.current) {
			clearInterval(timerIntervalRef.current);
		}
		checkAndUpdateHighScore(finalScore, level);
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				padding: "20px",
			}}
		>
			{gameTokens.length > 0 && (
				<Button
					variant="outlined"
					color="error"
					onClick={handleEndGame}
					style={{ alignSelf: "flex-end", marginBottom: "10px" }}
				>
					End Game
				</Button>
			)}

			<div
				style={{
					display: "grid",
					gridTemplateColumns: "repeat(4, 1fr)",
					gap: "16px",
					width: "90%",
					maxWidth: "1200px",
				}}
			>
				{isGameStarted && (
					<Typography
						variant="body1"
						style={{
							gridColumn: "span 4",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							maxWidth: "600px",
							width: "100%", 
							margin: "0 auto", 
							fontSize: "2rem",
							textAlign: "center",
							backgroundColor: "rgba(255, 255, 255, 1)",
							borderRadius: "28px",
							border: "8px solid rgba(230, 24, 54, 1)",
							padding: "10px", 
						}}
					>
						Time: {timeLeft}s | Level: {level} | Score:{" "}
						{gameOver && matchedIds.length === 8
							? `Final: ${finalScore}`
							: baseScore}
					</Typography>
				)}

				{gameTokens.map((token, index) => (
					<Card
						key={index}
						image={token.image}
						category={token.category}
						id={token.id}
						isFlipped={isFlipped(index)}
						onClick={() => handleCardClick(index)}
					/>
				))}
			</div>
		</div>
	);
};

const categoriesMap = {
	"Franchise One": 1,
	"Franchise Two": 2,
	"Franchise Three": 3,
	"Franchise Four": 4,
	"Franchise Five": 5,
};

export default GameBoard;

