/**
 * Minimum Recolors To Get K Consecutive Black Blocks
 * Intuition: This problem asks for the minimum number of 'W's to convert to 'B's within any contiguous subarray of length k. This is a classic sliding window problem where we aim to find the window of size k that contains the fewest 'W's.
 * Approach: 1. Initialize two pointers, `startWindow` at the beginning of the string and `endWindow` to iterate through the string. 2. Maintain a `currentWindowWhiteCount` for the number of 'W's within the active window defined by `startWindow` and `endWindow`. 3. Initialize `minOperationsRequired` to a maximum possible value (e.g., `Number.MAX_SAFE_INTEGER`). 4. Iterate `endWindow` from the beginning to the end of the `blocks` string: a. If the character at `blocks[endWindow]` is 'W', increment `currentWindowWhiteCount`. b. Once the window size (`endWindow - startWindow + 1`) reaches `k`: i. Update `minOperationsRequired` with the minimum of its current value and `currentWindowWhiteCount`. ii. To slide the window forward, check if `blocks[startWindow]` is 'W'; if so, decrement `currentWindowWhiteCount`. iii. Increment `startWindow`. 5. After `endWindow` has traversed the entire string, `minOperationsRequired` will hold the minimum number of recolor operations needed.
 * Dry Run: blocks = "WBBWWBBWBW", k = 3
 * Initial: currentWindowWhiteCount = 0, minOperationsRequired = Infinity, startWindow = 0
 *
 * endWindow = 0: blocks[0] = 'W'. currentWindowWhiteCount = 1. Window: "W"
 * endWindow = 1: blocks[1] = 'B'. currentWindowWhiteCount = 1. Window: "WB"
 * endWindow = 2: blocks[2] = 'B'. currentWindowWhiteCount = 1. Window: "WBB" (size 3)
 *   Window size (3) === k. minOperationsRequired = min(Infinity, 1) = 1.
 *   blocks[startWindow] (blocks[0]) = 'W'. currentWindowWhiteCount = 1 - 1 = 0.
 *   startWindow = 1.
 *
 * endWindow = 3: blocks[3] = 'W'. currentWindowWhiteCount = 0 + 1 = 1. Window: "BBW" (size 3)
 *   Window size (3) === k. minOperationsRequired = min(1, 1) = 1.
 *   blocks[startWindow] (blocks[1]) = 'B'. currentWindowWhiteCount remains 1.
 *   startWindow = 2.
 *
 * endWindow = 4: blocks[4] = 'W'. currentWindowWhiteCount = 1 + 1 = 2. Window: "BWW" (size 3)
 *   Window size (3) === k. minOperationsRequired = min(1, 2) = 1.
 *   blocks[startWindow] (blocks[2]) = 'B'. currentWindowWhiteCount remains 2.
 *   startWindow = 3.
 *
 * endWindow = 5: blocks[5] = 'B'. currentWindowWhiteCount = 2. Window: "WWB" (size 3)
 *   Window size (3) === k. minOperationsRequired = min(1, 2) = 1.
 *   blocks[startWindow] (blocks[3]) = 'W'. currentWindowWhiteCount = 2 - 1 = 1.
 *   startWindow = 4.
 *
 * endWindow = 6: blocks[6] = 'B'. currentWindowWhiteCount = 1. Window: "WBB" (size 3)
 *   Window size (3) === k. minOperationsRequired = min(1, 1) = 1.
 *   blocks[startWindow] (blocks[4]) = 'W'. currentWindowWhiteCount = 1 - 1 = 0.
 *   startWindow = 5.
 *
 * endWindow = 7: blocks[7] = 'W'. currentWindowWhiteCount = 0 + 1 = 1. Window: "BBW" (size 3)
 *   Window size (3) === k. minOperationsRequired = min(1, 1) = 1.
 *   blocks[startWindow] (blocks[5]) = 'B'. currentWindowWhiteCount remains 1.
 *   startWindow = 6.
 *
 * endWindow = 8: blocks[8] = 'B'. currentWindowWhiteCount = 1. Window: "BWB" (size 3)
 *   Window size (3) === k. minOperationsRequired = min(1, 1) = 1.
 *   blocks[startWindow] (blocks[6]) = 'B'. currentWindowWhiteCount remains 1.
 *   startWindow = 7.
 *
 * endWindow = 9: blocks[9] = 'W'. currentWindowWhiteCount = 1 + 1 = 2. Window: "WBW" (size 3)
 *   Window size (3) === k. minOperationsRequired = min(1, 2) = 1.
 *   blocks[startWindow] (blocks[7]) = 'W'. currentWindowWhiteCount = 2 - 1 = 1.
 *   startWindow = 8.
 *
 * End of iteration. Return minOperationsRequired = 1.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumRecolors = function (blocks, k) {
  let currentWindowWhiteCount = 0;
  let minOperationsRequired = Number.MAX_SAFE_INTEGER;
  let startWindow = 0;

  for (let endWindow = 0; endWindow < blocks.length; endWindow++) {
    if (blocks[endWindow] === "W") {
      currentWindowWhiteCount++;
    }

    if (endWindow - startWindow + 1 === k) {
      minOperationsRequired = Math.min(
        minOperationsRequired,
        currentWindowWhiteCount,
      );

      if (blocks[startWindow] === "W") {
        currentWindowWhiteCount--;
      }
      startWindow++;
    }
  }

  return minOperationsRequired;
};
