/**
 * Count The Number Of Houses At A Certain Distance II
 * Intuition: After adding street (x, y) the graph is a path with a single cycle. Pairwise distances can be counted in O(n) by splitting houses into the left stub, the ring, and the right stub, then adding contributions for pairs inside each piece and between pieces.
 * Approach: 1. Swap x and y so x <= y, then compute ringLen, leftLineLen, and rightLineLen. 2. Add pair counts for both houses on the ring, both on the same stub, one on a stub and one on the ring, and one on each stub. 3. Double every frequency because the answer counts ordered pairs.
 * Dry Run: n = 3, x = 1, y = 3
 *   1. ringLen = 3, both stubs empty.
 *   2. bothInRing contributes 3 pairs of distance 1.
 *   3. Doubling for ordered pairs yields [6, 0, 0].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var countOfPairs = function (n, x, y) {
  let first = x;
  let second = y;
  if (first > second) {
    const temp = first;
    first = second;
    second = temp;
  }

  const addVectors = (left, right) => {
    for (let idx = 0; idx < left.length; idx++) {
      left[idx] += right[idx];
    }
    return left;
  };

  const bothInRing = (ringLen) => {
    const res = new Array(n).fill(0);
    for (
      let distance = 1;
      distance <= Math.floor((ringLen - 1) / 2);
      distance++
    ) {
      res[distance - 1] += ringLen;
    }
    if (ringLen % 2 === 0) {
      res[ringLen / 2 - 1] += ringLen / 2;
    }
    return res;
  };

  const bothInTheSameLine = (lineLen) => {
    const res = new Array(n).fill(0);
    for (let distance = 1; distance <= lineLen; distance++) {
      res[distance - 1] += lineLen - distance;
    }
    return res;
  };

  const lineToRing = (lineLen, ringLen) => {
    const res = new Array(n).fill(0);
    for (let distance = 1; distance <= lineLen + ringLen; distance++) {
      const maxInRingLen = Math.min(distance - 1, Math.floor(ringLen / 2));
      const minInRingLen = Math.max(0, distance - lineLen);
      if (minInRingLen <= maxInRingLen) {
        res[distance - 1] += (maxInRingLen - minInRingLen + 1) * 2;
        if (minInRingLen === 0) res[distance - 1] -= 1;
        if (maxInRingLen * 2 === ringLen) res[distance - 1] -= 1;
      }
    }
    return res;
  };

  const lineToLine = (leftLineLen, rightLineLen) => {
    const res = new Array(n).fill(0);
    const extraThroughRing = first < second ? 1 : 0;
    for (
      let distance = 1;
      distance <= leftLineLen + rightLineLen + 2;
      distance++
    ) {
      const maxInLeft = Math.min(leftLineLen, distance - 1 - extraThroughRing);
      const minInLeft = Math.max(1, distance - rightLineLen - extraThroughRing);
      if (minInLeft <= maxInLeft) {
        res[distance - 1] += maxInLeft - minInLeft + 1;
      }
    }
    return res;
  };

  const ringLen = second - first + 1;
  const leftLineLen = first - 1;
  const rightLineLen = n - second;

  let answers = new Array(n).fill(0);
  answers = addVectors(answers, bothInRing(ringLen));
  answers = addVectors(answers, bothInTheSameLine(leftLineLen));
  answers = addVectors(answers, bothInTheSameLine(rightLineLen));
  answers = addVectors(answers, lineToRing(leftLineLen, ringLen));
  answers = addVectors(answers, lineToRing(rightLineLen, ringLen));
  answers = addVectors(answers, lineToLine(leftLineLen, rightLineLen));
  for (let idx = 0; idx < answers.length; idx++) {
    answers[idx] *= 2;
  }
  return answers;
};
