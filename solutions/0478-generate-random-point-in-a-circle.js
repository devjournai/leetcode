/**
 * Generate Random Point In A Circle
 * Intuition: Sample uniformly in the unit disk by rejection (random point in the square [-1,1]² kept only if x²+y² ≤ 1), then scale by the radius and translate to the stored center.
 * Approach: 1. Constructor stores radius and center. 2. `generateNormalizedPoint` draws `Math.random()*2-1` for x and y; recurse if outside the unit circle. 3. Return `[radius*x + cx, radius*y + cy]`.
 * Dry Run: radius = 1, center (0,0).
 *   - Trial (0.8, 0.8): 0.64+0.64=1.28 > 1 → retry.
 *   - Trial (0.3, 0.4): 0.09+0.16=0.25 ≤ 1 → return (0.3, 0.4).
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var Solution = function (radius, xCenter, yCenter) {
  this.storedRadius = radius;
  this.storedXCoordinate = xCenter;
  this.storedYCoordinate = yCenter;
};

Solution.prototype.randPoint = function () {
  const generateNormalizedPoint = () => {
    const trialX = Math.random() * 2 - 1;
    const trialY = Math.random() * 2 - 1;
    const squaredMagnitude = trialX * trialX + trialY * trialY;

    if (squaredMagnitude <= 1) {
      return [trialX, trialY];
    } else {
      return generateNormalizedPoint();
    }
  };

  const [normalizedPointX, normalizedPointY] = generateNormalizedPoint();

  const finalPointX =
    this.storedRadius * normalizedPointX + this.storedXCoordinate;
  const finalPointY =
    this.storedRadius * normalizedPointY + this.storedYCoordinate;

  return [finalPointX, finalPointY];
};
