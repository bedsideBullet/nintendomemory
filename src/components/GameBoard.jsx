import React, { useEffect, useState, useRef } from "react";
import { Typography, Button } from "@mui/material";
import Swal from "sweetalert2";
import Card from "./Card";
import tokens from "../tokens";

const GameBoard = ({ category, onEndGame, highScores, setHighScores }) => {
	// Define point and timer constants for easy tweaking
	const matchPoint = 200; // Points per correct match
	const misMatch = -50; // Points per incorrect match
	const timeBonus = 100; // Points per second remaining after all matches
	const gameTimerDuration = 60; // Initial game timer duration in seconds
	const timerReducer = 5; // Seconds to reduce timer per level
	const minTimerDuration = 10; // Minimum timer duration to prevent unplayable games

	const [gameTokens, setGameTokens] = useState([]);
	const [flippedCards, setFlippedCards] = useState([]);
	const [matchedIds, setMatchedIds] = useState([]);
	const [incorrectAttempts, setIncorrectAttempts] = useState(0);
	const [timeLeft, setTimeLeft] = useState(gameTimerDuration); // Use constant for initial state
	const [gameOver, setGameOver] = useState(false);
	const [isPreviewPhase, setIsPreviewPhase] = useState(true); // New state for preview phase
	const [isGameStarted, setIsGameStarted] = useState(false); // Track when game starts
	const [level, setLevel] = useState(1); // Track current level
	const [initialScore, setInitialScore] = useState(0); // Carry over previous final score
	const timerIntervalRef = useRef(null); // Store timer interval ID

	// Calculate effective timer duration for the current level
	const effectiveTimerDuration = Math.max(
		gameTimerDuration - (level - 1) * timerReducer,
		minTimerDuration
	);

	// Load high scores from local storage on mount
	useEffect(() => {
		const storedHighScores = localStorage.getItem("highScores");
		if (storedHighScores) {
			setHighScores(JSON.parse(storedHighScores));
		} else {
			setHighScores([]); // Initialize empty if none exist
		}
	}, [setHighScores]);

	// Function to check and update high scores
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
						.sort((a, b) => b.score - a.score) // Sort descending
						.slice(0, 5); // Keep top 5
					setHighScores(newHighScores);
					localStorage.setItem("highScores", JSON.stringify(newHighScores));
				}
				onEndGame(newHighScores); // Pass updated high scores to parent
			});
		} else {
			onEndGame(highScores); // No high score, pass current high scores
		}
	};

	// Function to reset game state for a new level or game start
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
		// Initial game setup
		resetGame();

		// Function to show all cards flipped for 3 seconds
		const showCardsPreview = () => {
			setIsPreviewPhase(true); // Show front of all cards
			const previewTimeout = setTimeout(() => {
				setIsPreviewPhase(false); // Revert to back after 3 seconds
				setIsGameStarted(true); // Start the game
				// Start the game timer
				setTimeLeft(effectiveTimerDuration); // Use effective timer for level
				timerIntervalRef.current = setInterval(() => {
					setTimeLeft((prevTime) => {
						if (prevTime <= 1) {
							clearInterval(timerIntervalRef.current);
							setGameOver(true); // End game when time reaches 0
							return 0;
						}
						return prevTime - 1;
					});
				}, 1000);
			}, 3000);
			return () => clearTimeout(previewTimeout); // Cleanup timeout
		};

		// Call the preview function and show SweetAlert
		const cleanupPreview = showCardsPreview();
		Swal.fire({
			title: "Get Ready!",
			html: "The Game is About To Start!",
			timer: 3000,
			timerProgressBar: true,
			backdrop: "rgba(0, 0, 0, 0.3)", // Semi-transparent backdrop
			showConfirmButton: false, // Remove any confirm button
			didOpen: () => {
				const popup = Swal.getPopup();
				popup.style.opacity = "0.8"; // Apply opacity to popup
				popup.style.backgroundColor = "rgba(255, 255, 255, 0.7)"; // Semi-transparent white
				popup.style.backdropFilter = "blur(2px)"; // Optional blur effect
				popup.style.height = "300px"; // Set custom height
			},
			allowOutsideClick: false,
			allowEscapeKey: false,
		});

		// Cleanup on unmount
		return () => {
			cleanupPreview();
			if (timerIntervalRef.current) {
				clearInterval(timerIntervalRef.current);
			}
		};
	}, [category, level]);

	const handleCardClick = (index) => {
		if (isPreviewPhase || !isGameStarted || gameOver) return; // Disable clicks during preview, before game starts, or after game over

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
				// Check if all matches are made (8 pairs)
				if (newMatchedIds.length === 8) {
					setGameOver(true); // End the game
					// Stop the timer
					if (timerIntervalRef.current) {
						clearInterval(timerIntervalRef.current);
					}
					// Calculate final score
					const baseScore =
						newMatchedIds.length * matchPoint + incorrectAttempts * misMatch;
					const timeBonusPoints = timeLeft * timeBonus;
					const finalScore = initialScore + baseScore + timeBonusPoints;
					// Show congratulatory SweetAlert with score breakdown
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
							// Continue to next level
							setInitialScore(finalScore); // Carry over final score
							setLevel((prev) => prev + 1); // Increment level
						} else {
							// Return to menu, check high score
							checkAndUpdateHighScore(finalScore, level);
						}
					});
				}
			} else {
				setIncorrectAttempts((prev) => prev + 1); // Increment incorrect attempts
			}
			setTimeout(() => setFlippedCards([]), 1000);
		}
	};

	const isFlipped = (index) => {
		const token = gameTokens[index];
		return (
			isPreviewPhase || // All cards flipped during preview phase
			flippedCards.some((card) => card.index === index) ||
			matchedIds.includes(token.id)
		);
	};

	// Calculate live score (correct and incorrect matches)
	const baseScore =
		initialScore +
		matchedIds.length * matchPoint +
		incorrectAttempts * misMatch;

	// Calculate the final score (add time bonus only if all matches are made)
	const finalScore =
		matchedIds.length === 8 ? baseScore + timeLeft * timeBonus : baseScore;

	// Handle game over when timer runs out
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

	// Handle "End Game" button
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
							maxWidth: "500px",
							width: "100%", // Ensure it takes full available width for centering
							margin: "0 auto", // Center horizontally within the grid
							fontSize: "2rem",
							textAlign: "center",
							backgroundColor: "rgba(255, 255, 255, 1)",
							borderRadius: "28px",
							border: "8px solid rgba(230, 24, 54, 1)",
							padding: "10px", // Add padding for better appearance
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
