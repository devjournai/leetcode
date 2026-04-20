/**
 * Find The Highest Altitude
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var largestAltitude = function (gain) {
  let currentElevation = 0;
  let highestPoint = 0;
  const numberOfGains = gain.length;

  for (let gainIndex = 0; gainIndex < numberOfGains; gainIndex++) {
    currentElevation += gain[gainIndex];
    if (currentElevation > highestPoint) {
      highestPoint = currentElevation;
    }
  }

  return highestPoint;
};
