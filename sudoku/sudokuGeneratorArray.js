const createGrid = (size) => {
  return Array(size).fill(Array(size).fill(0));
};

const findIndexOfNoNZeroNumbers = (array, mapWith) => {
  const indices = array.reduce((indices, el, index) => {
    if (el !== 0) {
      indices.push(index);
    }

    return indices;
  }, []);

  return indices.map((el) => [mapWith, el]);
};

const getIndexWithNonZeroValue = (grid) => {
  return grid.reduce((indices, row, index) => {
    return [...indices, ...findIndexOfNoNZeroNumbers(row, index)];
  }, []);
};

// do later
const newRandom = function () {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return () => {
    const index = Math.ceil(Math.random() * numbers.length - 1);
    return numbers.splice(index, 1)[0] || -1;
  };
};

const isInRow = (grid, { rowIndex }, number) => {
  const row = grid[rowIndex].map((cell) => cell);
  return row.includes(number);
};

const isInColumn = (grid, { columnIndex }, number) => {
  const column = grid.map((row) => row[columnIndex]);
  return column.includes(number);
};

const findBox = (index) => {
  return 3 * Math.floor(index / 3);
};

const isInBox = (grid, { rowIndex, columnIndex }, number) => {
  const rowStrtPos = findBox(rowIndex);
  const colStrtPos = findBox(columnIndex);

  const rows = grid.slice(rowStrtPos, rowStrtPos + 3);
  const box = rows.flatMap((row) => row.slice(colStrtPos, colStrtPos + 3));

  return box.includes(number);
};

const isPossible = (unsolvedSudoku, currentPosition, number) => {
  if (number === -1) {
    return true;
  }

  return [isInRow, isInColumn, isInBox].every(
    (fn) => !fn(unsolvedSudoku, currentPosition, number)
  );
};

const getNextPosition = (
  { rowIndex: curRow, columnIndex: curCol },
  parentSet
) => {
  const nextCol = (curCol + 1) % 9;
  const nextRow = curRow + Math.floor((curCol + 1) / 9);
  const newPos = { rowIndex: nextRow, columnIndex: nextCol };

  if (!subSetOf(parentSet, newPos)) {
    return newPos;
  }
  // console.log("unchangable index")

  return getNextPosition(newPos, parentSet);
};

const getCopy = (grid) => grid.map((row) => [...row]);

const subSetOf = (arrayOfIndices, curpos) => {
  return arrayOfIndices.some(([rowIndex, columnIndex]) => {
    return curpos.rowIndex === rowIndex && curpos.columnIndex === columnIndex;
  });
};

const getPossibleNumber = (grid, curPos, getRandom) => {
  let newRandomNumber = getRandom();

  while (!isPossible(grid, curPos, newRandomNumber)) {
    newRandomNumber = getRandom();
  }

  return newRandomNumber;
};

const _solveSudoku = (grid, curPos, getRandom, unchangableIndexes) => {
  // console.log("current position: ", curPos.rowIndex, curPos.columnIndex);
  if (curPos.rowIndex === 9) {
    return grid;
  }

  if (subSetOf(unchangableIndexes, curPos)) {
    return _solveSudoku(
      getCopy(grid),
      getNextPosition(curPos, unchangableIndexes),
      newRandom(),
      unchangableIndexes
    );
  }

  const possibleNumber = getPossibleNumber(grid, curPos, getRandom);
  if (possibleNumber === -1) {
    // console.log("no possible number");
    return [[0]];
  }
  // console.log("number: ", possibleNumber);

  grid[curPos.rowIndex][curPos.columnIndex] = possibleNumber;
  // console.log(grid.join("\n"));

  const solvedSudoku = _solveSudoku(
    getCopy(grid),
    getNextPosition(curPos, unchangableIndexes),
    newRandom(),
    unchangableIndexes
  );

  if (solvedSudoku[0][0] === 0) {
    return _solveSudoku(grid, curPos, getRandom, unchangableIndexes);
  }

  return solvedSudoku;
};

const solveSudoku = (grid) => {
  const currentPosition = { rowIndex: 0, columnIndex: 0 };
  const unchangableIndexes = getIndexWithNonZeroValue(grid);
  // console.log("parent set", unchangableIndexes); // this might be the problem

  return _solveSudoku(grid, currentPosition, newRandom(), unchangableIndexes);
};

const generateSudoku = () => {
  const grid = createGrid(9);
  // const grid = [
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 0, 3, 0, 8, 5],
  //   [0, 0, 1, 0, 2, 0, 0, 0, 0],
  //   [0, 0, 0, 5, 0, 7, 0, 0, 0],
  //   [0, 0, 4, 0, 0, 0, 1, 0, 0],
  //   [0, 9, 0, 0, 0, 0, 0, 0, 0],
  //   [5, 0, 0, 0, 0, 0, 0, 7, 3],
  //   [0, 0, 2, 0, 1, 0, 0, 0, 0],
  //   [0, 0, 0, 0, 4, 0, 0, 0, 9],
  // ];

  // const grid = [
  //   [5, 3, 0, 0, 7, 0, 0, 0, 0],
  //   [6, 0, 0, 1, 9, 5, 0, 0, 0],
  //   [0, 9, 8, 0, 0, 0, 0, 6, 0],
  //   [8, 0, 0, 0, 6, 0, 0, 0, 3],
  //   [4, 0, 0, 8, 0, 3, 0, 0, 1],
  //   [7, 0, 0, 0, 2, 0, 0, 0, 6],
  //   [0, 6, 0, 0, 0, 0, 2, 8, 0],
  //   [0, 0, 0, 4, 1, 9, 0, 0, 5],
  //   [0, 0, 0, 0, 8, 0, 0, 7, 9],
  // ];

  return solveSudoku(grid);
};

console.log(generateSudoku().join("\n"));
