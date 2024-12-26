let alreadyCheckedIndex = "";

function slice(string, index, length) {
  let segment = "";
  const endingIndex = length + index;

  for (index; index < endingIndex; index++) {
    segment += string[index];
  }
  
  return segment;
}

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

function getNextPath (maze, currentPosition, currentDirection, size) {
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

console.log(solveMaze())