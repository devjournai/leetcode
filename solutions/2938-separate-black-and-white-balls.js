/**
 * Separate Black And White Balls
 * Intuition: The problem asks for the minimum swaps to group all white balls ('0') to the left and black balls ('1') to the right. This is a classic adjacent swap problem that can be solved by counting "inversions" or by observing the relative movement of elements. When a white ball ('0') is encountered, it needs to move left past all the black balls ('1') that are currently positioned to its left. The number of '1's it needs to pass is the difference between its current physical index and its ideal sorted index relative to other '0's already processed.
 * Approach: 1. Initialize `totalSwapsAccumulated` to zero to track the total minimum moves. 2. Initialize `numberOfWhiteBallsSeen` to zero to count how many white balls have been processed and conceptually moved to their final left positions. 3. Iterate through the string `s` using an index `indexOfCurrentBall`. 4. If the character at `indexOfCurrentBall` is '0' (a white ball): a. Calculate the number of swaps needed for this '0'. This is `indexOfCurrentBall - numberOfWhiteBallsSeen`. This value represents how many '1's this '0' has to skip over to reach its correct relative position on the left. b. Add this value to `totalSwapsAccumulated`. c. Increment `numberOfWhiteBallsSeen` as this '0' has now been processed. 5. After the loop completes, `totalSwapsAccumulated` holds the minimum number of steps.
 * Dry Run: s = "10110"
 * totalSwapsAccumulated = 0
 * numberOfWhiteBallsSeen = 0
 *
 * 1. indexOfCurrentBall = 0, s[0] = '1'. No action.
 * 2. indexOfCurrentBall = 1, s[1] = '0'.
 *    - Swaps for this '0' = indexOfCurrentBall - numberOfWhiteBallsSeen = 1 - 0 = 1.
 *    - totalSwapsAccumulated = 0 + 1 = 1.
 *    - numberOfWhiteBallsSeen = 0 + 1 = 1.
 * 3. indexOfCurrentBall = 2, s[2] = '1'. No action.
 * 4. indexOfCurrentBall = 3, s[3] = '1'. No action.
 * 5. indexOfCurrentBall = 4, s[4] = '0'.
 *    - Swaps for this '0' = indexOfCurrentBall - numberOfWhiteBallsSeen = 4 - 1 = 3.
 *    - totalSwapsAccumulated = 1 + 3 = 4.
 *    - numberOfWhiteBallsSeen = 1 + 1 = 2.
 *
 * Loop ends. Return totalSwapsAccumulated = 4.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumSteps = function (s) {
  let totalSwapsAccumulated = 0;
  let numberOfWhiteBallsSeen = 0;

  for (
    let indexOfCurrentBall = 0;
    indexOfCurrentBall < s.length;
    indexOfCurrentBall++
  ) {
    if (s[indexOfCurrentBall] === "0") {
      totalSwapsAccumulated += indexOfCurrentBall - numberOfWhiteBallsSeen;
      numberOfWhiteBallsSeen++;
    }
  }

  return totalSwapsAccumulated;
};
