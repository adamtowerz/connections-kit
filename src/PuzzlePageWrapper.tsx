import PuzzlePage from "./PuzzlePage";
import { decode } from "./PuzzleEncoder";
import { useParams } from "react-router-dom";

export default function PuzzlePageWrapper() {
  const { puzzle } = useParams();

  if (!puzzle) {
    return <div>No puzzle was included</div>;
  }

  try {
    const puzzleObj = decode(puzzle);

    return <PuzzlePage puzzle={puzzleObj} />;
  } catch (e) {
    console.error(e);
    return <div className="text-red">Puzzle is invalid</div>;
  }
}
