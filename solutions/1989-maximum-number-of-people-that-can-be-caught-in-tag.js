/**
 * Maximum Number Of People That Can Be Caught In Tag
 * Intuition: To maximize catches, each 'it' person should catch the nearest available 'not it' person to their right. This greedy strategy works because an 'it' person catching a 'not it' person further to their left would prevent an earlier 'it' person from catching them, and catching a 'not it' person further to their right might prevent a later 'it' person from catching them. By catching the earliest valid 'not it' person, we preserve the most options for subsequent 'it' people. This naturally leads to a two-pointer approach after separating 'it' and 'not it' indices.
 * Approach: 1. Initialize two lists, `itLocations` and `notItLocations`, to store the indices of people who are "it" (1) and "not it" (0) respectively. Iterate through the input `teamMembers` array to populate these lists. 2. Initialize `maximumPeopleCaught` to 0, and two pointers: `notItPersonPointer` for `notItLocations` and `itPersonIterator` for `itLocations`, both starting at 0. 3. Iterate through `itLocations` using `itPersonIterator`. For each `currentItPosition` (the index of an 'it' person): 4. Advance `notItPersonPointer` past any 'not it' people whose indices are less than `currentItPosition - maximumDistance`, as these are too far to the left to be caught by the current 'it' person (and would have already been considered by earlier 'it' people). 5. If `notItPersonPointer` is still within bounds of `notItLocations` and the `currentNotItLocation` (index of the 'not it' person) is within `currentItPosition + maximumDistance`, a catch can be made. Increment `maximumPeopleCaught` and advance `notItPersonPointer` to mark this 'not it' person as caught/unavailable for subsequent 'it' people. 6. After iterating through all 'it' people, return `maximumPeopleCaught`.
 * Dry Run: teamMembers = [0,1,0,1,0], maximumDistance = 1
 * 1. itLocations = [1, 3], notItLocations = [0, 2, 4]
 * 2. maximumPeopleCaught = 0, notItPersonPointer = 0, itPersonIterator = 0
 * 3. Current `itPersonIterator` points to `itLocations[0] = 1`. `currentItPosition = 1`.
 * 4. Inner `while` loop for `notItPersonPointer`:
 *    - `notItLocations[0]` (0) is not less than `currentItPosition` (1) - `maximumDistance` (1) = 0. Loop does not run.
 * 5. `if` condition for catch:
 *    - `notItPersonPointer` (0) < `notItLocations.length` (3) is true.
 *    - `notItLocations[0]` (0) <= `currentItPosition` (1) + `maximumDistance` (1) = 2 is true.
 *    - `maximumPeopleCaught` becomes 1.
 *    - `notItPersonPointer` becomes 1.
 * 6. Increment `itPersonIterator` to 1.
 * 7. Current `itPersonIterator` points to `itLocations[1] = 3`. `currentItPosition = 3`.
 * 8. Inner `while` loop for `notItPersonPointer`:
 *    - `notItPersonPointer` (1) < `notItLocations.length` (3) is true.
 *    - `notItLocations[1]` (2) is not less than `currentItPosition` (3) - `maximumDistance` (1) = 2. Loop does not run.
 * 9. `if` condition for catch:
 *    - `notItPersonPointer` (1) < `notItLocations.length` (3) is true.
 *    - `notItLocations[1]` (2) <= `currentItPosition` (3) + `maximumDistance` (1) = 4 is true.
 *    - `maximumPeopleCaught` becomes 2.
 *    - `notItPersonPointer` becomes 2.
 * 10. Increment `itPersonIterator` to 2.
 * 11. `itPersonIterator` (2) is not less than `itLocations.length` (2). Outer loop terminates.
 * 12. Return `maximumPeopleCaught` (2).
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var catchMaximumAmountofPeople = function (teamMembers, maximumDistance) {
  const itLocations = [];
  const notItLocations = [];

  let currentScanningIndex = 0;
  while (currentScanningIndex < teamMembers.length) {
    if (teamMembers[currentScanningIndex] === 1) {
      itLocations.push(currentScanningIndex);
    } else {
      notItLocations.push(currentScanningIndex);
    }
    currentScanningIndex++;
  }

  let maximumPeopleCaught = 0;
  let notItPersonPointer = 0;
  let itPersonIterator = 0;

  while (itPersonIterator < itLocations.length) {
    const currentItPosition = itLocations[itPersonIterator];

    while (
      notItPersonPointer < notItLocations.length &&
      notItLocations[notItPersonPointer] < currentItPosition - maximumDistance
    ) {
      notItPersonPointer++;
    }

    if (
      notItPersonPointer < notItLocations.length &&
      notItLocations[notItPersonPointer] <= currentItPosition + maximumDistance
    ) {
      maximumPeopleCaught++;
      notItPersonPointer++;
    }
    itPersonIterator++;
  }

  return maximumPeopleCaught;
};
