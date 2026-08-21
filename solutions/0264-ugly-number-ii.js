/**
 * Ugly Number II
 * Intuition: Every ugly number is some earlier ugly number times 2, 3, or 5. Three pointers into the growing list generate the next candidate as the min of those three products, advancing every pointer that produced the min so duplicates are skipped.
 * Approach: 1. n≤0 → 0. 2. Start list `[1]` and pointers at 0. 3. While length < n, take min of list[p2]*2, list[p3]*3, list[p5]*5, push it, and increment each pointer whose product equaled that min. 4. Return list[n-1].
 * Dry Run: n = 5.
 *   - 1; next min(2,3,5)=2 (p2++); min(4,3,5)=3 (p3++); min(4,6,5)=4 (p2++); min(6,6,5)=5 (p5++). List [1,2,3,4,5]. Return 5.
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
      productFromFive
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
