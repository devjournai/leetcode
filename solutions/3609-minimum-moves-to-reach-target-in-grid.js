/**
 * Minimum Moves to Reach Target in Grid
 * Intuition: From (x,y) you add m=max(x,y) to one coordinate, so reverse search from the target: the larger coordinate came from either half (when it was strictly more than twice the other) or from subtracting the smaller.
 * Approach: 1. Recurse from (tx,ty) toward (sx,sy). 2. If x==y, the previous cell must have a 0 on one axis (unless already at start). 3. Ensure x>=y by swapping. 4. If x>2y, x must be even and previous is (x/2,y); else previous is (x-y,y). Return -1 on overflow past the start.
 * Dry Run: (1,2)→(5,4). Reverse (5,4): 5<8 so 5-4=1 → (1,4); 4=4*1 and 4 even? 4>2 so half → (1,2). Two moves.
 * Time Complexity: O(log tx + log ty)
 * Space Complexity: O(log tx + log ty)
 */
var minMoves = function (sx, sy, tx, ty) {
  const INF = 1e18;
  const memo = new Map();

  const dfs = (x, y, startX, startY) => {
    const key = `${x},${y},${startX},${startY}`;
    if (memo.has(key)) {
      return memo.get(key);
    }
    if (x === startX && y === startY) {
      return 0;
    }
    if (x < startX || y < startY) {
      return INF;
    }

    let result;
    if (x === y) {
      result = INF;
      if (startX === 0) {
        result = Math.min(result, dfs(0, y, startX, startY) + 1);
      }
      if (startY === 0) {
        result = Math.min(result, dfs(x, 0, startX, startY) + 1);
      }
    } else if (x < y) {
      result = dfs(y, x, startY, startX);
    } else if (x > y * 2) {
      result =
        x % 2 === 1 ? INF : dfs(Math.floor(x / 2), y, startX, startY) + 1;
    } else {
      result = dfs(x - y, y, startX, startY) + 1;
    }

    memo.set(key, result);
    return result;
  };

  const answer = dfs(tx, ty, sx, sy);
  return answer >= INF ? -1 : answer;
};
