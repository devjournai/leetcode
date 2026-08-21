/**
 * Max Pair Sum In An Array
 * Intuition: The problem requires finding pairs of numbers with the same largest digit. A natural way to group numbers by their largest digit is using a hash map. To maximize the sum, for each group (i.e., for each largest digit), we only care about the two largest numbers within that group.
 * Approach: 1. Initialize `overallMaxSum` to -1 and `digitToLargestTwo` as a Map. This map will store at most the two largest numbers encountered for each unique largest digit.
 * 2. Define a helper function, `obtainMaxDigit`, to find the largest digit of any given number. This function iteratively extracts digits using modulo and division, keeping track of the maximum.
 * 3. Iterate through the input `nums` array. For each `currentInput` number:
 *    a. Calculate its `dominantDigit` using `obtainMaxDigit`.
 *    b. Retrieve or initialize an array of `candidateNumbers` from `digitToLargestTwo` for this `dominantDigit`.
 *    c. Add `currentInput` to `candidateNumbers`.
 *    d. Sort `candidateNumbers` in descending order.
 *    e. If `candidateNumbers` contains more than two elements, remove the smallest one (i.e., the last element after sorting) to ensure it only keeps the top two.
 * 4. After processing all numbers, iterate through the `values()` of `digitToLargestTwo`. For each `pairCandidates` array:
 *    a. If `pairCandidates` has exactly two numbers, calculate their sum `currentPairSum`.
 *    b. Update `overallMaxSum` by taking the maximum of `overallMaxSum` and `currentPairSum`.
 * 5. Return `overallMaxSum`.
 * Dry Run: nums = [51, 72, 83, 15, 67, 18]
 * overallMaxSum = -1
 * digitToLargestTwo = Map{}
 *
 * Iterate nums:
 * - currentInput = 51: dominantDigit = 5. digitToLargestTwo.set(5, [51]).
 * - currentInput = 72: dominantDigit = 7. digitToLargestTwo.set(7, [72]).
 * - currentInput = 83: dominantDigit = 8. digitToLargestTwo.set(8, [83]).
 * - currentInput = 15: dominantDigit = 5. Get [51]. Add 15 -> [51, 15]. Sort -> [51, 15]. No pop. digitToLargestTwo = {5: [51, 15], 7: [72], 8: [83]}.
 * - currentInput = 67: dominantDigit = 7. Get [72]. Add 67 -> [72, 67]. Sort -> [72, 67]. No pop. digitToLargestTwo = {5: [51, 15], 7: [72, 67], 8: [83]}.
 * - currentInput = 18: dominantDigit = 8. Get [83]. Add 18 -> [83, 18]. Sort -> [83, 18]. No pop. digitToLargestTwo = {5: [51, 15], 7: [72, 67], 8: [83, 18]}.
 *
 * Iterate digitToLargestTwo values:
 * - pairCandidates = [51, 15]: length is 2. currentPairSum = 66. overallMaxSum = max(-1, 66) = 66.
 * - pairCandidates = [72, 67]: length is 2. currentPairSum = 139. overallMaxSum = max(66, 139) = 139.
 * - pairCandidates = [83, 18]: length is 2. currentPairSum = 101. overallMaxSum = max(139, 101) = 139.
 *
 * Return 139.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxSum = function (nums) {
  let overallMaxSum = -1;
  const digitToLargestTwo = new Map();

  function obtainMaxDigit(numericValue) {
    let highestDigit = 0;
    let temporaryNum = numericValue;
    while (temporaryNum > 0) {
      let currentDigit = temporaryNum % 10;
      highestDigit = Math.max(highestDigit, currentDigit);
      temporaryNum = Math.floor(temporaryNum / 10);
    }
    return highestDigit;
  }

  const inputNumbers = nums;
  for (let idx = 0; idx < inputNumbers.length; idx++) {
    const currentInput = inputNumbers[idx];
    const dominantDigit = obtainMaxDigit(currentInput);

    if (!digitToLargestTwo.has(dominantDigit)) {
      digitToLargestTwo.set(dominantDigit, []);
    }

    const candidateNumbers = digitToLargestTwo.get(dominantDigit);
    candidateNumbers.push(currentInput);
    candidateNumbers.sort(
      (firstElement, secondElement) => secondElement - firstElement
    );

    if (candidateNumbers.length > 2) {
      candidateNumbers.pop();
    }
  }

  for (const pairCandidates of digitToLargestTwo.values()) {
    if (pairCandidates.length === 2) {
      const currentPairSum = pairCandidates[0] + pairCandidates[1];
      overallMaxSum = Math.max(overallMaxSum, currentPairSum);
    }
  }

  return overallMaxSum;
};
