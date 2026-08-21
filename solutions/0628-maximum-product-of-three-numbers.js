/**
 * Maximum Product of Three Numbers
 * Intuition: The maximum product of three numbers can result from one of two scenarios: either the product of the three largest numbers, or the product of the two smallest (potentially negative) numbers multiplied by the single largest number.
 * Approach: 1. Initialize five distinct variables to track the three largest numbers encountered so far (firstLargest, secondLargest, thirdLargest) and the two smallest numbers encountered so far (firstSmallest, secondSmallest). 2. Iterate through each element of the input array exactly once. 3. Within the loop, apply conditional logic to update the largest-tracking variables if the current element is greater than any of them, shifting existing values down. 4. Simultaneously, apply conditional logic to update the smallest-tracking variables if the current element is smaller than any of them, shifting existing values. 5. After the iteration completes, calculate two potential maximum products: one using the two smallest and the largest number, and another using the three largest numbers. 6. Return the greater of these two calculated products.
 * Dry Run: nums = [-100, -2, -3, 1, 5]
 * Initial:
 *   firstLargest = -Infinity, secondLargest = -Infinity, thirdLargest = -Infinity
 *   firstSmallest = Infinity, secondSmallest = Infinity
 *
 * Loop Iterations:
 * - currentNumber = -100:
 *   - Largest update: firstLargest = -100, secondLargest = -Infinity, thirdLargest = -Infinity
 *   - Smallest update: firstSmallest = -100, secondSmallest = Infinity
 *   State: { fL:-100, sL:-Inf, tL:-Inf, fS:-100, sS:Inf }
 *
 * - currentNumber = -2:
 *   - Largest update: firstLargest = -2, secondLargest = -100, thirdLargest = -Infinity
 *   - Smallest update: firstSmallest = -100, secondSmallest = -2
 *   State: { fL:-2, sL:-100, tL:-Inf, fS:-100, sS:-2 }
 *
 * - currentNumber = -3:
 *   - Largest update: firstLargest = -2, secondLargest = -3, thirdLargest = -100
 *   - Smallest update: firstSmallest = -100, secondSmallest = -3
 *   State: { fL:-2, sL:-3, tL:-100, fS:-100, sS:-3 }
 *
 * - currentNumber = 1:
 *   - Largest update: firstLargest = 1, secondLargest = -2, thirdLargest = -3
 *   - Smallest update: (no change)
 *   State: { fL:1, sL:-2, tL:-3, fS:-100, sS:-3 }
 *
 * - currentNumber = 5:
 *   - Largest update: firstLargest = 5, secondLargest = 1, thirdLargest = -2
 *   - Smallest update: (no change)
 *   State: { fL:5, sL:1, tL:-2, fS:-100, sS:-3 }
 *
 * After loop:
 *   productOptionOne = firstSmallest * secondSmallest * firstLargest = (-100) * (-3) * 5 = 1500
 *   productOptionTwo = firstLargest * secondLargest * thirdLargest = 5 * 1 * (-2) = -10
 *
 * Final Result: Math.max(1500, -10) = 1500
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maximumProduct = function (nums) {
  let firstLargest = -Infinity;
  let secondLargest = -Infinity;
  let thirdLargest = -Infinity;

  let firstSmallest = Infinity;
  let secondSmallest = Infinity;

  for (let currentNumber of nums) {
    if (currentNumber > firstLargest) {
      thirdLargest = secondLargest;
      secondLargest = firstLargest;
      firstLargest = currentNumber;
    } else if (currentNumber > secondLargest) {
      thirdLargest = secondLargest;
      secondLargest = currentNumber;
    } else if (currentNumber > thirdLargest) {
      thirdLargest = currentNumber;
    }

    if (currentNumber < firstSmallest) {
      secondSmallest = firstSmallest;
      firstSmallest = currentNumber;
    } else if (currentNumber < secondSmallest) {
      secondSmallest = currentNumber;
    }
  }

  const productOptionOne = firstSmallest * secondSmallest * firstLargest;
  const productOptionTwo = firstLargest * secondLargest * thirdLargest;

  return Math.max(productOptionOne, productOptionTwo);
};
