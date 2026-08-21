/**
 * Minimum Domino Rotations For Equal Row
 * Intuition: If a uniform row exists, its value must be tops[0] or bottoms[0]. Count rotations to make that value appear on top vs bottom.
 * Approach: 1. For a target, scan each tile: if neither face is the target, fail. 2. Count how many tops (and bottoms) need a flip. 3. Return min of those two. 4. Try tops[0] and, if different, bottoms[0]; take the feasible min.
 * Dry Run: tops = [2,1,2,4,2,2], bottoms = [5,2,6,2,3,2].
 *   - Target 2: some tops already 2, rest have 2 on bottom; min rotations is 2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minDominoRotations = function (tops, bottoms) {
  const totalDominoes = tops.length;

  function computeRotationsForTarget(targetValue) {
    let rotationsToMatchTops = 0;
    let rotationsToMatchBottoms = 0;

    for (let loopIndex = 0; loopIndex < totalDominoes; loopIndex++) {
      const currentTop = tops[loopIndex];
      const currentBottom = bottoms[loopIndex];

      if (currentTop !== targetValue && currentBottom !== targetValue) {
        return -1;
      }

      if (currentTop !== targetValue) {
        rotationsToMatchTops++;
      }

      if (currentBottom !== targetValue) {
        rotationsToMatchBottoms++;
      }
    }

    return Math.min(rotationsToMatchTops, rotationsToMatchBottoms);
  }

  const firstCandidate = tops[0];
  const outcomeFirstCandidate = computeRotationsForTarget(firstCandidate);

  const secondCandidate = bottoms[0];
  let outcomeSecondCandidate = -1;

  if (firstCandidate !== secondCandidate) {
    outcomeSecondCandidate = computeRotationsForTarget(secondCandidate);
  }

  if (outcomeFirstCandidate === -1 && outcomeSecondCandidate === -1) {
    return -1;
  } else if (outcomeFirstCandidate === -1) {
    return outcomeSecondCandidate;
  } else if (outcomeSecondCandidate === -1) {
    return outcomeFirstCandidate;
  } else {
    return Math.min(outcomeFirstCandidate, outcomeSecondCandidate);
  }
};
