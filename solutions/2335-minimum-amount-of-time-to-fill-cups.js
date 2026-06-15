/**
 * Minimum Amount Of Time To Fill Cups
 * Intuition: To minimize the total time, we should always try to fill two cups simultaneously. This is most efficient when we pick the two types of cups that currently have the highest counts, as this strategy helps to balance the counts and prolong the phase where two cups can be filled. If only one type of cup remains, we must fill one cup at a time.
 * Approach: 1. Initialize a `timeTaken` variable to zero. 2. Enter a loop that continues until all cups are filled. 3. In each iteration, sort the `currentCupCounts` array in descending order. 4. Check if the largest count is zero. If it is, all cups are filled, so break the loop. 5. Increment `timeTaken` by one. 6. If the second largest cup count is greater than zero, decrement both the largest and second largest cup counts by one. 7. Otherwise (meaning only one type of cup has remaining quantity), decrement only the largest cup count by one. 8. Return the final `timeTaken` value.
 * Dry Run: amount = [5, 4, 3]
 * timeTaken = 0
 * Loop 1: currentCupCounts = [5, 4, 3] (after sort). Not all zero. timeTaken = 1. currentCupCounts[0]--, currentCupCounts[1]--. currentCupCounts becomes [4, 3, 3].
 * Loop 2: currentCupCounts = [4, 3, 3] (after sort). Not all zero. timeTaken = 2. currentCupCounts[0]--, currentCupCounts[1]--. currentCupCounts becomes [3, 2, 3].
 * Loop 3: currentCupCounts = [3, 3, 2] (after sort). Not all zero. timeTaken = 3. currentCupCounts[0]--, currentCupCounts[1]--. currentCupCounts becomes [2, 2, 2].
 * Loop 4: currentCupCounts = [2, 2, 2] (after sort). Not all zero. timeTaken = 4. currentCupCounts[0]--, currentCupCounts[1]--. currentCupCounts becomes [1, 1, 2].
 * Loop 5: currentCupCounts = [2, 1, 1] (after sort). Not all zero. timeTaken = 5. currentCupCounts[0]--, currentCupCounts[1]--. currentCupCounts becomes [1, 0, 1].
 * Loop 6: currentCupCounts = [1, 1, 0] (after sort). Not all zero. timeTaken = 6. currentCupCounts[0]--, currentCupCounts[1]--. currentCupCounts becomes [0, 0, 0].
 * Loop 7: currentCupCounts = [0, 0, 0] (after sort). Largest count is zero. Break.
 * Return 6.
 * Time Complexity: O(max(amount))
 * Space Complexity: O(1)
 */
var fillCups = function (amount) {
  let currentCupCounts = amount;
  let timeTaken = 0;

  const sorterFunction = (firstElement, secondElement) =>
    secondElement - firstElement;

  while (true) {
    currentCupCounts.sort(sorterFunction);

    let largestCount = currentCupCounts[0];
    let middleCount = currentCupCounts[1];
    let smallestCount = currentCupCounts[2];

    if (largestCount === 0 && middleCount === 0 && smallestCount === 0) {
      break;
    }

    timeTaken++;

    if (middleCount > 0) {
      currentCupCounts[0]--;
      currentCupCounts[1]--;
    } else {
      currentCupCounts[0]--;
    }
  }

  return timeTaken;
};
