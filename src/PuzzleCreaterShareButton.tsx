import { useState } from "react";
import { ConnectionsPuzzle } from "./Connections";
import { encode } from "./PuzzleEncoder";
import classNames from "classnames";

export default function PuzzleCreaterShareButton({
  puzzle,
  className,
}: {
  puzzle: ConnectionsPuzzle;
  className?: string;
}) {
  const [showCopyText, setCopyText] = useState(false);

  function sharePuzzle() {
    const puzzleContent = encode(puzzle);
    const origin = window.location.origin;

    const link = `${origin}/puzzle/${puzzleContent}`;

    navigator.clipboard.writeText(link);
    setCopyText(true);

    // TODO: this is sus but w/e
    setTimeout(() => {
      setCopyText(false);
    }, 2500);
  }

  return (
    <button
      type="button"
      className={classNames(
        "p-2 border bg-green-300 rounded-lg w-100 max-w-96 flex-grow",
        className
      )}
      onClick={sharePuzzle}
    >
      {showCopyText ? "Copied to clipboard" : "Share Puzzle 📬"}
    </button>
  );
}
