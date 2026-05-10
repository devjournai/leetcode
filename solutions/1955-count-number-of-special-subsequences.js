/**
 * Count Number Of Special Subsequences
 * Intuition: The problem requires counting subsequences of the form 0...01...12...2. This can be solved using dynamic programming by tracking the counts of subsequences ending in each required digit, building upon previous counts.
 * Approach: 1. Initialize four variables: `initialEmptySubseq` (representing the base case for starting a new '0' subsequence, value 1), `countZeroSubseq` (for subsequences of '0's), `countZeroOneSubseq` (for subsequences of '0's followed by '1's), and `countZeroOneTwoSubseq` (for special subsequences of '0's, '1's, and '2's). All counts are initialized to 0, except `initialEmptySubseq` set to 1. A `modulusVal` is also defined for modulo operations.
 * 2. Iterate through each `inputNumber` in the given `nums` array.
 * 3. If `inputNumber` is 0: The count of subsequences ending in '0' (`countZeroSubseq`) is updated. New '0' subsequences are formed by considering the current '0' as a standalone subsequence (contributing `initialEmptySubseq`). Additionally, for every existing '0' subsequence, we have two choices: either include the current '0' or not. This effectively doubles the count of existing '0' subsequences. So, `countZeroSubseq = (2 * countZeroSubseq + initialEmptySubseq) % modulusVal`.
 * 4. If `inputNumber` is 1: The count of subsequences ending in '01' (`countZeroOneSubseq`) is updated. New '01' subsequences are formed by appending the current '1' to any existing '0' subsequence (contributing `countZeroSubseq`). Similar to step 3, for every existing '01' subsequence, we double its count to account for including or not including the current '1'. So, `countZeroOneSubseq = (2 * countZeroOneSubseq + countZeroSubseq) % modulusVal`.
 * 5. If `inputNumber` is 2: The count of special subsequences (`countZeroOneTwoSubseq`) is updated. New special subsequences are formed by appending the current '2' to any existing '01' subsequence (contributing `countZeroOneSubseq`). For every existing special subsequence, its count is doubled due to the choice of including or not including the current '2'. So, `countZeroOneTwoSubseq = (2 * countZeroOneTwoSubseq + countZeroOneSubseq) % modulusVal`.
 * 6. After iterating through all numbers, `countZeroOneTwoSubseq` will contain the total number of different special subsequences modulo `10^9 + 7`.
 * Dry Run: nums = [0, 1, 2, 0]
 * modulusVal = 1e9 + 7
 * initialEmptySubseq = 1
 * countZeroSubseq = 0
 * countZeroOneSubseq = 0
 * countZeroOneTwoSubseq = 0
 *
 * 1. inputNumber = 0:
 *    countZeroSubseq = (2 * 0 + 1) % modulusVal = 1
 *    (Subsequences of 0s: {[0] (using index 0)})
 *
 * 2. inputNumber = 1:
 *    countZeroOneSubseq = (2 * 0 + 1) % modulusVal = 1
 *    (Subsequences of 01s: {[0,1] (using indices 0,1)})
 *
 * 3. inputNumber = 2:
 *    countZeroOneTwoSubseq = (2 * 0 + 1) % modulusVal = 1
 *    (Special subsequences: {[0,1,2] (using indices 0,1,2)})
 *
 * 4. inputNumber = 0:
 *    countZeroSubseq = (2 * 1 + 1) % modulusVal = 3
 *    (Subsequences of 0s: {[0] (idx 0), [0] (idx 3), [0,0] (idx 0,3)})
 *
 * Final return: countZeroOneTwoSubseq = 1
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var countSpecialSubsequences = function (nums) {
  const modulusVal = 1000000007;

  let countZeroSubseq = 0;
  let countZeroOneSubseq = 0;
  let countZeroOneTwoSubseq = 0;
  let initialEmptySubseq = 1;

  for (const inputNumber of nums) {
    if (inputNumber === 0) {
      countZeroSubseq = (2 * countZeroSubseq + initialEmptySubseq) % modulusVal;
    } else if (inputNumber === 1) {
      countZeroOneSubseq =
        (2 * countZeroOneSubseq + countZeroSubseq) % modulusVal;
    } else if (inputNumber === 2) {
      countZeroOneTwoSubseq =
        (2 * countZeroOneTwoSubseq + countZeroOneSubseq) % modulusVal;
    }
  }

  return countZeroOneTwoSubseq;
};
