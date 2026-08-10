/**
 * Longest Unequal Adjacent Groups Subsequence Ii
 * Intuition: This problem asks for the longest subsequence satisfying two conditions for adjacent elements: unequal groups and a Hamming distance of one between words. This is a classic Longest Increasing Subsequence (LIS) type problem, where "increasing" is replaced by these specific adjacency conditions. Dynamic programming is a suitable approach to build up the longest valid subsequence ending at each position.
 * Approach: 1. Initialize a dynamic programming array, `longestSubsequenceEndingAtIndex`, where `longestSubsequenceEndingAtIndex[i]` stores the length of the longest valid subsequence ending with the word at index `i`. Each element is initially 1 (the word itself forms a subsequence of length 1).
 * 2. Initialize a `pathPredecessorIndex` array to reconstruct the subsequence later. `pathPredecessorIndex[i]` will store the index of the element that precedes `i` in the longest subsequence ending at `i`.
 * 3. Iterate through the `wordsParameter` array using `currentIterationIndex` from 1 to `totalInputLength - 1`. For each `currentIterationIndex`, iterate through all preceding indices `priorIterationIndex` from 0 to `currentIterationIndex - 1`.
 * 4. For each pair (`priorIterationIndex`, `currentIterationIndex`), check two conditions:
 *    a. `groupsParameter[currentIterationIndex]` must not be equal to `groupsParameter[priorIterationIndex]`.
 *    b. The words `wordsParameter[currentIterationIndex]` and `wordsParameter[priorIterationIndex]` must have the same length and a Hamming distance of exactly 1. A helper function `checkHammingDistanceOne` is used for this.
 * 5. If both conditions are met, it means `wordsParameter[currentIterationIndex]` can potentially extend a subsequence ending at `wordsParameter[priorIterationIndex]`. If `longestSubsequenceEndingAtIndex[priorIterationIndex] + 1` is greater than the current `longestSubsequenceEndingAtIndex[currentIterationIndex]`, update `longestSubsequenceEndingAtIndex[currentIterationIndex]` and set `pathPredecessorIndex[currentIterationIndex]` to `priorIterationIndex`.
 * 6. During the outer loop, keep track of the `overallMaximumLength` found and the `finalSubsequenceEndingIndex` where this maximum length was achieved.
 * 7. After filling the DP table, reconstruct the actual subsequence by backtracking from `finalSubsequenceEndingIndex` using the `pathPredecessorIndex` array until a predecessor of -1 is reached. Store the words in a `resultWordsCollection`.
 * 8. Since the reconstruction builds the subsequence in reverse order, reverse the `resultWordsCollection` before returning it.
 * 9. The helper function `checkHammingDistanceOne` first checks if the string lengths are equal. If not, it returns false. Otherwise, it counts character differences and returns true only if exactly one difference is found, exiting early if more than one difference is encountered.
 * Dry Run: words=["at", "bt", "tt", "ad", "zt"], groups=[0, 0, 1, 1, 0]
 * totalInputLength = 5
 * Initial: longestSubsequenceEndingAtIndex = [1,1,1,1,1], pathPredecessorIndex = [-1,-1,-1,-1,-1], overallMaximumLength = 1, finalSubsequenceEndingIndex = 0
 *
 * currentIterationIndex = 1 (word "bt", group 0):
 *   priorIterationIndex = 0 (word "at", group 0): groups[1] == groups[0] (0==0), skip.
 *   longestSubsequenceEndingAtIndex = [1,1,1,1,1], overallMaximumLength = 1, finalSubsequenceEndingIndex = 0
 *
 * currentIterationIndex = 2 (word "tt", group 1):
 *   priorIterationIndex = 0 (word "at", group 0): groups[2]!=groups[0] (1!=0), checkHammingDistanceOne("tt","at") -> true (1 diff).
 *     longestSubsequenceEndingAtIndex[0]+1 (2) > longestSubsequenceEndingAtIndex[2] (1). Update: longestSubsequenceEndingAtIndex[2]=2, pathPredecessorIndex[2]=0.
 *   priorIterationIndex = 1 (word "bt", group 0): groups[2]!=groups[1] (1!=0), checkHammingDistanceOne("tt","bt") -> true (1 diff).
 *     longestSubsequenceEndingAtIndex[1]+1 (2) > longestSubsequenceEndingAtIndex[2] (2). False. No update.
 *   After loop: longestSubsequenceEndingAtIndex = [1,1,2,1,1], pathPredecessorIndex = [-1,-1,0,-1,-1].
 *   longestSubsequenceEndingAtIndex[2] (2) > overallMaximumLength (1). Update: overallMaximumLength = 2, finalSubsequenceEndingIndex = 2.
 *
 * currentIterationIndex = 3 (word "ad", group 1):
 *   priorIterationIndex = 0 (word "at", group 0): groups[3]!=groups[0] (1!=0), checkHammingDistanceOne("ad","at") -> true (1 diff).
 *     longestSubsequenceEndingAtIndex[0]+1 (2) > longestSubsequenceEndingAtIndex[3] (1). Update: longestSubsequenceEndingAtIndex[3]=2, pathPredecessorIndex[3]=0.
 *   priorIterationIndex = 1 (word "bt", group 0): groups[3]!=groups[1] (1!=0), checkHammingDistanceOne("ad","bt") -> false (2 diffs). Skip.
 *   priorIterationIndex = 2 (word "tt", group 1): groups[3] == groups[2] (1==1), skip.
 *   After loop: longestSubsequenceEndingAtIndex = [1,1,2,2,1], pathPredecessorIndex = [-1,-1,0,0,-1].
 *   longestSubsequenceEndingAtIndex[3] (2) > overallMaximumLength (2). False. No update.
 *
 * currentIterationIndex = 4 (word "zt", group 0):
 *   priorIterationIndex = 0 (word "at", group 0): groups[4] == groups[0] (0==0), skip.
 *   priorIterationIndex = 1 (word "bt", group 0): groups[4] == groups[1] (0==0), skip.
 *   priorIterationIndex = 2 (word "tt", group 1): groups[4]!=groups[2] (0!=1), checkHammingDistanceOne("zt","tt") -> true (1 diff).
 *     longestSubsequenceEndingAtIndex[2]+1 (3) > longestSubsequenceEndingAtIndex[4] (1). Update: longestSubsequenceEndingAtIndex[4]=3, pathPredecessorIndex[4]=2.
 *   priorIterationIndex = 3 (word "ad", group 1): groups[4]!=groups[3] (0!=1), checkHammingDistanceOne("zt","ad") -> false (2 diffs). Skip.
 *   After loop: longestSubsequenceEndingAtIndex = [1,1,2,2,3], pathPredecessorIndex = [-1,-1,0,0,2].
 *   longestSubsequenceEndingAtIndex[4] (3) > overallMaximumLength (2). Update: overallMaximumLength = 3, finalSubsequenceEndingIndex = 4.
 *
 * Reconstruction:
 * traversalIndex = 4 (finalSubsequenceEndingIndex)
 * 1. resultWordsCollection.push(words[4] -> "zt"). traversalIndex = pathPredecessorIndex[4] = 2.
 * 2. resultWordsCollection.push(words[2] -> "tt"). traversalIndex = pathPredecessorIndex[2] = 0.
 * 3. resultWordsCollection.push(words[0] -> "at"). traversalIndex = pathPredecessorIndex[0] = -1.
 * Loop ends. resultWordsCollection = ["zt", "tt", "at"].
 * Return resultWordsCollection.reverse() -> ["at", "tt", "zt"].
 * Time Complexity: O(N^2 * L)
 * Space Complexity: O(N * L)
 */
var getWordsInLongestSubsequence = function (wordsParameter, groupsParameter) {
  const totalInputLength = wordsParameter.length;

  if (totalInputLength === 0) {
    return [];
  }

  const longestSubsequenceEndingAtIndex = new Array(totalInputLength).fill(1);
  const pathPredecessorIndex = new Array(totalInputLength).fill(-1);

  let overallMaximumLength = 1;
  let finalSubsequenceEndingIndex = 0;

  for (
    let currentIterationIndex = 1;
    currentIterationIndex < totalInputLength;
    currentIterationIndex++
  ) {
    for (
      let priorIterationIndex = 0;
      priorIterationIndex < currentIterationIndex;
      priorIterationIndex++
    ) {
      const groupsAreDifferent =
        groupsParameter[currentIterationIndex] !==
        groupsParameter[priorIterationIndex];
      const wordsAreOneHammingDistance = checkHammingDistanceOne(
        wordsParameter[currentIterationIndex],
        wordsParameter[priorIterationIndex],
      );

      if (groupsAreDifferent && wordsAreOneHammingDistance) {
        const candidateLength =
          longestSubsequenceEndingAtIndex[priorIterationIndex] + 1;
        if (
          candidateLength >
          longestSubsequenceEndingAtIndex[currentIterationIndex]
        ) {
          longestSubsequenceEndingAtIndex[currentIterationIndex] =
            candidateLength;
          pathPredecessorIndex[currentIterationIndex] = priorIterationIndex;
        }
      }
    }

    if (
      longestSubsequenceEndingAtIndex[currentIterationIndex] >
      overallMaximumLength
    ) {
      overallMaximumLength =
        longestSubsequenceEndingAtIndex[currentIterationIndex];
      finalSubsequenceEndingIndex = currentIterationIndex;
    }
  }

  const resultWordsCollection = [];
  let traversalIndex = finalSubsequenceEndingIndex;
  while (traversalIndex !== -1) {
    resultWordsCollection.push(wordsParameter[traversalIndex]);
    traversalIndex = pathPredecessorIndex[traversalIndex];
  }

  return resultWordsCollection.reverse();

  function checkHammingDistanceOne(firstStringToCheck, secondStringToCheck) {
    if (firstStringToCheck.length !== secondStringToCheck.length) {
      return false;
    }

    let totalDifferencesCount = 0;
    const stringLengthForComparison = firstStringToCheck.length;

    for (
      let characterPosition = 0;
      characterPosition < stringLengthForComparison;
      characterPosition++
    ) {
      if (
        firstStringToCheck[characterPosition] !==
        secondStringToCheck[characterPosition]
      ) {
        totalDifferencesCount++;
        if (totalDifferencesCount > 1) {
          return false;
        }
      }
    }
    return totalDifferencesCount === 1;
  }
};
