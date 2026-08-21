/**
 * Palindrome Partitioning III
 * Intuition: Precompute how many changes make s[i..j] a palindrome. Then DP min changes to split a prefix into exactly p palindromic parts.
 * Approach: 1. Fill minChangesToPalindrome by expanding length: inner cost plus 1 if ends differ. 2. minTotalChanges[len][parts] tries every last-piece start. 3. Return minTotalChanges[n][k].
 * Dry Run: s="abc", k=2
 *   "a|bc": cost 0 + 1 (bc->bb) = 1. "ab|c": 1+0=1. Return 1.
 * Time Complexity: O(n^2 * k)
 * Space Complexity: O(n^2)
 */
var palindromePartition = function (s, k) {
  const stringLength = s.length;

  const minChangesToPalindrome = Array.from({ length: stringLength }, () =>
    new Array(stringLength).fill(0)
  );

  for (
    let substringLength = 2;
    substringLength <= stringLength;
    substringLength++
  ) {
    for (
      let substringStartIndex = 0;
      substringStartIndex <= stringLength - substringLength;
      substringStartIndex++
    ) {
      const substringEndIndex = substringStartIndex + substringLength - 1;
      minChangesToPalindrome[substringStartIndex][substringEndIndex] =
        minChangesToPalindrome[substringStartIndex + 1][substringEndIndex - 1] +
        (s[substringStartIndex] === s[substringEndIndex] ? 0 : 1);
    }
  }

  const minTotalChanges = Array.from({ length: stringLength + 1 }, () =>
    new Array(k + 1).fill(Infinity)
  );
  minTotalChanges[0][0] = 0;

  for (
    let currentPrefixLength = 1;
    currentPrefixLength <= stringLength;
    currentPrefixLength++
  ) {
    for (
      let actualNumPartitions = 1;
      actualNumPartitions <= k;
      actualNumPartitions++
    ) {
      if (currentPrefixLength < actualNumPartitions) {
        continue;
      }
      for (
        let splitPointIndex = 0;
        splitPointIndex < currentPrefixLength;
        splitPointIndex++
      ) {
        const previousTotalChanges =
          minTotalChanges[splitPointIndex][actualNumPartitions - 1];
        if (previousTotalChanges === Infinity) {
          continue;
        }
        const currentPartitionCost =
          minChangesToPalindrome[splitPointIndex][currentPrefixLength - 1];
        minTotalChanges[currentPrefixLength][actualNumPartitions] = Math.min(
          minTotalChanges[currentPrefixLength][actualNumPartitions],
          previousTotalChanges + currentPartitionCost
        );
      }
    }
  }

  return minTotalChanges[stringLength][k];
};
