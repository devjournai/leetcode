/**
 * Construct the Minimum Bitwise Array I
 * Intuition: We need the smallest x with x | (x+1) = nums[i]. Even values cannot arise this way (the OR always produces an odd number), so they map to -1.
 * Approach: For each num, if even push -1. Otherwise start from num-1 and for k=1..10, when the lowest k+1 bits of num are all 1s, try x = num XOR (1<<k) and keep the minimum.
 * Dry Run: nums = [2,3] -> 2 even -> -1; 3 is 11b, k=1 mask=11b matches, x=3 XOR 2=1, and 1|(2)=3, answer [-1,1].
 * Time Complexity: O(N * log(MAX_NUM))
 * Space Complexity: O(N)
 */
var minBitwiseArray = function (nums) {
  const ans = [];

  for (const num of nums) {
    if (num % 2 === 0) {
      ans.push(-1);
      continue;
    }
    let minX = num - 1;
    for (let k = 1; k <= 10; k++) {
      const mask = (1 << (k + 1)) - 1;

      if ((num & mask) === mask) {
        const xCandidate = num ^ (1 << k);
        minX = Math.min(minX, xCandidate);
      }
    }
    ans.push(minX);
  }

  return ans;
};
