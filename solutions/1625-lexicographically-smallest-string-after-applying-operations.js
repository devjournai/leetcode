/**
 * Lexicographically Smallest String After Applying Operations
 * Intuition: Add-on-odd-indices and rotate generate a finite graph of strings. BFS every reachable state and keep the lexicographically smallest.
 * Approach: 1. Queue the start string; skip seen states. 2. From each state, produce add (odd digits + addValue mod 10) and rotate (last rotateValue chars moved to front). 3. Track the min string among visited states.
 * Dry Run: s="5525", a=9, b=2.
 *   - Add → "5424"; rotate and further adds reach "2050", which is the minimum.
 * Time Complexity: O(L * U)
 * Space Complexity: O(L * U)
 */
var findLexSmallestString = function (initialString, addValue, rotateValue) {
  const exploredStates = new Set();
  let currentMinString = initialString;
  const searchQueue = [initialString];
  const stringLength = initialString.length;

  const performAddOperation = (inputStr) => {
    const digitChars = inputStr.split("");
    for (let digitIndex = 1; digitIndex < stringLength; digitIndex += 2) {
      const currentDigit = parseInt(digitChars[digitIndex]);
      const newDigitVal = (currentDigit + addValue) % 10;
      digitChars[digitIndex] = String(newDigitVal);
    }
    return digitChars.join("");
  };

  const performRotateOperation = (originalStr) => {
    const slicedPartOne = originalStr.slice(-rotateValue);
    const slicedPartTwo = originalStr.slice(0, -rotateValue);
    return slicedPartOne + slicedPartTwo;
  };

  while (searchQueue.length > 0) {
    const currentProcessedString = searchQueue.shift();

    if (exploredStates.has(currentProcessedString)) {
      continue;
    }
    exploredStates.add(currentProcessedString);

    if (currentProcessedString < currentMinString) {
      currentMinString = currentProcessedString;
    }

    const resultingStringFromAdd = performAddOperation(currentProcessedString);
    searchQueue.push(resultingStringFromAdd);

    const resultingStringFromRotate = performRotateOperation(
      currentProcessedString
    );
    searchQueue.push(resultingStringFromRotate);
  }

  return currentMinString;
};
