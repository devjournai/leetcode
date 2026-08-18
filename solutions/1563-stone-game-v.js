/**
 * Stone Game V
 * Intuition: The problem describes a game where Alice makes choices to maximize her score by splitting a row of stones. Bob's actions depend on the sums of the two resulting rows. This dynamic choice and optimal strategy suggest a dynamic programming approach, specifically memoization for overlapping subproblems.
 * Approach: 1. Precompute prefix sums of the stone values to efficiently calculate the sum of any sub-array. 2. Define a recursive function `calculateMaxScore(startPosition, endPosition)` that returns the maximum score Alice can obtain from the stones between `startPosition` and `endPosition` (inclusive). 3. Use a 2D array `memo` to store the results of `calculateMaxScore(startPosition, endPosition)` to avoid redundant computations (memoization). 4. In `calculateMaxScore`, iterate through all possible split points `divisionPoint` within the current range. For each split, calculate the sums of the left and right segments. 5. Apply the game rules: if sums are unequal, Bob discards the larger sum, and Alice adds the smaller sum to her score and continues the game with the remaining segment. If sums are equal, Alice chooses the continuation that yields a higher total score. 6. Alice chooses the split point that maximizes her total score.
 * Dry Run: stoneValue = [6,2,3,4,5,5]
 * n = 6
 * cumulativeSums = [0, 6, 8, 11, 15, 20, 25]
 *
 * calculateMaxScore(0, 5)
 * memo initialized to -1
 *
 * Loop divisionPoint from 0 to 4:
 *
 * divisionPoint = 0:
 *   leftSegment = [6], rightSegment = [2,3,4,5,5]
 *   leftSegmentSum = cumulativeSums[1] - cumulativeSums[0] = 6 - 0 = 6
 *   rightSegmentSum = cumulativeSums[6] - cumulativeSums[1] = 25 - 6 = 19
 *   leftSegmentSum < rightSegmentSum
 *   currentIterationScore = leftSegmentSum + calculateMaxScore(0, 0)
 *                       = 6 + 0 = 6
 *   maxAchievedScore = max(0, 6) = 6
 *
 * divisionPoint = 1:
 *   leftSegment = [6,2], rightSegment = [3,4,5,5]
 *   leftSegmentSum = cumulativeSums[2] - cumulativeSums[0] = 8 - 0 = 8
 *   rightSegmentSum = cumulativeSums[6] - cumulativeSums[2] = 25 - 8 = 17
 *   leftSegmentSum < rightSegmentSum
 *   currentIterationScore = leftSegmentSum + calculateMaxScore(0, 1)
 *                       = 8 + calculateMaxScore(0, 1)
 *   calculateMaxScore(0, 1):
 *     Base case startPosition >= endPosition returns 0.
 *     divisionPoint = 0:
 *       ls = [6], rs = [2]
 *       lsSum = 6, rsSum = 2
 *       lsSum > rsSum
 *       score = rsSum + calculateMaxScore(1, 1) = 2 + 0 = 2
 *     memo[0][1] = 2. Returns 2.
 *   currentIterationScore = 8 + 2 = 10
 *   maxAchievedScore = max(6, 10) = 10
 *
 * divisionPoint = 2:
 *   leftSegment = [6,2,3], rightSegment = [4,5,5]
 *   leftSegmentSum = cumulativeSums[3] - cumulativeSums[0] = 11 - 0 = 11
 *   rightSegmentSum = cumulativeSums[6] - cumulativeSums[3] = 25 - 11 = 14
 *   leftSegmentSum < rightSegmentSum
 *   currentIterationScore = leftSegmentSum + calculateMaxScore(0, 2)
 *                       = 11 + calculateMaxScore(0, 2)
 *   calculateMaxScore(0, 2):
 *     divisionPoint = 0:
 *       ls = [6], rs = [2,3]
 *       lsSum = 6, rsSum = 5
 *       lsSum > rsSum
 *       score = rsSum + calculateMaxScore(1, 2)
 *           calculateMaxScore(1,2):
 *             divisionPoint = 1:
 *               ls = [2], rs = [3]
 *               lsSum = 2, rsSum = 3
 *               lsSum < rsSum
 *               score = lsSum + calculateMaxScore(1, 1) = 2 + 0 = 2
 *             memo[1][2] = 2. Returns 2.
 *           score = 5 + 2 = 7
 *       maxAchievedScore = 7
 *     divisionPoint = 1:
 *       ls = [6,2], rs = [3]
 *       lsSum = 8, rsSum = 3
 *       lsSum > rsSum
 *       score = rsSum + calculateMaxScore(2, 2) = 3 + 0 = 3
 *       maxAchievedScore = max(7, 3) = 7
 *     memo[0][2] = 7. Returns 7.
 *   currentIterationScore = 11 + 7 = 18
 *   maxAchievedScore = max(10, 18) = 18
 *
 * ... The process continues, exploring all splits and memoizing subproblem results.
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^2)
 */
var stoneGameV = function (stoneValue) {
  const stoneCount = stoneValue.length;
  const cumulativeSums = Array.from({ length: stoneCount + 1 }, () => 0);

  for (let segmentIndex = 0; segmentIndex < stoneCount; segmentIndex++) {
    cumulativeSums[segmentIndex + 1] =
      cumulativeSums[segmentIndex] + stoneValue[segmentIndex];
  }

  const memo = Array.from({ length: stoneCount }, () =>
    new Array(stoneCount).fill(-1),
  );

  function calculateMaxScore(startPosition, endPosition) {
    if (startPosition >= endPosition) {
      return 0;
    }
    if (memo[startPosition][endPosition] !== -1) {
      return memo[startPosition][endPosition];
    }

    let maxAchievedScore = 0;

    for (
      let divisionPoint = startPosition;
      divisionPoint < endPosition;
      divisionPoint++
    ) {
      const leftSegmentSum =
        cumulativeSums[divisionPoint + 1] - cumulativeSums[startPosition];
      const rightSegmentSum =
        cumulativeSums[endPosition + 1] - cumulativeSums[divisionPoint + 1];

      let currentIterationScore;
      if (leftSegmentSum === rightSegmentSum) {
        const scoreFromKeepingLeft =
          leftSegmentSum + calculateMaxScore(startPosition, divisionPoint);
        const scoreFromKeepingRight =
          rightSegmentSum + calculateMaxScore(divisionPoint + 1, endPosition);
        currentIterationScore = Math.max(
          scoreFromKeepingLeft,
          scoreFromKeepingRight,
        );
      } else if (leftSegmentSum > rightSegmentSum) {
        currentIterationScore =
          rightSegmentSum + calculateMaxScore(divisionPoint + 1, endPosition);
      } else {
        currentIterationScore =
          leftSegmentSum + calculateMaxScore(startPosition, divisionPoint);
      }
      maxAchievedScore = Math.max(maxAchievedScore, currentIterationScore);
    }

    memo[startPosition][endPosition] = maxAchievedScore;
    return maxAchievedScore;
  }

  return calculateMaxScore(0, stoneCount - 1);
};
