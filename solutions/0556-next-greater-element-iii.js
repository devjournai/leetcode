/**
 * Next Greater Element III
 * Intuition: Next permutation of the digits: find the rightmost ascent, swap with the next-larger digit to its right, reverse the suffix. Reject if no ascent or the result exceeds 32-bit signed max.
 * Approach: 1. Digits from `n`. 2. Find `firstPointer` where digits[i] < digits[i+1] from the right. 3. If none, return -1. 4. Find rightmost `secondPointer` > digits[firstPointer], swap. 5. Reverse the suffix after `firstPointer`. 6. Parse; return it only if > n and <= 2^31-1, else -1.
 * Dry Run: n = 12 → digits [1,2].
 *   - Ascent at 0; swap with 2; suffix reverse is noop. 21 is valid. Return 21.
 *   - n = 21 has no ascent → -1.
 * Time Complexity: O(log N)
 * Space Complexity: O(log N)
 */
var nextGreaterElement = function (n) {
  const digitsArray = String(n).split("");
  const numberOfDigits = digitsArray.length;

  let firstPointer = numberOfDigits - 2;
  while (
    firstPointer >= 0 &&
    digitsArray[firstPointer] >= digitsArray[firstPointer + 1]
  ) {
    firstPointer--;
  }

  if (firstPointer < 0) {
    return -1;
  }

  let secondPointer = numberOfDigits - 1;
  while (
    secondPointer >= 0 &&
    digitsArray[secondPointer] <= digitsArray[firstPointer]
  ) {
    secondPointer--;
  }

  [digitsArray[firstPointer], digitsArray[secondPointer]] = [
    digitsArray[secondPointer],
    digitsArray[firstPointer],
  ];

  let reverseLeft = firstPointer + 1;
  let reverseRight = numberOfDigits - 1;
  while (reverseLeft < reverseRight) {
    [digitsArray[reverseLeft], digitsArray[reverseRight]] = [
      digitsArray[reverseRight],
      digitsArray[reverseLeft],
    ];
    reverseLeft++;
    reverseRight--;
  }

  const nextGreaterNumber = parseInt(digitsArray.join(""), 10);
  const maxInt32 = 2 ** 31 - 1;

  if (nextGreaterNumber > n && nextGreaterNumber <= maxInt32) {
    return nextGreaterNumber;
  } else {
    return -1;
  }
};
