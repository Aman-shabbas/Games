function getNextPath(maze, currentPosition) {
  if (maze[currentPosition] === "g") {
    return "" + currentPosition;
  }

  return currentPosition +  getNextPath(maze, currentPosition + 1);
}

function getSolution(maze) {
  const solution = getNextPath(maze, 0);
  return solution;
}

console.log(getSolution("g"), "\tExpectation: ", "0");
console.log(getSolution("wg"), "\tExpectation: ", "01");
console.log(getSolution("wwg"), "\tExpectation: ", "012");
console.log(getSolution("wwg"), "\tExpectation: ", "012");