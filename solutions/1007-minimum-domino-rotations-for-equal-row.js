/**
 * Minimum Domino Rotations For Equal Row
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
