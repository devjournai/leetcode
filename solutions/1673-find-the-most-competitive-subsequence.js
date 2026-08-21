/**
 * Find The Most Competitive Subsequence
 * Intuition: A monotonic increasing stack of length k: drop a larger tail when a smaller value arrives and enough elements remain to still fill k.
 * Approach: 1. Scan nums. 2. While the stack top > current, and stack.length + remaining > k, pop. 3. Push if the stack still has room. 4. Return the stack.
 * Dry Run: nums=[3,5,2,6], k=2.
 *   - 3; 5; pop 5 and 3 for 2; push 6 → [2,6].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var mostCompetitive = function (nums, k) {
  const competitiveSubsequence = [];
  const totalNumbers = nums.length;
  const desiredLength = k;

  let currentScanIndex = 0;
  while (currentScanIndex < totalNumbers) {
    const numberAtCurrentIndex = nums[currentScanIndex];

    while (
      competitiveSubsequence.length > 0 &&
      competitiveSubsequence[competitiveSubsequence.length - 1] >
        numberAtCurrentIndex &&
      competitiveSubsequence.length + (totalNumbers - currentScanIndex) >
        desiredLength
    ) {
      competitiveSubsequence.pop();
    }

    if (competitiveSubsequence.length < desiredLength) {
      competitiveSubsequence.push(numberAtCurrentIndex);
    }

    currentScanIndex++;
  }

  return competitiveSubsequence;
};
