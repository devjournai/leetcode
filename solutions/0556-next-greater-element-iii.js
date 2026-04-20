/**
 * Next Greater Element III
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
