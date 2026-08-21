/**
 * Reaching Points
 * Intuition: Forward moves (x,y)→(x+y,y) or (x,y+x) explode the search space. Work backward from (tx,ty): replace the larger coordinate with `larger % smaller` until below the start, with a divisibility shortcut when one coordinate already matches.
 * Approach: 1. While `currentTargetX >= sx` and `currentTargetY >= sy`: equal pair → true; equal coords (and not start) → false. 2. If x>y: when y===sy, return `(x-sx)%y===0`; else `x %= y`. 3. Symmetric for y>x. 4. Loop exit → false.
 * Dry Run: sx=1, sy=1, tx=3, ty=5.
 *   - 5>3 → 5%3=2 → (3,2). 3>2 → 3%2=1 → (1,2). 2>1 and x===sx → (2-1)%1===0. Return true.
 * Time Complexity: O(log(tx + ty))
 * Space Complexity: O(1)
 */
var reachingPoints = function (sx, sy, tx, ty) {
  let currentTargetX = tx;
  let currentTargetY = ty;

  while (currentTargetX >= sx && currentTargetY >= sy) {
    if (currentTargetX === sx && currentTargetY === sy) {
      return true;
    } else if (currentTargetX === currentTargetY) {
      return false;
    } else if (currentTargetX > currentTargetY) {
      if (currentTargetY === sy) {
        return (currentTargetX - sx) % currentTargetY === 0;
      } else {
        currentTargetX %= currentTargetY;
      }
    } else {
      if (currentTargetX === sx) {
        return (currentTargetY - sy) % currentTargetX === 0;
      } else {
        currentTargetY %= currentTargetX;
      }
    }
  }
  return false;
};
