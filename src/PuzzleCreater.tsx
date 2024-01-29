import { useState } from "react";
import { ConnectionsPuzzle } from "./Connections";
import classNames from "classnames";
import PuzzleCreaterShareButton from "./PuzzleCreaterShareButton";

export default function PuzzleCreater({ className }: { className?: string }) {
  const [puzzle, setPuzzle] = useState<ConnectionsPuzzle>({
    title: "My new great amazing puzzle",
    groups: [
      {
        name: "one through four",
        words: ["one", "two", "three", "four"],
        color: "#ff6666",
      },
      {
        name: "SpanISH",
        words: ["uno", "dos", "tres", "4 in spanish"],
        color: "#66ff66",
      },
      {
        name: "French",
        words: ["un", "deux", "trois", "quatre"],
        color: "#6666ff",
      },
      {
        name: "Binary",
        words: ["1", "10", "11", "100"],
        color: "#ffff66",
      },
    ],
    maxFailedGuesses: 4,
  });

  function updateTitle(nv: string) {
    const n = structuredClone(puzzle);
    n.title = nv;

    setPuzzle(n);
  }

  function updateGroupProperty(
    group: number,
    field: "name" | "color",
    nv: string
  ) {
    const n = structuredClone(puzzle);
    n.groups[group][field] = nv;

    setPuzzle(n);
  }

  function updateWord(group: number, word: number, nv: string) {
    const n = structuredClone(puzzle);
    n.groups[group].words[word] = nv;

    setPuzzle(n);
  }

  return (
    <div className={classNames("flex flex-col gap-4", className)}>
      <div className="flex gap-2 items-center">
        <label id="title-label">Title:</label>
        <input
          aria-labelledby="title-label"
          type="text"
          value={puzzle.title}
          className="border p-1 rounded flex-grow"
          onChange={(e) => updateTitle(e.target.value)}
        />
      </div>

      {puzzle.groups.map((group, idx) => (
        <div
          key={`group-${idx}`}
          className="border rounded p-2 flex flex-col gap-2"
          style={{ background: group.color }}
        >
          <h2 className="text-left font-bold">Group {idx + 1}</h2>
          <div className="flex gap-2 items-center">
            <label id={`group-${idx}-title-label`}>Name:</label>
            <input
              aria-labelledby={`group-${idx}-title-label`}
              type="text"
              value={group.name}
              className="border p-1 rounded flex-grow"
              onChange={(e) => updateGroupProperty(idx, "name", e.target.value)}
            />
          </div>

          <div className="flex gap-2 items-center">
            <label id={`group-${idx}-color-label`}>Color:</label>
            <input
              aria-labelledby={`group-${idx}-color-label`}
              type="color"
              value={group.color}
              className="border p-1 rounded"
              onChange={(e) =>
                updateGroupProperty(idx, "color", e.target.value)
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            {group.words.map((w, wIdx) => (
              <div
                key={`group-${idx}-word-${wIdx}`}
                className="flex items-center gap-2"
              >
                <label id={`group-${idx}-word-${wIdx}-label`}>
                  {wIdx + 1}:{" "}
                </label>
                <input
                  aria-labelledby={`group-${idx}-word-${wIdx}-label`}
                  type="text"
                  value={w}
                  className="border p-1 rounded flex-grow"
                  onChange={(e) => updateWord(idx, wIdx, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}

      <PuzzleCreaterShareButton puzzle={puzzle} className="mx-auto" />
    </div>
  );
}
