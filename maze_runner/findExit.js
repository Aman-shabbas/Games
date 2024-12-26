import { createMaze } from "./createMaze.js";

const STARTING_LEVEL = 4;
const head = "🟨";
const exit = "🟩";
const path = "⬜️";
const block = "🟫";

function replace(string, index, char) {
  let replacedString = "";

  for (let i = 0; i < string.length; i++) {
    const CurChar = i === index ? char : string[i];
    replacedString += CurChar;
  }

  return replacedString;
}

function wait(time) {
  time = time * 1000000000; // do this in fo loop
  while (time > 0) {
    time--;
  }
}

function isLeftOpen(maze, index) {
  const isBlock = maze[index - 1] === "b";
  const isOutOfGrid = (index - 1) < 0 || maze[index - 1] === "\n";

  return !isBlock && !isOutOfGrid;
}

function isRightOpen(maze, size, index) {
  const lastIndex = size * size + size - 2;
  const isBlock = maze[index + 1] === "b";
  const isOutOfGrid = (index + 1) > lastIndex || maze[index + 1] === "\n";

  return !isBlock && !isOutOfGrid;
}

function isUpOpen(maze, size, index) {
  const isBlock = maze[index - (size + 1)] === "b";
  const isOutOfGrid = (index - (size + 1)) < 0;

  return !isBlock && !isOutOfGrid;
}

function isDownOpen(maze, size, index) {
  const lastIndex = size * size + size - 2;
  const isBlock = maze[index + (size + 1)] === "b";
  const isOutOfGrid = index + (size + 1) > lastIndex;

  return !isBlock && !isOutOfGrid;
}

function getInput() {
  console.log("\nChoose your action:");
  console.log("Move UP: \"W\"");
  console.log("Move LEFT: \"A\"");
  console.log("Move RIGHT: \"D\"");
  console.log("Move DOWN: \"S\"\n");

  return prompt("Enter the charecter(in small letter)....: ");
}

function tryMoveUP(maze, size, curIndex) {
  if (!isUpOpen(maze, size, curIndex)) {
    console.log("\n\nMoving Up is Not Possible");
    wait(1);
    return continueGame(maze, size, curIndex);
  }

  const nextIndex = curIndex - (size + 1);
  maze = replace(maze, curIndex, "y");
  maze = replace(maze, nextIndex, "y");
  return continueGame(maze, size, nextIndex);
}

function tryMoveRight(maze, size, curIndex) {
  if (!isRightOpen(maze, size, curIndex)) {
    console.log("\n\nMoving Right is Not Possible");
    wait(1);
    return continueGame(maze, size, curIndex);
  }

  const nextIndex = curIndex + 1;
  maze = replace(maze, curIndex, "y");
  maze = replace(maze, nextIndex, 'y');
  return continueGame(maze, size, nextIndex);
}

function tryMoveLeft(maze, size, curIndex) {
  if (!isLeftOpen(maze, curIndex)) {
    console.log("\n\nMoving Left is Not Possible");
    wait(1);
    return continueGame(maze, size, curIndex);
  }

  const nextIndex = curIndex - 1;
  maze = replace(maze, curIndex, "y");
  maze = replace(maze, nextIndex, "y");
  return continueGame(maze, size, nextIndex);
}

function tryMoveDown(maze, size, curIndex) {
  if (!isDownOpen(maze, size, curIndex)) {
    console.log("\n\nMoving Down is Not Possible");
    wait(1);
    return continueGame(maze, size, curIndex);
  }

  const nextIndex = curIndex + (size + 1);
  maze = replace(maze, curIndex, "y");
  maze = replace(maze, nextIndex, "y");
  return continueGame(maze, size, nextIndex);
}

function convertToMaze(fakeMaze) {
  let convertedString = "";

  for (let i = 0; i < fakeMaze.length; i++) {
    switch (fakeMaze[i]) {
      case "y": convertedString += head;
        break;
      case "w": convertedString += path;
        break;
      case "b": convertedString += block;
        break;
      case "g": convertedString += exit;
        break;
      default: convertedString += "\n";
    }
  }

  return convertedString;
}

function showMaze(string) {
  const actualMaze = convertToMaze(string);
  console.log(actualMaze);
}

function continueGame(maze, size, curIndex) {
  console.clear();
  const exitPoint = size * size + (size - 2);
  if (curIndex === exitPoint) {
    return "\n\n**********  Level " + size + " Passed  **********";
  }

  showMaze(maze);
  const userInput = getInput();
  switch (userInput) {
    case "w": return tryMoveUP(maze, size, curIndex);
    case "d": return tryMoveRight(maze, size, curIndex);
    case "a": return tryMoveLeft(maze, size, curIndex);
    case "s": return tryMoveDown(maze, size, curIndex);
    default: console.log("\n\nInvalid Input");
      wait(1);
      return continueGame(maze, size, curIndex);
  }
}

function start() {
  let size = STARTING_LEVEL;
  while (true) {
    console.log(continueGame(createMaze(size), size, 0)); // make this constant
    wait(1);
    size += 1;
  }
}

start();