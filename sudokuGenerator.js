function replace(string, index, char) {
  let replacedString = "";
  for (let i = 0; i < string.length; i++) {
    const CurChar = i === index ? char : string[i];
    replacedString += CurChar;
  }

  return replacedString;
}

function isSubstring(string, substring) {
  if (substring.length === 0) {
    return false;
  }

  for (let index = 0; index < string.length; index++) {
    const stringSegment = slice(string, index, substring.length);
    if (stringSegment === substring) {
      return true;
    }
  }

  return false;
}

function isNumInRange(rngStart, rngEnd, num) {
  return rngStart <= num && num <= rngEnd;
}

function randomInRange(rngStart, rngEnd) {
  const random = Math.floor(Math.random() * 10000);
  if (isNumInRange(rngStart, rngEnd, random)) {
    return random;
  }
  return randomInRange(rngStart, rngEnd);
}

function newRandomNumber(rngStart, rngEnd, alreadyTriedNumbers) {
  let random = randomInRange(rngStart, rngEnd);

  while (isSubstring(alreadyTriedNumbers, "" + random)) {
    random = randomInRange(rngStart, rngEnd);
  }

  return random;
}

function slice(string, index, length) {
  let segment = "";
  const endingIndex = length + index;

  for (index; index < endingIndex; index++) {
    segment += string[index];
  }

  return segment;
}

function getColumnFromBord(sudokuString, index) {
  let columnString = "";
  let columnPos = index % 9;

  for (let element = 0; element < 9; element++) {
    columnString += sudokuString[columnPos];
    columnPos += 9;
  }

  return columnString;
}

function getRowFromBord(sudokuString, index) {
  const startingIndex = Math.floor(index / 9) * 9;
  return slice(sudokuString, startingIndex, 9);
}

function getBoxFromBord(sudokuString, index) {
  const columnSegment = Math.floor(index / 27) * 27;
  const rowSegment = (Math.floor(index / 3) % 3) * 3;
  const startingIndex = columnSegment + rowSegment;
  let boxString = "";

  for (let rowCount = 0; rowCount < 3; rowCount++) {
    for (let columnCount = 0; columnCount < 3; columnCount++) {
      boxString += sudokuString[startingIndex + (rowCount * 9) + columnCount];
    }
  }

  return boxString;
}

function isInRow(sudokuString, currentIndex, number) {
  const row = getRowFromBord(sudokuString, currentIndex);
  return isSubstring(row, "" + number);
}

function isInColumn(sudokuString, currentIndex, number) {
  const column = getColumnFromBord(sudokuString, currentIndex);
  return isSubstring(column, "" + number);
}

function isInBox(sudokuString, currentIndex, number) {
  const box = getBoxFromBord(sudokuString, currentIndex);
  return isSubstring(box, "" + number);
}

function getEmptyString() {
  let gridStrig = "";

  for (let numberOfElement = 0; numberOfElement < 81; numberOfElement++) {
    gridStrig += "0";
  }

  return gridStrig;
}

function fillEmpty(sudokuString, index, alreadyTriedNumbers) {
  if (alreadyTriedNumbers.length === 9) {
    return "";
  }

  const number = "" + newRandomNumber(1, 9, alreadyTriedNumbers);
  alreadyTriedNumbers += number;
  const notInRow = !isInRow(sudokuString, index, number);
  const notInColumn = !isInColumn(sudokuString, index, number);
  const notInBox = !isInBox(sudokuString, index, number);

  if (notInRow && notInColumn && notInBox) {
    if (index === 80) {
      return number;
    }
    const tempSudoku = replace(sudokuString, index, number);
    const nextCellValue = fillEmpty(tempSudoku, index + 1, "");
    if (nextCellValue === "") {
      return fillEmpty(sudokuString, index, alreadyTriedNumbers);;
    }
    return number + nextCellValue;
  }

  return fillEmpty(sudokuString, index, alreadyTriedNumbers);
}

function solveSudoku(sudokuString) {
  const solvedSudoku = fillEmpty(sudokuString, 0, "");
  return solvedSudoku;
}
