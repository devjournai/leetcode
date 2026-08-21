/**
 * Maximize the Minimum Game Score
 * Intuition: Binary search the minimum score x. Visiting point i enough times (ceil(x/points[i])) can reuse leftover visits from the previous point by walking back and forth.
 * Approach: 1. Search x in [0, ((m+1)/2)*points[0]]. 2. Greedily cover each point using leftover previous visits, otherwise 2*need-1 moves to bounce. 3. If leftover already covers it, take one step forward if a next point exists.
 * Dry Run: points = [2,4], m = 3. x=2 needs one visit each; path 0-1-0 uses 3 moves and min score is 2.
 * Time Complexity: O(N log (M * MAX_POINT))
 * Space Complexity: O(1)
 */

var maxScore = function (points, m) {
  const isPossible = (minVal) => {
    let moves = 0n;
    let prevMoves = 0n;
    const need = BigInt(minVal);
    const moveLimit = BigInt(m);
    for (let index = 0; index < points.length; index++) {
      const point = BigInt(points[index]);
      let required = (need + point - 1n) / point - prevMoves;
      if (required < 0n) {
        required = 0n;
      }
      if (required > 0n) {
        moves += 2n * required - 1n;
        prevMoves = required - 1n;
      } else if (index + 1 < points.length) {
        moves += 1n;
        prevMoves = 0n;
      }
      if (moves > moveLimit) {
        return false;
      }
    }
    return true;
  };

  let low = 0;
  let high = Math.floor((m + 1) / 2) * points[0] + 1;
  while (low < high) {
    const mid = Math.floor((low + high + 1) / 2);
    if (isPossible(mid)) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }
  return low;
};
