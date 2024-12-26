let grid = "";
let alreadyCheckedIndex = "";

function getNextDirection(curDir, turnDir) {
  return (curDir + turnDir) % 4;
}

function getNextPos(curPos, nextDirection, size) {

  switch (nextDirection) {
    case 0: return curPos - (size + 1);
    case 1: return curPos + 1;
    case 2: return curPos + (size + 1);
    case 3: return curPos - 1;
  }
}

function isLeftOpen(maze, index, curDirection, size) {
  const nextDir = getNextDirection(curDirection, 3);
  return maze[getNextPos(index, nextDir, size)] === "w";
}

function isFrontOpen(maze, index, curDirection, size) {
  const nextDir = getNextDirection(curDirection, 0);
  return maze[getNextPos(index, nextDir, size)] === "w";
}

function isRightOpen(maze, index, curDirection, size) {
  const nextDir = getNextDirection(curDirection, 1);
  return maze[getNextPos(index, nextDir, size)] === "w";
}

function tryGoLeft(maze, currentPosition, currentDirection, size) {
  let nextPaths = "";

  if (isLeftOpen(maze, currentPosition, currentDirection, size)) {
    const nextDir = getNextDirection(currentDirection, 3);
    const nextPos = getNextPos(currentPosition, nextDir, size);
    nextPaths = solveMaze(maze, nextPos, nextDir, size);
  }

  return nextPaths;
}

function tryGoFront(maze, currentPosition, currentDirection, size) {
  let nextPaths = "";

  if (isFrontOpen(maze, currentPosition, currentDirection, size)) {
    const nextDir = getNextDirection(currentDirection, 0);
    const nextPos = getNextPos(currentPosition, nextDir, size);
    nextPaths = solveMaze(maze, nextPos, nextDir, size);
  }

  return nextPaths;
}

function tryGoRight(maze, currentPosition, currentDirection, size) {
  let nextPaths = "";

  if (isRightOpen(maze, currentPosition, currentDirection, size)) {
    const nextDir = getNextDirection(currentDirection, 1);
    const nextPos = getNextPos(currentPosition, nextDir, size);
    nextPaths = solveMaze(maze, nextPos, nextDir, size);
  }

  return nextPaths;
}

function getNextPath(maze, currentPosition, currentDirection, size) {
  const pathToFront = tryGoFront(maze, currentPosition, currentDirection, size);

  if (pathToFront !== "") {
    return pathToFront;
  }

  let pathToLeft = tryGoLeft(maze, currentPosition, currentDirection, size);

  if (pathToLeft !== "") {
    return pathToLeft;
  }

  const pathToRight = tryGoRight(maze, currentPosition, currentDirection, size);

  return pathToRight;
}

function solveMaze(maze, currentPosition, currentDirection, size) {
  const exitIndex = (size * size) + (size - 2);
  if (currentPosition === exitIndex) {
    return "" + currentPosition;
  }

  if (alreadyCheckedIndex.includes("" + currentPosition)) {
    return "";
  }

  alreadyCheckedIndex += "," + currentPosition;

  const nextPaths = getNextPath(maze, currentPosition, currentDirection, size);

  return nextPaths === "" ? "" : currentPosition + "," + nextPaths;
}

function startSolving(maze, size) {
  const solution = solveMaze(maze, 0, 1, size);
  alreadyCheckedIndex = "";
  return solution;
}

function replace(string, index, char) {
  let replacedString = "";
  for (let i = 0; i < string.length; i++) {
    const CurChar = i === index ? char : string[i];
    replacedString += CurChar;
  }

  return replacedString;
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

function isInAP(firstTerm, differance, noOfTerm, index) {
  if (index === firstTerm) {
    return true;
  }

  if (noOfTerm === 0) {
    return false;
  }

  return isInAP(firstTerm + differance, differance, noOfTerm - 1, index);
}

function createGrid(size) {
  const lastIndexOfMaze = size * size + size - 2;
  let grid = "";

  for (let index = 0; index <= lastIndexOfMaze; index++) {
    if (isInAP(size, size + 1, size - 1, index)) {
      grid += "\n";
      continue;
    }

    grid += "w";
  }
  return grid;
}

function addBlock(noOfBlocks, size) {
  if (noOfBlocks === 0) {
    return grid;
  }

  const mazeLength = (size * size) + (size - 2);
  const random = randomInRange(1, mazeLength - 1);
  const tempGrid = replace(grid, random, "b");
  const solvedPath = startSolving(tempGrid, size);

  if (grid[random] === "w" && solvedPath !== "") {
    grid = tempGrid;
      
    return addBlock(noOfBlocks - 1, size);
  }

  return addBlock(noOfBlocks, size);
}

function createMaze(size) {
  const numebrOfWhiteBlock = Math.floor((size * size * 55) / 100);
  const minNoOfBlocks = size * size - numebrOfWhiteBlock;

  grid = createGrid(size);

  let gridWithBlock = addBlock(minNoOfBlocks, size);
  const exitIndex = size * size + size - 2;
  gridWithBlock = replace(gridWithBlock, exitIndex, "g");
  gridWithBlock = replace(gridWithBlock, 0, "y");

  return gridWithBlock;
}

export { createMaze };

// console.log(createMaze(7));