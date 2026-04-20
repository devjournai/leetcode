/**
 * Ugly Number II
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var nthUglyNumber = function (n) {
  if (n <= 0) {
    return 0;
  }

  const uglyNumbersContainer = [1];
  let pointerTwoIndex = 0;
  let pointerThreeIndex = 0;
  let pointerFiveIndex = 0;

  while (uglyNumbersContainer.length < n) {
    const productFromTwo = uglyNumbersContainer[pointerTwoIndex] * 2;
    const productFromThree = uglyNumbersContainer[pointerThreeIndex] * 3;
    const productFromFive = uglyNumbersContainer[pointerFiveIndex] * 5;

    const nextUglyCandidate = Math.min(
      productFromTwo,
      productFromThree,
      productFromFive,
    );
    uglyNumbersContainer.push(nextUglyCandidate);

    if (nextUglyCandidate === productFromTwo) {
      pointerTwoIndex++;
    }
    if (nextUglyCandidate === productFromThree) {
      pointerThreeIndex++;
    }
    if (nextUglyCandidate === productFromFive) {
      pointerFiveIndex++;
    }
  }

  return uglyNumbersContainer[n - 1];
};
