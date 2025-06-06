// --- Import local images for Category 1 ---
import mario from "./assets/mario.png";
import luigi from "./assets/luigi.png";
import peach from "./assets/peach.png";
import toad from "./assets/toad.png";
import yoshi from "./assets/yoshi.png";
import Bowser from "./assets/Bowser.png";
import goomba from "./assets/goomba.png";
import koopaTroopa from "./assets/koopaTroopa.png";
import fireFlower from "./assets/fireFlower.png";
import kingBobom from "./assets/kingBobom.png";
import piranhaPlant from "./assets/piranhaPlant.png";
import star from "./assets/star.png";

// --- Import local images for Category 2 ---
import krankyKong from "./assets/krankyKong.png";
import nLetter from "./assets/nLetter.png";
import oLetter from "./assets/oLetter.png";
import pirateKRool from "./assets/pirateKRool.png";
import donkeyKong from "./assets/donkeyKong.png";
import diddyKong from "./assets/diddyKong.png";
import kLetter from "./assets/kLetter.png";
import gLetter from "./assets/gLetter.png";
import dkcBalloons from "./assets/dkcBalloons.png";
import funkyKong from "./assets/funkyKong.png";
import babyKong from "./assets/babyKong.png";
import banannaBird from "./assets/banannaBird.png";

// --- Other categories use external URLs ---

const tokens = [
	// Category 1
	{ id: 1, image: mario, category: "1" },
	{ id: 2, image: luigi, category: "1" },
	{ id: 3, image: peach, category: "1" },
	{ id: 4, image: toad, category: "1" },
	{ id: 5, image: yoshi, category: "1" },
	{ id: 6, image: Bowser, category: "1" },
	{ id: 7, image: goomba, category: "1" },
	{ id: 8, image: koopaTroopa, category: "1" },
	{ id: 9, image: fireFlower, category: "1" },
	{ id: 10, image: kingBobom, category: "1" },
	{ id: 11, image: piranhaPlant, category: "1" },
	{ id: 12, image: star, category: "1" },

	// Category 2
	{ id: 13, image: krankyKong, category: "2" },
	{ id: 14, image: nLetter, category: "2" },
	{ id: 15, image: oLetter, category: "2" },
	{ id: 16, image: pirateKRool, category: "2" },
	{ id: 17, image: donkeyKong, category: "2" },
	{ id: 18, image: diddyKong, category: "2" },
	{ id: 19, image: kLetter, category: "2" },
	{ id: 20, image: gLetter, category: "2" },
	{ id: 21, image: dkcBalloons, category: "2" },
	{ id: 22, image: funkyKong, category: "2" },
	{ id: 23, image: babyKong, category: "2" },
	{ id: 24, image: banannaBird, category: "2" },

	// Category 3 (external images)
	{
		id: 25,
		image: "https://via.placeholder.com/150?text=Token+1",
		category: "3",
	},
	{
		id: 26,
		image: "https://via.placeholder.com/150?text=Token+2",
		category: "3",
	},
	{
		id: 27,
		image: "https://via.placeholder.com/150?text=Token+3",
		category: "3",
	},
	{
		id: 28,
		image: "https://via.placeholder.com/150?text=Token+4",
		category: "3",
	},
	{
		id: 29,
		image: "https://via.placeholder.com/150?text=Token+5",
		category: "3",
	},
	{
		id: 30,
		image: "https://via.placeholder.com/150?text=Token+6",
		category: "3",
	},
	{
		id: 31,
		image: "https://via.placeholder.com/150?text=Token+7",
		category: "3",
	},
	{
		id: 32,
		image: "https://via.placeholder.com/150?text=Token+8",
		category: "3",
	},
	{
		id: 33,
		image: "https://via.placeholder.com/150?text=Token+9",
		category: "3",
	},
	{
		id: 34,
		image: "https://via.placeholder.com/150?text=Token+10",
		category: "3",
	},
	{
		id: 35,
		image: "https://via.placeholder.com/150?text=Token+11",
		category: "3",
	},
	{
		id: 36,
		image: "https://via.placeholder.com/150?text=Token+12",
		category: "3",
	},

	// Category 4 (external images)
	{
		id: 37,
		image: "https://via.placeholder.com/150?text=Token+1",
		category: "4",
	},
	{
		id: 38,
		image: "https://via.placeholder.com/150?text=Token+2",
		category: "4",
	},
	{
		id: 39,
		image: "https://via.placeholder.com/150?text=Token+3",
		category: "4",
	},
	{
		id: 40,
		image: "https://via.placeholder.com/150?text=Token+4",
		category: "4",
	},
	{
		id: 41,
		image: "https://via.placeholder.com/150?text=Token+5",
		category: "4",
	},
	{
		id: 42,
		image: "https://via.placeholder.com/150?text=Token+6",
		category: "4",
	},
	{
		id: 43,
		image: "https://via.placeholder.com/150?text=Token+7",
		category: "4",
	},
	{
		id: 44,
		image: "https://via.placeholder.com/150?text=Token+8",
		category: "4",
	},
	{
		id: 45,
		image: "https://via.placeholder.com/150?text=Token+9",
		category: "4",
	},
	{
		id: 46,
		image: "https://via.placeholder.com/150?text=Token+10",
		category: "4",
	},
	{
		id: 47,
		image: "https://via.placeholder.com/150?text=Token+11",
		category: "4",
	},
	{
		id: 48,
		image: "https://via.placeholder.com/150?text=Token+12",
		category: "4",
	},

	// Category 5 (external images)
	{
		id: 49,
		image: "https://via.placeholder.com/150?text=Token+1",
		category: "5",
	},
	{
		id: 50,
		image: "https://via.placeholder.com/150?text=Token+2",
		category: "5",
	},
	{
		id: 51,
		image: "https://via.placeholder.com/150?text=Token+3",
		category: "5",
	},
	{
		id: 52,
		image: "https://via.placeholder.com/150?text=Token+4",
		category: "5",
	},
	{
		id: 53,
		image: "https://via.placeholder.com/150?text=Token+5",
		category: "5",
	},
	{
		id: 54,
		image: "https://via.placeholder.com/150?text=Token+6",
		category: "5",
	},
	{
		id: 55,
		image: "https://via.placeholder.com/150?text=Token+7",
		category: "5",
	},
	{
		id: 56,
		image: "https://via.placeholder.com/150?text=Token+8",
		category: "5",
	},
	{
		id: 57,
		image: "https://via.placeholder.com/150?text=Token+9",
		category: "5",
	},
	{
		id: 58,
		image: "https://via.placeholder.com/150?text=Token+10",
		category: "5",
	},
	{
		id: 59,
		image: "https://via.placeholder.com/150?text=Token+11",
		category: "5",
	},
	{
		id: 60,
		image: "https://via.placeholder.com/150?text=Token+12",
		category: "5",
	},
];

export default tokens;
