/**
 * Make String Anti Palindrome
 * Intuition: To achieve the lexicographically smallest anti-palindrome, first sort the string. Then, focus on fixing characters at `i` and `n-1-i` that are identical. Iterate from the middle outwards, identifying identical pairs. For each such pair, swap one of the characters with the smallest available character from the latter half of the sorted string that is different from the character needing to be moved. If no such character is available, it's impossible.
 * Approach: 1. Convert the input string `s` to a character array and sort it lexicographically. Let `inputStringLength` be the length of the string. 2. Initialize `centralLeftPtr` and `centralRightSwapPtr` to `Math.floor((inputStringLength + 1) / 2)`. This `centralLeftPtr` will generally point to elements in the left half that need checking or swapping, starting from the center. `centralRightSwapPtr` will find elements in the right half suitable for swapping. 3. Advance `centralRightSwapPtr` until it points to a character different from `sortedCharArr[centralLeftPtr]` or reaches the end of the array. This `centralRightSwapPtr` will be used as the source for swaps. 4. Iterate while `sortedCharArr[centralLeftPtr]` is identical to `sortedCharArr[inputStringLength - 1 - centralLeftPtr]`. 5. Inside this loop, if `centralRightSwapPtr` has reached the end of the array, it means there are no more distinct characters available for swapping to fix the current anti-palindrome violation, so return "-1". 6. Otherwise, perform a swap: interchange the characters at `sortedCharArr[centralLeftPtr]` and `sortedCharArr[centralRightSwapPtr]`. 7. Increment both `centralLeftPtr` and `centralRightSwapPtr` to process the next potential problematic pair and find the next swap candidate. 8. After the loop, join the `sortedCharArr` back into a string and return it.
 * Dry Run: s = "abccba"
 *   inputStringLength = 6
 *   sortedCharArr = ['a', 'a', 'b', 'b', 'c', 'c']
 *   centralLeftPtr = Math.floor((6 + 1) / 2) = 3
 *   centralRightSwapPtr = Math.floor((6 + 1) / 2) = 3
 *
 *   Step 3: Advance centralRightSwapPtr
 *   While centralRightSwapPtr (3) < 6 AND sortedCharArr[3] ('b') === sortedCharArr[centralLeftPtr (3)] ('b')
 *     centralRightSwapPtr becomes 4
 *   While centralRightSwapPtr (4) < 6 AND sortedCharArr[4] ('c') === sortedCharArr[centralLeftPtr (3)] ('b')
 *     Condition 'c' === 'b' is false. Loop ends.
 *   Now centralRightSwapPtr = 4.
 *
 *   Step 4: Main loop for fixing anti-palindrome violations
 *   Iteration 1:
 *   Check sortedCharArr[centralLeftPtr (3)] ('b') === sortedCharArr[inputStringLength - 1 - centralLeftPtr (2)] ('b'). True.
 *     Step 5: centralRightSwapPtr (4) === inputStringLength (6)? False.
 *     Step 6: Swap sortedCharArr[3] ('b') and sortedCharArr[4] ('c').
 *       sortedCharArr becomes ['a', 'a', 'b', 'c', 'b', 'c']
 *     Step 7: centralLeftPtr becomes 4. centralRightSwapPtr becomes 5.
 *
 *   Iteration 2:
 *   Check sortedCharArr[centralLeftPtr (4)] ('b') === sortedCharArr[inputStringLength - 1 - centralLeftPtr (1)] ('a'). False. Loop ends.
 *
 *   Step 8: Return sortedCharArr.join('') which is "aabcbc".
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var makeAntiPalindrome = function (s) {
  const inputStringLength = s.length;
  const sortedCharArr = Array.from(s).sort();

  let centralLeftPtr = Math.floor((inputStringLength + 1) / 2);
  let centralRightSwapPtr = Math.floor((inputStringLength + 1) / 2);

  while (
    centralRightSwapPtr < inputStringLength &&
    sortedCharArr[centralRightSwapPtr] === sortedCharArr[centralLeftPtr]
  ) {
    centralRightSwapPtr++;
  }

  while (
    sortedCharArr[centralLeftPtr] ===
    sortedCharArr[inputStringLength - centralLeftPtr - 1]
  ) {
    if (centralRightSwapPtr === inputStringLength) {
      return "-1";
    }

    let temporaryChar = sortedCharArr[centralLeftPtr];
    sortedCharArr[centralLeftPtr] = sortedCharArr[centralRightSwapPtr];
    sortedCharArr[centralRightSwapPtr] = temporaryChar;

    centralLeftPtr++;
    centralRightSwapPtr++;
  }

  return sortedCharArr.join("");
};
