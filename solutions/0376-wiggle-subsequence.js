/**
 * Wiggle Subsequence
 * Intuition: A wiggle is an alternating up/down difference. Track the longest subsequence ending in an up swing vs a down swing; an ascent extends the previous down length, a descent extends the previous up length.
 * Approach: 1. Empty array → 0. 2. `currentLongestUp = currentLongestDown = 1`. 3. Scan adjacent pairs: greater → up = down+1; smaller → down = up+1; equals leave both. 4. Return max(up, down).
 * Dry Run: [1,7,4,9,2,5]. 1→7 up=2; 7→4 down=3; 4→9 up=4; 9→2 down=5; 2→5 up=6 → 6.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var wiggleMaxLength = function (nums) {
  if (nums.length === 0) {
    return 0;
  }

  let currentLongestUp = 1;
  let currentLongestDown = 1;

  for (
    let currentPosition = 1;
    currentPosition < nums.length;
    currentPosition++
  ) {
    let valueBefore = nums[currentPosition - 1];
    let valueAtCurrent = nums[currentPosition];

    if (valueAtCurrent > valueBefore) {
      currentLongestUp = currentLongestDown + 1;
    } else if (valueAtCurrent < valueBefore) {
      currentLongestDown = currentLongestUp + 1;
    }
  }

  return Math.max(currentLongestUp, currentLongestDown);
};
