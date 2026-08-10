/**
 * Count Tested Devices After Test Operations
 * Intuition: Instead of decrementing subsequent device battery percentages explicitly (which would be an O(N^2) operation), we can observe that each successfully tested device contributes a cumulative reduction of 1 to all devices that come after it. We can keep track of this total reduction as we iterate.
 * Approach: 1. Initialize a counter, `devicesSuccessfullyTested`, to zero. This counter will store the total number of devices tested and also represents the cumulative battery reduction applied to subsequent devices. 2. Iterate through the `batteryPercentages` array from the first device to the last using an index, `currentDeviceIndex`. 3. For each device, calculate its effective battery percentage by subtracting `devicesSuccessfullyTested` from its original `batteryPercentages[currentDeviceIndex]`. 4. If this effective battery percentage is greater than zero, it means the current device is tested. In this case, increment `devicesSuccessfullyTested`. 5. After iterating through all devices, `devicesSuccessfullyTested` will hold the final count of devices that were tested.
 * Dry Run: batteryPercentages = [1, 1, 2, 1]
 * 1. Initialize `devicesSuccessfullyTested = 0`.
 * 2. `currentDeviceIndex = 0`:
 *    - `batteryPercentages[0]` is `1`.
 *    - Effective battery: `1 - devicesSuccessfullyTested = 1 - 0 = 1`.
 *    - `1 > 0`, so device at `currentDeviceIndex = 0` is tested.
 *    - Increment `devicesSuccessfullyTested` to `1`.
 * 3. `currentDeviceIndex = 1`:
 *    - `batteryPercentages[1]` is `1`.
 *    - Effective battery: `1 - devicesSuccessfullyTested = 1 - 1 = 0`.
 *    - `0 <= 0`, so device at `currentDeviceIndex = 1` is NOT tested.
 *    - `devicesSuccessfullyTested` remains `1`.
 * 4. `currentDeviceIndex = 2`:
 *    - `batteryPercentages[2]` is `2`.
 *    - Effective battery: `2 - devicesSuccessfullyTested = 2 - 1 = 1`.
 *    - `1 > 0`, so device at `currentDeviceIndex = 2` is tested.
 *    - Increment `devicesSuccessfullyTested` to `2`.
 * 5. `currentDeviceIndex = 3`:
 *    - `batteryPercentages[3]` is `1`.
 *    - Effective battery: `1 - devicesSuccessfullyTested = 1 - 2 = -1`.
 *    - `-1 <= 0`, so device at `currentDeviceIndex = 3` is NOT tested.
 *    - `devicesSuccessfullyTested` remains `2`.
 * Loop ends. Return `devicesSuccessfullyTested = 2`.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var countTestedDevices = function (batteryPercentages) {
  let devicesSuccessfullyTested = 0;

  for (
    let currentDeviceIndex = 0;
    currentDeviceIndex < batteryPercentages.length;
    currentDeviceIndex++
  ) {
    let currentEffectiveBattery =
      batteryPercentages[currentDeviceIndex] - devicesSuccessfullyTested;
    if (currentEffectiveBattery > 0) {
      devicesSuccessfullyTested++;
    }
  }

  return devicesSuccessfullyTested;
};
