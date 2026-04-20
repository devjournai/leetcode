/**
 * Reaching Points
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
