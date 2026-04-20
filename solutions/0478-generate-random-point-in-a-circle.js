/**
 * Generate Random Point In A Circle
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
