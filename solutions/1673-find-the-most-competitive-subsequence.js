/**
 * Find The Most Competitive Subsequence
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
