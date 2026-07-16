/**
 * Number Of Beautiful Pairs
 * Intuition: The problem requires checking a specific coprime condition for pairs of numbers. This naturally suggests iterating through all possible pairs (i, j) where i < j, extracting the relevant digits (first for nums[i], last for nums[j]), and then using the Greatest Common Divisor (GCD) algorithm to determine if they are coprime.
 * Approach: 1. Initialize a counter for beautiful pairs. 2. Implement a helper function for GCD using the Euclidean algorithm. 3. Implement helper functions to extract the first and last digits of a number. 4. Use nested loops to iterate through all valid pairs (currentI, currentJ) such that currentI < currentJ. 5. For each pair, obtain the first digit of nums[currentI] and the last digit of nums[currentJ]. 6. Check if these two digits are coprime using the GCD helper; if they are, increment the beautiful pairs counter. 7. Return the final count.
 * Dry Run: numsArray = [2, 5, 1, 9]
 * beautifulPairCounter = 0
 *
 * currentI = 0 (numsArray[0] = 2)
 *   currentJ = 1 (numsArray[1] = 5)
 *     firstDigitOfI = obtainFirstDigit(2) -> 2
 *     lastDigitOfJ = extractLastDigit(5) -> 5
 *     computeGcd(2, 5) -> 1 (coprime)
 *     beautifulPairCounter = 1
 *
 *   currentJ = 2 (numsArray[2] = 1)
 *     firstDigitOfI = obtainFirstDigit(2) -> 2
 *     lastDigitOfJ = extractLastDigit(1) -> 1
 *     computeGcd(2, 1) -> 1 (coprime)
 *     beautifulPairCounter = 2
 *
 *   currentJ = 3 (numsArray[3] = 9)
 *     firstDigitOfI = obtainFirstDigit(2) -> 2
 *     lastDigitOfJ = extractLastDigit(9) -> 9
 *     computeGcd(2, 9) -> 1 (coprime)
 *     beautifulPairCounter = 3
 *
 * currentI = 1 (numsArray[1] = 5)
 *   currentJ = 2 (numsArray[2] = 1)
 *     firstDigitOfI = obtainFirstDigit(5) -> 5
 *     lastDigitOfJ = extractLastDigit(1) -> 1
 *     computeGcd(5, 1) -> 1 (coprime)
 *     beautifulPairCounter = 4
 *
 *   currentJ = 3 (numsArray[3] = 9)
 *     firstDigitOfI = obtainFirstDigit(5) -> 5
 *     lastDigitOfJ = extractLastDigit(9) -> 9
 *     computeGcd(5, 9) -> 1 (coprime)
 *     beautifulPairCounter = 5
 *
 * currentI = 2 (numsArray[2] = 1)
 *   currentJ = 3 (numsArray[3] = 9)
 *     firstDigitOfI = obtainFirstDigit(1) -> 1
 *     lastDigitOfJ = extractLastDigit(9) -> 9
 *     computeGcd(1, 9) -> 1 (coprime)
 *     beautifulPairCounter = 6
 *
 * Loop finishes.
 * Return 6.
 * Time Complexity: O(N^2 * log(max_digit))
 * Space Complexity: O(1)
 */
var countBeautifulPairs = function (numsArray) {
  let beautifulPairCounter = 0;

  const computeGcd = (numberA, numberB) => {
    while (numberB !== 0) {
      let remainderValue = numberA % numberB;
      numberA = numberB;
      numberB = remainderValue;
    }
    return numberA;
  };

  const obtainFirstDigit = (valueToProcess) => {
    while (valueToProcess >= 10) {
      valueToProcess = Math.floor(valueToProcess / 10);
    }
    return valueToProcess;
  };

  const extractLastDigit = (numberInput) => {
    return numberInput % 10;
  };

  for (let currentI = 0; currentI < numsArray.length - 1; currentI++) {
    for (let currentJ = currentI + 1; currentJ < numsArray.length; currentJ++) {
      const firstDigitOfI = obtainFirstDigit(numsArray[currentI]);
      const lastDigitOfJ = extractLastDigit(numsArray[currentJ]);

      if (computeGcd(firstDigitOfI, lastDigitOfJ) === 1) {
        beautifulPairCounter++;
      }
    }
  }

  return beautifulPairCounter;
};
