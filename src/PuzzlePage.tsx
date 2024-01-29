import { useEffect, useState } from "react";
import PuzzlePlayer from "./PuzzlePlayer";
import { ConnectionsPuzzle, ConnectionsPuzzleState } from "./Connections";

export default function PuzzlePage({ puzzle }: { puzzle: ConnectionsPuzzle }) {
  const [state, setState] = useState<ConnectionsPuzzleState>({
    puzzle,
    guesses: [],
  });

  useEffect(() => {
    // /if puzzle changes, reset state
    setState({ puzzle, guesses: [] });
  }, [puzzle]);

  return <PuzzlePlayer state={state} updateState={setState} />;
}
