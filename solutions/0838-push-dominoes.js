/**
 * Push Dominoes
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var pushDominoes = function (dominoes) {
  const dominoesLength = dominoes.length;
  const resultingForces = new Array(dominoesLength).fill(0);

  let rightwardForce = 0;
  for (
    let iteratorIndexForward = 0;
    iteratorIndexForward < dominoesLength;
    iteratorIndexForward++
  ) {
    if (dominoes[iteratorIndexForward] === "R") {
      rightwardForce = dominoesLength;
    } else if (dominoes[iteratorIndexForward] === "L") {
      rightwardForce = 0;
    } else {
      rightwardForce = Math.max(rightwardForce - 1, 0);
    }
    resultingForces[iteratorIndexForward] += rightwardForce;
  }

  let leftwardForce = 0;
  for (
    let iteratorIndexBackward = dominoesLength - 1;
    iteratorIndexBackward >= 0;
    iteratorIndexBackward--
  ) {
    if (dominoes[iteratorIndexBackward] === "L") {
      leftwardForce = dominoesLength;
    } else if (dominoes[iteratorIndexBackward] === "R") {
      leftwardForce = 0;
    } else {
      leftwardForce = Math.max(leftwardForce - 1, 0);
    }
    resultingForces[iteratorIndexBackward] -= leftwardForce;
  }

  const finalDominoesState = resultingForces.map((currentForceValue) => {
    if (currentForceValue > 0) return "R";
    if (currentForceValue < 0) return "L";
    return ".";
  });

  return finalDominoesState.join("");
};
