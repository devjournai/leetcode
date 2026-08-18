/**
 * Number of Subarrays That Match a Pattern II
 * Intuition: Encode adjacent comparisons in `nums` as -1/0/1, then count how many times `pattern` occurs in that encoding. KMP finds every occurrence in linear time, which is required for the large constraints.
 * Approach: 1. Build `numsPattern` where numsPattern[i] is 1, 0, or -1 depending on nums[i] vs nums[i + 1]. 2. Compute the LPS (longest proper prefix which is also suffix) array of `pattern`. 3. Run KMP over `numsPattern` and count complete matches, falling back to LPS on mismatch.
 * Dry Run: nums = [1, 2, 3, 4, 5, 6], pattern = [1, 1]. numsPattern = [1, 1, 1, 1, 1]. KMP finds the length-2 pattern starting at four positions, so the answer is 4.
 * Time Complexity: O(n + m)
 * Space Complexity: O(n + m)
 */
var countMatchingSubarrays = function (nums, pattern) {
  const numsPattern = [];
  for (let index = 1; index < nums.length; index++) {
    numsPattern.push(compareAdjacent(nums[index - 1], nums[index]));
  }
  return countKmpOccurrences(numsPattern, pattern);
};

function compareAdjacent(leftValue, rightValue) {
  if (leftValue < rightValue) {
    return 1;
  }
  if (leftValue > rightValue) {
    return -1;
  }
  return 0;
}

function countKmpOccurrences(sequence, pattern) {
  const longestPrefixSuffix = buildLongestPrefixSuffix(pattern);
  let matchCount = 0;
  let sequenceIndex = 0;
  let patternIndex = 0;

  while (sequenceIndex < sequence.length) {
    if (sequence[sequenceIndex] === pattern[patternIndex]) {
      sequenceIndex++;
      patternIndex++;
      if (patternIndex === pattern.length) {
        matchCount++;
        patternIndex = longestPrefixSuffix[patternIndex - 1];
      }
    } else if (patternIndex > 0) {
      patternIndex = longestPrefixSuffix[patternIndex - 1];
    } else {
      sequenceIndex++;
    }
  }

  return matchCount;
}

function buildLongestPrefixSuffix(pattern) {
  const longestPrefixSuffix = new Array(pattern.length).fill(0);
  let prefixLength = 0;

  for (let index = 1; index < pattern.length; index++) {
    while (prefixLength > 0 && pattern[prefixLength] !== pattern[index]) {
      prefixLength = longestPrefixSuffix[prefixLength - 1];
    }
    if (pattern[index] === pattern[prefixLength]) {
      prefixLength++;
      longestPrefixSuffix[index] = prefixLength;
    }
  }

  return longestPrefixSuffix;
}
