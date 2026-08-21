/**
 * Count Nice Pairs In An Array
 * Intuition: nums[i]+rev(nums[j]) = nums[j]+rev(nums[i]) iff nums[i]-rev(nums[i]) equals nums[j]-rev(nums[j]). Count equal differences as you go.
 * Approach: 1. `obtainReversedValue` reverses decimal digits. 2. For each value compute difference and add the existing map count to `totalNicePairs` modulo 1e9+7. 3. Increment that difference's frequency. 4. Return the total.
 * Dry Run: nums = [42,11,1,97].
 *   - 42-24=18, 11-11=0, 1-1=0, 97-79=18. Two pairs (42,97) and (11,1). Return 2.
 * Time Complexity: O(n * log(maxNum))
 * Space Complexity: O(n)
 */
var countNicePairs = function (inputNumbers) {
  const moduloConstant = 1e9 + 7;
  let totalNicePairs = 0;
  const differenceFrequencies = new Map();

  const obtainReversedValue = (numericInput) => {
    const stringRepresentation = String(numericInput);
    const reversedString = stringRepresentation.split("").reverse().join("");
    const parsedReversed = Number(reversedString);
    return parsedReversed;
  };

  for (let indexValue = 0; indexValue < inputNumbers.length; indexValue++) {
    const currentElement = inputNumbers[indexValue];
    const valueReversed = obtainReversedValue(currentElement);
    const calculatedDifference = currentElement - valueReversed;

    const existingCount = differenceFrequencies.get(calculatedDifference) || 0;
    totalNicePairs = (totalNicePairs + existingCount) % moduloConstant;

    differenceFrequencies.set(calculatedDifference, existingCount + 1);
  }

  return totalNicePairs;
};
