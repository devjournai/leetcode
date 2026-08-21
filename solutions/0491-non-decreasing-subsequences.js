/**
 * Non Decreasing Subsequences
 * Intuition: Every subsequence of length ≥ 2 that is non-decreasing is valid. DFS builds increasing paths; serialize with `join(',')` in a Set so duplicates from repeated values collapse.
 * Approach: 1. `generateSubsequences(pos, path)`: if path length ≥ 2, add `path.join(',')`. 2. From `pos` onward, append `nums[i]` when the path is empty or `nums[i] >= last`. Recurse with a copied path. 3. Convert the set back to number arrays.
 * Dry Run: nums = [4,6,7,7].
 *   - Paths include 4,6 then 4,6,7 then 4,6,7,7; 4,7; 4,7,7; 6,7; 6,7,7; 7,7. Set dedupes identical 4,7 sequences. Return those lists.
 * Time Complexity: O(2^N * N)
 * Space Complexity: O(2^N * N)
 */
var findSubsequences = function (nums) {
  const uniqueSubsequences = new Set();

  function generateSubsequences(currentPosition, currentPath) {
    if (currentPath.length >= 2) {
      uniqueSubsequences.add(currentPath.join(","));
    }

    for (
      let searchIndex = currentPosition;
      searchIndex < nums.length;
      searchIndex++
    ) {
      const candidateValue = nums[searchIndex];
      if (
        currentPath.length === 0 ||
        candidateValue >= currentPath[currentPath.length - 1]
      ) {
        const nextPath = [...currentPath, candidateValue];
        generateSubsequences(searchIndex + 1, nextPath);
      }
    }
  }

  generateSubsequences(0, []);

  return Array.from(uniqueSubsequences).map((sequenceString) =>
    sequenceString.split(",").map(Number)
  );
};
