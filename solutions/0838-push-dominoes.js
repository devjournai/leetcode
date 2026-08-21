/**
 * Push Dominoes
 * Intuition: Assign decaying right-force from each 'R' (N, N-1, …) and left-force from each 'L'. Net sign decides R, L, or '.' (balanced).
 * Approach: 1. Forward: on 'R' set force=N, on 'L' 0, else decay. Add to `resultingForces`. 2. Backward: on 'L' set N, on 'R' 0, else decay; subtract. 3. Map >0→R, <0→L, 0→'.'. Join.
 * Dry Run: "R.L". Forward forces [N, N-1, 0]. Backward subtract [0, N-1, N] → net [N, 0, -N] → "R.L".
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
