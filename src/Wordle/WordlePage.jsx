import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

export const WordlePage = () => {
  const [gameOver, setGameOver] = useState(false);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [grid, setGrid] = useState(
    Array(6)
      .fill()
      .map(() => Array(5).fill(""))
  );
  const [gameStarted, setGameStarted] = useState(false);
  const [cellColors, setCellColors] = useState(
    Array(6)
      .fill()
      .map(() => Array(5).fill("white"))
  );
  const [showDialog, setShowDialog] = useState(false);
  const [won, setWon] = useState(false);
  const [word, setWord] = useState("");
  const [gameKey, setGameKey] = useState(0);
  const [invalidWordDialog, setInvalidWordDialog] = useState(false);

  const isMobile = useMediaQuery("(max-width:600px)");
  const inputRef = useRef();

  useEffect(() => {
    fetch("https://wordle-backend-3r6l.onrender.com/start")
      .then((res) => res.json())
      .then(() => setGameStarted(true));
  }, []);

  useEffect(() => {
    const handleKeyDown = async (event) => {
      const key = event.key;
      if (gameOver) return;

      if (/^[a-zA-Z]$/.test(key) && currentCol < 5) {
        const newGrid = [...grid];
        newGrid[currentRow][currentCol] = key.toUpperCase();
        setGrid(newGrid);
        setCurrentCol(currentCol + 1);
      } else if (key === "Backspace") {
        if (currentCol > 0) {
          const newGrid = [...grid];
          newGrid[currentRow][currentCol - 1] = "";
          setGrid(newGrid);
          setCurrentCol(currentCol - 1);
        }
      } else if (key === "Enter" && currentCol === 5) {
        const guess = grid[currentRow].join("").toLowerCase();

        try {
          const helper = await fetch(
            "https://wordle-backend-3r6l.onrender.com/valid",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ currentGuess: guess }),
            }
          );
          const data_two = await helper.json();

          if (data_two.result === "true") {
            const res = await fetch(
              "https://wordle-backend-3r6l.onrender.com/guess",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentGuess: guess }),
              }
            );
            const data = await res.json();

            const newCellColors = cellColors.map((row) => [...row]);
            for (var i = 0; i < 5; i++) {
              if (data.result[i] == "Y") {
                newCellColors[currentRow][i] = "green";
              } else if (data.result[i] == "R") {
                newCellColors[currentRow][i] = "yellow";
              } else {
                newCellColors[currentRow][i] = "red";
              }
            }
            setCellColors(newCellColors);

            setCurrentRow(currentRow + 1);
            setCurrentCol(0);
          } else {
            setInvalidWordDialog(true);
          }
        } catch (error) {
          console.error("Error sending guess:", error);
        }

        try {
          const res = await fetch(
            "https://wordle-backend-3r6l.onrender.com/game-over"
          );
          const data = await res.json();
          setGameOver(data.gameOver);
          setWon(data.won);
          setWord(data.wordCurrent);
          if (data.gameOver) setShowDialog(true);
        } catch (error) {
          console.error("Error ending game");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentRow, currentCol, grid, cellColors, gameOver]);

  useEffect(() => {
    if (isMobile && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMobile, currentRow, currentCol]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (!gameOver && value.length > 0) {
      const key = value[value.length - 1];
      if (/^[a-zA-Z]$/.test(key) && currentCol < 5) {
        const newGrid = [...grid];
        newGrid[currentRow][currentCol] = key.toUpperCase();
        setGrid(newGrid);
        setCurrentCol(currentCol + 1);
      }
    }
    e.target.value = "";
  };

  let lastClick = 0;

  return (
    <Box
      key={gameKey}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: 2,
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        background: "linear-gradient(90deg, #1a1a2e 0%, #0f3460 100%)",
        zIndex: 1,
      }}
    >
      <Button
        type="button"
        variant="contained"
        color="primary"
        sx={{ backgroundColor: "red" }}
        onClick={() => {
          setGameOver(false);
          setCurrentRow(0);
          setCurrentCol(0);
          setGrid(
            Array(6)
              .fill()
              .map(() => Array(5).fill(""))
          );
          setCellColors(
            Array(6)
              .fill()
              .map(() => Array(5).fill("white"))
          );
          setShowDialog(false);
          setWon(false);
          setWord("");
          setGameStarted(false);
          setGameKey((k) => k + 1);
          fetch("https://wordle-backend-3r6l.onrender.com/start")
            .then((res) => res.json())
            .then(() => setGameStarted(true));
        }}
      >
        Restart Game
      </Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          marginTop: 4,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {grid.map((row, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{ display: "flex", gap: 1, justifyContent: "center" }}
          >
            {row.map((letter, colIndex) => (
              <Box
                key={colIndex}
                sx={{
                  width: 60,
                  height: 60,
                  border: "2px solid #d3d6da",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 32,
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  backgroundColor: cellColors[rowIndex][colIndex],
                  borderColor:
                    rowIndex === currentRow &&
                    colIndex === currentCol &&
                    !gameOver
                      ? "#000"
                      : "#d3d6da",
                  borderWidth:
                    rowIndex === currentRow && colIndex === currentCol
                      ? "3px"
                      : "2px",
                }}
              >
                {letter}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      {isMobile && (
        <TextField
          inputRef={inputRef}
          sx={{ opacity: 0, position: "absolute", pointerEvents: "none" }}
          onChange={handleInputChange}
          autoFocus
        />
      )}
      <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
        <DialogTitle>{won ? "Congratulations!" : "Game Over"}</DialogTitle>
        <DialogContent>
          <Typography>
            {won
              ? "You guessed the word correctly!"
              : `The word was: ${word.toUpperCase()}`}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={invalidWordDialog}
        onClose={() => setInvalidWordDialog(false)}
      >
        <DialogTitle>Word Not Found</DialogTitle>
        <DialogContent>
          <Typography>
            The word you entered does not exist. Please try another word.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInvalidWordDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
