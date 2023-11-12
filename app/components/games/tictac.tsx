"use client";
import { useState } from "react";
import styles from "./tictac.module.css";

interface SquareProps {
  onSquareClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  value: string;
  mvp: boolean;
}

class buttonTable {
  v: string;
  mvp: boolean = false;
  constructor(public val: string) {
    this.v = val;
  }
}

function Square({ onSquareClick, value, mvp }: SquareProps) {
  return (
    <div className="py-1 px-1 text-lg min-h-[5vh] min-w-[5vh]">
      <button
        className={`text-lg ${
          mvp ? "bg-green-400" : "bg-transparent  hover:bg-neutral-700"
        } py-1 text-neutral-50-700 font-semibold hover:text-white border border-neutral-500 min-h-[4vh] min-w-[4vh]`}
        onClick={onSquareClick}
      >
        {value}
      </button>
    </div>
  );
}

function Reset({ onPress }: any) {
  return (
    <div className={styles.gameContent}>
      <button
        className="bg-transparent border border-neutral-500 hover:bg-neutral-700 rounded-md text-center min-w-[5vh] min-h-[4vh]"
        onClick={() => onPress()}
      >
        {" "}
        Reset
      </button>
    </div>
  );
}

function Dimension({ onDimChange }: any) {
  return (
    <div className="">
      <label>
        Dimension:{" "}
        <input
          className="bg-transparent border border-neutral-500 hover:bg-neutral-700 rounded-md text-center"
          type="number"
          name="dimension"
          defaultValue={3}
          onChange={(e) => onDimChange(e.target.value)}
        />
      </label>
    </div>
  );
}

function VictoryTresh({ onThreshChange }: any) {
  return (
    <div className="">
      <label>
        Victory Threshold:{" "}
        <input
          className="bg-transparent border border-neutral-500 hover:bg-neutral-700 rounded-md text-center"
          type="number"
          name="VicThresh"
          defaultValue={3}
          onChange={(e) => onThreshChange(e.target.value)}
        />
      </label>
    </div>
  );
}

export default function Board() {
  const [dim, setDim] = useState(3);
  const [thresh, setThresh] = useState(3);
  const [squares, setSquares] = useState(
    Array.from({ length: dim }, () =>
      Array.from({ length: dim }, () => new buttonTable(""))
    )
  );
  const [turn, setTurn] = useState(true);
  const [victor, setVictor] = useState(new buttonTable(""));

  function handleClick(iy: number, ix: number) {
    if (victor.val) {
      return;
    }
    const newSqrs = structuredClone(squares);
    if (newSqrs[iy][ix]) {
      //return;
    }
    var piece = new buttonTable("");
    if (turn) {
      piece.val = "X";
    } else {
      piece.val = "O";
    }
    newSqrs[iy][ix] = piece;
    setSquares(newSqrs);
    evaluate(iy, ix, piece, thresh);
    setTurn(!turn);
  }

  function handleDim(dimVal: number) {
    setDim(dimVal);
    setSquares(
      Array.from({ length: dimVal }, () =>
        Array.from({ length: dimVal }, () => new buttonTable(""))
      )
    );
    console.log("dimSet " + dimVal);
  }

  function handleThresh(threshVal: number) {
    setThresh(threshVal);
    console.log("threshSet " + threshVal);
  }

  function clear() {
    setSquares(
      Array.from({ length: dim }, () =>
        Array.from({ length: dim }, () => new buttonTable(""))
      )
    );
    setVictor(new buttonTable(""));
  }

  function evaluate(
    iy: number,
    ix: number,
    piece: buttonTable,
    threshold: number
  ) {
    //horizontal
    var mvps = [];
    var count = 0;
    for (let i = -threshold + 1; i < threshold; i++) {
      if (iy + i < 0 || iy + i > dim - 1) {
        continue;
      }
      var subj = piece;
      if (i != 0) {
        subj = squares[iy + i][ix];
      }
      if (subj.val === piece.val) {
        count++;
        mvps.push(subj);
        if (count >= threshold) {
          console.log(piece + " wins!");
          setVictor(piece as any);

          //deal with the fact that these won't have hit SetState yet
          squares[iy][ix].val = subj.val;
          squares[iy][ix].mvp = true;
          mvps.forEach((element) => {
            element.val = subj.val;
            element.mvp = true;
          });
          setSquares(squares);
          return;
        }
      } else {
        count = 0;
      }
    }

    //vertical
    count = 0;
    mvps = [];
    for (let i = -threshold + 1; i < threshold; i++) {
      if (ix + i < 0 || ix + i > dim - 1) {
        continue;
      }
      var subj = piece;
      if (i != 0) {
        subj = squares[iy][ix + i];
      }
      if (subj.val === piece.val) {
        count++;
        mvps.push(subj);
        if (count >= threshold) {
          console.log(piece + " wins!");
          setVictor(piece as any);
          //deal with the fact that these won't have hit SetState yet
          squares[iy][ix].val = subj.val;
          squares[iy][ix].mvp = true;
          mvps.forEach((element) => {
            element.val = subj.val;
            element.mvp = true;
          });
          setSquares(squares);
          return;
        }
      } else {
        count = 0;
      }
    }
    console.log(count);

    //Diag 1
    count = 0;
    mvps = [];
    for (let i = -threshold + 1; i < threshold; i++) {
      if (ix + i < 0 || ix + i > dim - 1) {
        continue;
      }
      if (iy + i < 0 || iy + i > dim - 1) {
        continue;
      }
      var subj = piece;
      if (i != 0) {
        subj = squares[iy + i][ix + i];
      }
      if (subj.val === piece.val) {
        count++;
        mvps.push(subj);
        if (count >= threshold) {
          console.log(piece + " wins!");
          setVictor(piece as any);
          //deal with the fact that these won't have hit SetState yet
          squares[iy][ix].val = subj.val;
          squares[iy][ix].mvp = true;
          mvps.forEach((element) => {
            element.val = subj.val;
            element.mvp = true;
          });
          setSquares(squares);
          return;
        }
      } else {
        count = 0;
      }
    }

    //Diag 2
    count = 0;
    mvps = [];
    for (let i = -threshold + 1; i < threshold; i++) {
      if (ix + i < 0 || ix + i > dim - 1) {
        continue;
      }
      if (iy - i < 0 || iy - i > dim - 1) {
        continue;
      }
      var subj = piece;
      if (i != 0) {
        subj = squares[iy - i][ix + i];
      }
      if (subj.val === piece.val) {
        count++;
        mvps.push(subj);
        if (count >= threshold) {
          console.log(piece + " wins!");
          setVictor(piece as any);
          //deal with the fact that these won't have hit SetState yet
          squares[iy][ix].val = subj.val;
          squares[iy][ix].mvp = true;
          mvps.forEach((element) => {
            element.val = subj.val;
            element.mvp = true;
          });
          setSquares(squares);
          return;
        }
      } else {
        count = 0;
      }
    }
  }

  let status;
  if (!victor.val) {
    status = "Turn: " + (turn ? "X" : "O");
  } else {
    status = "Victor: " + victor.val;
  }

  return (
    <>
      <div className={styles.formContent}>
        <Dimension onDimChange={(v: any) => handleDim(v)} />
        <VictoryTresh onThreshChange={(v: any) => handleThresh(v)} />
      </div>
      <div className={styles.gameContent}>
        <div className={styles.row}>
          {squares.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <div key={cellIndex}>
                  <Square
                    mvp={cell.mvp}
                    value={cell.val}
                    onSquareClick={() => handleClick(rowIndex, cellIndex)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.gameContent}>{status}</div>
      <div className={styles.formContent}>
        <Reset onPress={() => clear()} />
      </div>
    </>
  );
}
