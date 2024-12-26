// check if the index is editable or not.
// if editable get a random number and check for if thenumber is present in the row / column or Box.
// if not present in anywhere replace the random number n that position and go to next position.
//  if not possible number can be placed in a loation
// go back to previous cell and change the number there to a different one. and continue.

const string = "531670924624195837890342163819560753452833691793721496307258286281419390458986179";
// const string = "530070000600195000098000060800060003400803001700020006060000280000419005000080079";
// const string = "100000000000000000000000000000000000000000000000000000000000000000000000000000009";
// const string = "173496852954128673862753194285964731719532468436871925328619547591347000000000009";

function wait(time) {
  for (let time = time * 1000000000; time > 0; time-- ){
    time--;
  }
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

function replace(string, index, char) {
  let replacedString = "";
  for (let i = 0; i < string.length; i++) {
    const CurChar = i === index ? char : string[i];
    replacedString += CurChar;
  }

  return replacedString;
}

function slice(string, index, length) {
  let segment = "";
  const endingIndex = length + index;

  for (index; index < endingIndex; index++) {
    segment += string[index];
  }

  return segment;
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
  return Math.ceil(Math.random() * 9);
}

function newRandomNumber(rngStart, rngEnd, alreadyTriedNumbers) {
  let random = randomInRange(rngStart, rngEnd);

  while (isSubstring(alreadyTriedNumbers, "" + random)) {
    random = randomInRange(rngStart, rngEnd);
  }

  return random;
}

function getUserEnteredIndexes(userInputs) {
  let userEnterdIndex = ",";
  for (let index = 0; index < userInputs.length; index++) {
    if (userInputs[index] !== "0") {
      userEnterdIndex += index + ",";
    }
  }

  return userEnterdIndex;
}

function isValidNumber (unsolvedSudoku, currentIndex, number) {
  const notInRow = !isInRow(unsolvedSudoku, currentIndex, number);
  const notInColumn = !isInColumn(unsolvedSudoku, currentIndex, number);
  const notInBox = !isInBox(unsolvedSudoku, currentIndex, number);

  return notInRow && notInColumn && notInBox;
}

function fillBlanks(unsolvedSudoku, currentIndex, alreadyTriedNumbers) {
  if (currentIndex === string.length) {
    return "\n";
  }
  
  let random = newRandomNumber(1, 9, alreadyTriedNumbers);
  alreadyTriedNumbers += random;
  let isAValidNumber = isValidNumber(unsolvedSudoku, currentIndex, random);
  
  while (!isAValidNumber && alreadyTriedNumbers.length < 9) {
    random = newRandomNumber(1, 9, alreadyTriedNumbers);
    alreadyTriedNumbers += random;
    isAValidNumber = isValidNumber(unsolvedSudoku, currentIndex, random);
  }
  let temporarySudoku = replace(unsolvedSudoku, currentIndex, "" + random); 
  let currentCellValue = random;
  if (isSubstring(userEnterdIndex, "," + currentIndex + ",")) {
    temporarySudoku = unsolvedSudoku;
    currentCellValue = unsolvedSudoku[currentIndex];
  }
  if (alreadyTriedNumbers.length > 9) {
    return "";
  }
  const nextCellValue = fillBlanks(temporarySudoku, currentIndex + 1, "");
  if (nextCellValue === "") {
    return fillBlanks(unsolvedSudoku, currentIndex, alreadyTriedNumbers);
  }
  return currentCellValue + nextCellValue;
  
}

const userEnterdIndex = getUserEnteredIndexes(string);
console.log(fillBlanks(string, 0, ""));