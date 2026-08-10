/**
 * High Access Employees
 * Intuition: To find high-access employees, we need to group all access times by employee. For each employee, we convert their access times into a comparable format (e.g., minutes from midnight) and sort them. Then, we check for any three consecutive access times that fall within a 60-minute interval.
 * Approach: 1. Initialize a Map to store access times for each employee, converting "HHMM" strings to total minutes from midnight. 2. Iterate through the input `accessTimes` array, parsing each time string into minutes and adding it to the corresponding employee's list in the Map. 3. Initialize an empty array to store the names of high-access employees. 4. Iterate through each employee and their list of access times stored in the Map. 5. For each employee, sort their access times in ascending order. 6. If an employee has at least three access times, iterate through their sorted times with a sliding window of three. Check if the third access time in the window minus the first access time is strictly less than 60 minutes. 7. If the condition is met, add the employee's name to the high-access employees array and break the inner loop (as the employee is already identified as high-access). 8. Return the final list of high-access employee names.
 * Dry Run: accessTimes = [["john","0001"],["john","0010"],["john","0020"],["mary","0500"],["mary","0510"],["mary","0520"],["bob","0100"],["bob","0200"],["bob","0300"]]
 * 1. `employeeTimeRecord` initialized as new Map(). `highAccessNames` initialized as [].
 * 2. Populate `employeeTimeRecord`:
 *    - "john": [1, 10, 20] (0001, 0010, 0020 in minutes)
 *    - "mary": [300, 310, 320] (0500, 0510, 0520 in minutes)
 *    - "bob": [60, 120, 180] (0100, 0200, 0300 in minutes)
 * 3. Iterate through `employeeTimeRecord`:
 *    - **Employee "john"**: `currentAccesses = [1, 10, 20]`. Sorted (already). `accessCount = 3`.
 *      - `windowStart = 0`: `currentAccesses[0] = 1`, `currentAccesses[2] = 20`. `20 - 1 = 19`. `19 < 60` is true.
 *      - Add "john" to `highAccessNames`. `highAccessNames = ["john"]`. Break from inner loop.
 *    - **Employee "mary"**: `currentAccesses = [300, 310, 320]`. Sorted (already). `accessCount = 3`.
 *      - `windowStart = 0`: `currentAccesses[0] = 300`, `currentAccesses[2] = 320`. `320 - 300 = 20`. `20 < 60` is true.
 *      - Add "mary" to `highAccessNames`. `highAccessNames = ["john", "mary"]`. Break from inner loop.
 *    - **Employee "bob"**: `currentAccesses = [60, 120, 180]`. Sorted (already). `accessCount = 3`.
 *      - `windowStart = 0`: `currentAccesses[0] = 60`, `currentAccesses[2] = 180`. `180 - 60 = 120`. `120 < 60` is false.
 *      - Loop finishes, "bob" is not added.
 * 4. Return `highAccessNames = ["john", "mary"]`.
 * Time Complexity: O(N log K)
 * Space Complexity: O(N)
 */
var findHighAccessEmployees = function (accessTimes) {
  const employeeTimeRecord = new Map();

  for (const [employeeIdentifier, timeRepresentation] of accessTimes) {
    const parsedHour = parseInt(timeRepresentation.slice(0, 2));
    const parsedMinute = parseInt(timeRepresentation.slice(2));
    const totalMinuteValue = parsedHour * 60 + parsedMinute;

    if (!employeeTimeRecord.has(employeeIdentifier)) {
      employeeTimeRecord.set(employeeIdentifier, []);
    }
    employeeTimeRecord.get(employeeIdentifier).push(totalMinuteValue);
  }

  const highAccessNames = [];

  for (const [
    currentPersonKey,
    personAccessMinutes,
  ] of employeeTimeRecord.entries()) {
    personAccessMinutes.sort((valA, valB) => valA - valB);

    const accessCount = personAccessMinutes.length;
    if (accessCount < 3) {
      continue;
    }

    for (let windowStart = 0; windowStart <= accessCount - 3; windowStart++) {
      const firstTimeInWindow = personAccessMinutes[windowStart];
      const thirdTimeInWindow = personAccessMinutes[windowStart + 2];
      const durationSpan = thirdTimeInWindow - firstTimeInWindow;

      if (durationSpan < 60) {
        highAccessNames.push(currentPersonKey);
        break;
      }
    }
  }

  return highAccessNames;
};
