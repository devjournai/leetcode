/**
 * Jump Game Vii
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var canReach = function (s, minJump, maxJump) {
  const stringLength = s.length;
  const canAccessIndex = new Array(stringLength).fill(false);
  canAccessIndex[0] = true;

  const cumulativeReachedCount = new Array(stringLength + 1).fill(0);
  cumulativeReachedCount[1] = 1;

  for (
    let currentPosition = 1;
    currentPosition < stringLength;
    ++currentPosition
  ) {
    cumulativeReachedCount[currentPosition + 1] =
      cumulativeReachedCount[currentPosition];

    if (s[currentPosition] === "1") {
      continue;
    }

    const jumpSourceMin = Math.max(0, currentPosition - maxJump);
    const jumpSourceMax = currentPosition - minJump;

    if (jumpSourceMax < 0) {
      continue;
    }

    const windowReachSum =
      cumulativeReachedCount[jumpSourceMax + 1] -
      cumulativeReachedCount[jumpSourceMin];

    if (windowReachSum > 0) {
      canAccessIndex[currentPosition] = true;
      cumulativeReachedCount[currentPosition + 1] =
        cumulativeReachedCount[currentPosition] + 1;
    }
  }

  return canAccessIndex[stringLength - 1];
};
