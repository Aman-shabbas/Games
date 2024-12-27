const createGrid = (size) => {
  const grid = Array(size).fill(size).map(size => Array(size).fill(0));
  return grid;
}

const getIndexWithNonZeroValue = (grid) => {
  return grid.reduce((indexes, row, rowIndex) => row.reduce((indexes, cell, cellIndex) => {
    if (cell !== 0) {
      indexes.push([rowIndex, cellIndex]);
    }
    return indexes;
  }, indexes), []);
}

const newRandom = function () {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return () => {
    const index = Math.ceil(Math.random() * numbers.length - 1);
    return numbers.splice(index, 1)[0] || -1;
  }
}

const isInRow = (grid, position, number) => {
  const { rowIndex } = position;
  const row = grid[rowIndex].map(cell => cell);
  return row.includes(number);
}

const isInColumn = (grid, position, number) => {
  const { columnIndex } = position;
  const column = grid.map(row => row[columnIndex]);
  return column.includes(number);
}

const isInBox = (grid, position, number) => {
  const { rowIndex, columnIndex } = position;
  const rowStrtPos = 3 * Math.floor(rowIndex / 3);
  const colStrtPos = 3 * Math.floor(columnIndex / 3);
  const rows = grid.slice(rowStrtPos, rowStrtPos + 3);
  const box = rows.flatMap(row => row.slice(colStrtPos, colStrtPos + 3));
  return box.includes(number);
}

const isPossible = (unsolvedSudoku, currentPosition, number) => {
  const isRowPossible = !isInRow(unsolvedSudoku, currentPosition, number);
  const isColumnPossible = !isInColumn(unsolvedSudoku, currentPosition, number);
  const isBoxPossible = !isInBox(unsolvedSudoku, currentPosition);
  return isRowPossible && isColumnPossible && isBoxPossible;
}

const getNextPosition = (currentPosition) => {
  const { rowIndex: curRow, columnIndex: curCol } = currentPosition;
  const nextCol = (curCol + 1) % 9;
  const nextRow = curRow + Math.floor((curCol + 1) / 9);
  return { rowIndex: nextRow, columnIndex: nextCol };
}

const getCopy = (grid) => {
  return grid.map(row => row.map(cell => cell));
}

const subSetOf = (arrayOfObject, curpos) => {
  return arrayOfObject.some(({ rowIndex, columnIndex }) => {
    return curpos.rowIndex === rowIndex && curpos.columnIndex === columnIndex;
  })
}

const _solveSudoku = (grid, curPos, getRandom, unchangableIndexes) => {
  if (curPos.rowIndex === 9) {
    return grid;
  }
  if (subSetOf(unchangableIndexes, curPos)) {
    // implement bypasing to next line
  }
}

const solveSudoku = (grid) => {
  const currentPosition = { rowIndex: 0, columnIndex: 0, };
  const unchangableIndexes = getIndexWithNonZeroValue(grid);
  _solveSudoku(grid, currentPosition, newRandom(), unchangableIndexes);
}

const generateSudoku = () => {
  const grid = createGrid(9);

  const solvedSudoku = solveSudoku(grid);
  return solvedSudoku;
}

export const solvedSudoku = generateSudoku();