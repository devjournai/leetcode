/**
* Count Positions On Street With Required Brightness
* Intuition: The problem asks us to count positions where the accumulated brightness meets a minimum requirement. A brute-force approach would calculate brightness for each position by iterating through all lights, leading to O(N*L) time complexity. We can optimize this by observing that the effect of a street lamp is a continuous range. This suggests a sweep-line or difference array approach. Instead of calculating total brightness for each point, we can track changes in brightness across the street.
* Approach: 1. Initialize a `brightnessChanges` array of size `n` with all zeros. This array will store the net change in brightness at each street position. 2. Iterate through each street lamp `[position, range]` in the `lampLocations` array. Calculate the `illuminationStart` and `illuminationEnd` positions for each lamp, ensuring they stay within the street bounds `[0, n-1]`. 3. For each lamp, increment the value at `brightnessChanges[illuminationStart]` to signify that brightness increases at this point. If `illuminationEnd + 1` is within the street bounds, decrement `brightnessChanges[illuminationEnd + 1]` to signify that brightness decreases after this point. 4. Initialize `accumulatedBrightness` to 0 and `satisfiedPositionsCount` to 0. 5. Iterate from `streetIndex = 0` to `n - 1`. In each iteration, update `accumulatedBrightness` by adding `brightnessChanges[streetIndex]`. This cumulative sum gives the actual brightness at the current `streetIndex`. 6. Compare `accumulatedBrightness` with `minimumBrightnessNeeded[streetIndex]`. If `accumulatedBrightness` is greater than or equal to the required brightness, increment `satisfiedPositionsCount`. 7. After iterating through all street positions, return `satisfiedPositionsCount`.
* Dry Run: n = 5, lampLocations = [[0, 1], [2, 1]], minimumBrightnessNeeded = [0, 1, 1, 1, 0]
  1. Initialize `brightnessChanges = [0, 0, 0, 0, 0]`. `satisfiedPositionsCount = 0`, `accumulatedBrightness = 0`.
  2. Process `lampLocations`:
    - Lamp [0, 1]: `lampPosition = 0`, `lampRange = 1`.
      `illuminationStart = max(0, 0 - 1) = 0`.
      `illuminationEnd = min(4, 0 + 1) = 1`.
      `brightnessChanges[0]++` -> `brightnessChanges = [1, 0, 0, 0, 0]`.
      `illuminationEnd + 1 = 2 < 5`, so `brightnessChanges[2]--` -> `brightnessChanges = [1, 0, -1, 0, 0]`.
    - Lamp [2, 1]: `lampPosition = 2`, `lampRange = 1`.
      `illuminationStart = max(0, 2 - 1) = 1`.
      `illuminationEnd = min(4, 2 + 1) = 3`.
      `brightnessChanges[1]++` -> `brightnessChanges = [1, 1, -1, 0, 0]`.
      `illuminationEnd + 1 = 4 < 5`, so `brightnessChanges[4]--` -> `brightnessChanges = [1, 1, -1, 0, -1]`.
  3. Final `brightnessChanges` array after processing all lamps: `[1, 1, -1, 0, -1]`.
  4. Iterate `streetIndex` from 0 to 4:
    - `streetIndex = 0`: `accumulatedBrightness += brightnessChanges[0]` (`0 + 1 = 1`). `1 >= minimumBrightnessNeeded[0]` (`1 >= 0`) is true. `satisfiedPositionsCount = 1`.
    - `streetIndex = 1`: `accumulatedBrightness += brightnessChanges[1]` (`1 + 1 = 2`). `2 >= minimumBrightnessNeeded[1]` (`2 >= 1`) is true. `satisfiedPositionsCount = 2`.
    - `streetIndex = 2`: `accumulatedBrightness += brightnessChanges[2]` (`2 + (-1) = 1`). `1 >= minimumBrightnessNeeded[2]` (`1 >= 1`) is true. `satisfiedPositionsCount = 3`.
    - `streetIndex = 3`: `accumulatedBrightness += brightnessChanges[3]` (`1 + 0 = 1`). `1 >= minimumBrightnessNeeded[3]` (`1 >= 1`) is true. `satisfiedPositionsCount = 4`.
    - `streetIndex = 4`: `accumulatedBrightness += brightnessChanges[4]` (`1 + (-1) = 0`). `0 >= minimumBrightnessNeeded[4]` (`0 >= 0`) is true. `satisfiedPositionsCount = 5`.
  5. Return `satisfiedPositionsCount = 5`.
* Time Complexity: O(L + N)
* Space Complexity: O(N)
*/
var meetRequirement = function (n, lights, requirement) {
  const brightnessChanges = new Array(n).fill(0);

  for (const lampDetails of lights) {
    const lampPosition = lampDetails[0];
    const lampRange = lampDetails[1];

    const illuminationStart = Math.max(0, lampPosition - lampRange);
    const illuminationEnd = Math.min(n - 1, lampPosition + lampRange);

    brightnessChanges[illuminationStart]++;
    if (illuminationEnd + 1 < n) {
      brightnessChanges[illuminationEnd + 1]--;
    }
  }

  let accumulatedBrightness = 0;
  let satisfiedPositionsCount = 0;

  for (let streetIndex = 0; streetIndex < n; streetIndex++) {
    accumulatedBrightness += brightnessChanges[streetIndex];
    if (accumulatedBrightness >= requirement[streetIndex]) {
      satisfiedPositionsCount++;
    }
  }

  return satisfiedPositionsCount;
};
