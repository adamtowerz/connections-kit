import { useState } from "react";
import classNames from "classnames";
import {
  ConnectionsPuzzleState,
  guessableWords,
  getFailedGuessesRemaining,
  getCanGuess,
  getGroupSolvedByGuess,
  ConnectionsPuzzleGroup,
  getIsGameWon,
  getIsGameLost,
} from "./Connections";
import { shuffle } from "./utils";

export default function PuzzlePlayer({
  state,
  updateState,
}: {
  state: ConnectionsPuzzleState;
  updateState: (s: ConnectionsPuzzleState) => void;
}) {
  const words = guessableWords(state);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);
  const failedGuessesRemaining = getFailedGuessesRemaining(state);
  const isWon = getIsGameWon(state);
  const isLost = getIsGameLost(state);

  const shuffledWords = shuffle(words);

  function toggleWord(w: string) {
    if (currentGuess.includes(w)) {
      setCurrentGuess(currentGuess.filter((word) => word !== w));
    } else {
      setCurrentGuess([...currentGuess, w]);
    }
  }

  const canGuess = getCanGuess(state, currentGuess);

  function submitGuess() {
    updateState({
      ...state,
      guesses: [...state.guesses, { words: currentGuess }],
    });

    setCurrentGuess([]);
  }

  const solvedGroups = state.guesses
    .map((g) => getGroupSolvedByGuess(state.puzzle, g))
    .filter((g) => !!g) as ConnectionsPuzzleGroup[];

  let footer = (
    <div className="flex gap-2 justify-between items-center">
      <p className="border rounded-lg px-2 py-1">
        Guesses remaining: {failedGuessesRemaining}
      </p>
      <button
        type="submit"
        onClick={submitGuess}
        disabled={!canGuess}
        className={classNames("border rounded-lg bg-green-300 px-2 py-1", {
          "text-gray-300 bg-gray-50": !canGuess,
        })}
      >
        Submit guess
      </button>
    </div>
  );

  if (isWon) {
    footer = <p>🥳 Congrats! 🥳</p>;
  } else if (isLost) {
    footer = <p>L</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="border p-2 rounded text-lg font-serif text-center">
        {state.puzzle.title}
      </h1>
      {solvedGroups.map((group) => (
        <div
          key={group.words.join(", ")}
          className="flex flex-col gap-2 p-2 border rounded"
          style={{ background: group.color }}
        >
          <p>
            <strong>{group.name}</strong>: {group.words.join(", ")}
          </p>
        </div>
      ))}

      <div className="grid grid-cols-4 gap-2">
        {shuffledWords.map((w) => (
          <button
            key={w}
            type="button"
            className={classNames("font-serif border p-2, rounded", {
              "bg-gray-800 text-white": currentGuess.includes(w),
            })}
            onClick={() => toggleWord(w)}
          >
            {w}
          </button>
        ))}
      </div>

      {footer}
    </div>
  );
}
