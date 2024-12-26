const createGrid = (size) => {
  const grid = Array(size).fill(size).map(size => Array(size).fill(0));
  return grid;
}

const newRandomGenerator = function () {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return () => {
    const index = Math.ceil(Math.random() * numbers.length - 1);
    return numbers.splice(index, 1)[0];
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

const solvedSudoku = (unsolvedSudoku, currentPosition) => {
  const getRandom = newRandomGenerator();
  const newRandomNumber = getRandom();
  if (isPossible(unsolvedSudoku, currentPosition, newRandomNumber)) {
    // implementation of this condition is left, everything before than is working properly.
  }
}

const generateSudoku = () => {
  const grid = createGrid(9);
  const solvedSudoku = solveSudoku(grid);
}