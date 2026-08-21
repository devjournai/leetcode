/**
 * Summary Ranges
 * Intuition: A sorted unique array splits into maximal consecutive runs. Close a range whenever the next value is not current+1 (or we are at the last index).
 * Approach: 1. Empty input → []. 2. Remember the start index of the current run. 3. When the run breaks, emit "x" or "x->y" and move the start. 4. Return the list of strings.
 * Dry Run: nums = [0,1,2,4,5,7].
 *   - 0,1,2 consecutive; 2+1 ≠ 4 → "0->2".
 *   - 4,5 then break → "4->5". Last 7 → "7".
 *   - Return ["0->2","4->5","7"].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var summaryRanges = function (nums) {
  const collectedRanges = [];
  const totalElementsCount = nums.length;

  if (totalElementsCount === 0) {
    return collectedRanges;
  }

  let currentRangeStartIndex = 0;

  for (
    let currentIterationIndex = 0;
    currentIterationIndex < totalElementsCount;
    currentIterationIndex++
  ) {
    const valueAtCurrentIndex = nums[currentIterationIndex];
    const valueAfterCurrent = nums[currentIterationIndex + 1];
    const expectedNextConsecutive = valueAtCurrent + 1;

    const isLastElement = currentIterationIndex === totalElementsCount - 1;
    const isNotConsecutive = expectedNextConsecutive !== valueAfterCurrent;

    if (isLastElement || isNotConsecutive) {
      const rangeStartNumber = nums[currentRangeStartIndex];
      const rangeEndNumber = valueAtCurrent;
      let rangeOutputString;

      if (rangeStartNumber === rangeEndNumber) {
        rangeOutputString = `${rangeStartNumber}`;
      } else {
        rangeOutputString = `${rangeStartNumber}->${rangeEndNumber}`;
      }
      collectedRanges.push(rangeOutputString);

      currentRangeStartIndex = currentIterationIndex + 1;
    }
  }

  return collectedRanges;
};
