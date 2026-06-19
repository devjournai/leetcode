/**
 * Find the Highest Altitude
 * Intuition: The highest altitude is determined by continuously summing the gains and keeping track of the maximum sum encountered, starting from an initial altitude of zero.
 * Approach: 1. Initialize two variables: one for the current altitude, starting at zero, and another for the maximum altitude found so far, also starting at zero. 2. Iterate through the `gain` array. 3. For each gain value, add it to the current altitude. 4. After updating the current altitude, compare it with the maximum altitude found so far and update the maximum if the current altitude is higher. 5. After iterating through all gain values, the stored maximum altitude will be the highest point reached.
 * Dry Run: gain = [-5, 1, 5, 0, -7]
 *   currentAltitude = 0
 *   maximumAltitudeFound = 0
 *
 *   Loop 1 (gainElementIndex = 0, gain[0] = -5):
 *     currentAltitude = 0 + (-5) = -5
 *     maximumAltitudeFound = Math.max(0, -5) = 0
 *
 *   Loop 2 (gainElementIndex = 1, gain[1] = 1):
 *     currentAltitude = -5 + 1 = -4
 *     maximumAltitudeFound = Math.max(0, -4) = 0
 *
 *   Loop 3 (gainElementIndex = 2, gain[2] = 5):
 *     currentAltitude = -4 + 5 = 1
 *     maximumAltitudeFound = Math.max(0, 1) = 1
 *
 *   Loop 4 (gainElementIndex = 3, gain[3] = 0):
 *     currentAltitude = 1 + 0 = 1
 *     maximumAltitudeFound = Math.max(1, 1) = 1
 *
 *   Loop 5 (gainElementIndex = 4, gain[4] = -7):
 *     currentAltitude = 1 + (-7) = -6
 *     maximumAltitudeFound = Math.max(1, -6) = 1
 *
 *   End Loop. Return maximumAltitudeFound = 1.
 * Time Complexity: O(n), where n is the length of the `gain` array, as we iterate through the array once.
 * Space Complexity: O(1), as we only use a few constant-space variables.
 */
var largestAltitude = function (gain) {
  let currentAltitudeValue = 0;
  let maximumAltitudeReached = 0;
  let gainArrayLength = gain.length;

  for (
    let gainElementIndex = 0;
    gainElementIndex < gainArrayLength;
    gainElementIndex++
  ) {
    currentAltitudeValue += gain[gainElementIndex];
    if (currentAltitudeValue > maximumAltitudeReached) {
      maximumAltitudeReached = currentAltitudeValue;
    }
  }

  return maximumAltitudeReached;
};
