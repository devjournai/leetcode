/**
 * Mark Elements On Array By Performing Queries
 * Intuition: Each query marks nums[index] if unmarked, then marks the smallest unmarked elements. Use a min-heap of values with indices plus a marked set; maintain remaining unmarked sum.
 * Approach: 1. Start with total sum. 2. Sort indices by (value, index). 3. For each query, mark the given index if needed, then mark next smallest unmarked from the sorted list k times. 4. Record remaining sum.
 * Dry Run:
 *   nums = [1,2,2,1,2,3], queries with k mark smallest remaining after the pointed index.
 * Time Complexity: O((N+Q) log N)
 * Space Complexity: O(N)
 */
var unmarkedSumArray = function (nums, queries) {
  const arrayLength = nums.length;
  const isMarked = new Array(arrayLength).fill(false);
  const sortedIndices = [...Array(arrayLength).keys()].sort(
    (a, b) => nums[a] - nums[b] || a - b,
  );
  let remainingSum = nums.reduce((total, value) => total + value, 0);
  let smallestUnmarkedPointer = 0;
  const remainingSums = [];

  const markIndex = (indexToMark) => {
    if (!isMarked[indexToMark]) {
      isMarked[indexToMark] = true;
      remainingSum -= nums[indexToMark];
    }
  };

  for (const [queryIndex, extraMarks] of queries) {
    markIndex(queryIndex);
    let marksRemaining = extraMarks;
    while (marksRemaining > 0 && smallestUnmarkedPointer < arrayLength) {
      const candidateIndex = sortedIndices[smallestUnmarkedPointer];
      if (!isMarked[candidateIndex]) {
        markIndex(candidateIndex);
        marksRemaining--;
      }
      smallestUnmarkedPointer++;
    }
    remainingSums.push(remainingSum);
  }
  return remainingSums;
};
