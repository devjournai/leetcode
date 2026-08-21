/**
 * Minimum Adjacent Swaps to Alternate Parity
 * Intuition: The result must be even-odd-even-... or odd-even-odd-.... Count how many adjacent swaps move the even (or odd) indices into those target slots; that cost is the sum of |currentPos - targetPos|.
 * Approach: 1. Collect positions of evens and odds. 2. If counts differ by more than 1, return -1. 3. If one parity is more frequent it must start. 4. Else take min of both starts.
 * Dry Run: nums = [2, 4, 6, 5, 7]. Three evens, two odds → must start even: targets 0,2,4 vs even positions 0,1,2 → swaps |0-0|+|1-2|+|2-4|=3.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minSwaps = function (nums) {
  const pos = [[], []];
  for (let i = 0; i < nums.length; i++) {
    pos[nums[i] & 1].push(i);
  }
  if (Math.abs(pos[0].length - pos[1].length) > 1) {
    return -1;
  }

  const calc = (parity) => {
    let res = 0;
    for (let i = 0; i < nums.length; i += 2) {
      res += Math.abs(pos[parity][i >> 1] - i);
    }
    return res;
  };

  if (pos[0].length > pos[1].length) {
    return calc(0);
  }
  if (pos[0].length < pos[1].length) {
    return calc(1);
  }
  return Math.min(calc(0), calc(1));
};
