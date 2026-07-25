/**
 * Shortest String That Contains Three Strings
 *
 * Intuition:
 * Since there are only three strings, we can try all 3! = 6 possible
 * orders in which they can be merged.
 *
 * For two strings x and y:
 *
 * 1. If x already contains y, the merged result is simply x.
 *
 * 2. Otherwise, find the largest suffix of x that matches a prefix of y.
 *    We only need to append the remaining part of y.
 *
 * Example:
 *
 *      x = "abc"
 *      y = "bca"
 *
 * Largest overlap:
 *
 *      "bc"
 *
 * Result:
 *
 *      "abca"
 *
 * For every permutation of [a, b, c], merge the first two strings,
 * then merge the result with the third string.
 *
 * Among all candidates:
 *
 *      • Choose the shortest string.
 *      • If lengths are equal, choose the lexicographically smallest.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Create a helper merge(x, y).
 *
 *      • If x.includes(y), return x.
 *
 *      • Otherwise, try every possible overlap length from the maximum
 *        possible length down to 1.
 *
 *      • If:
 *
 *            suffix(x, len) === prefix(y, len)
 *
 *        return:
 *
 *            x + remaining part of y
 *
 *      • If there is no overlap:
 *
 *            return x + y
 *
 * 2. Store the three strings in an array.
 *
 * 3. Try all six permutations:
 *
 *      [0,1,2]
 *      [0,2,1]
 *      [1,0,2]
 *      [1,2,0]
 *      [2,0,1]
 *      [2,1,0]
 *
 * 4. For each permutation:
 *
 *      candidate = merge(
 *          merge(first, second),
 *          third
 *      )
 *
 * 5. Update the answer if:
 *
 *      • candidate is shorter, or
 *      • lengths are equal and candidate is lexicographically smaller.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * a = "ab"
 * b = "ba"
 * c = "aba"
 *
 * Consider:
 *
 *      merge("ab", "ba")
 *
 * overlap = "b"
 *
 * result = "aba"
 *
 * Now:
 *
 *      merge("aba", "aba")
 *
 * "aba" already contains "aba".
 *
 * result = "aba"
 *
 * Therefore:
 *
 *      answer = "aba"
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(L²)
 * Space Complexity: O(L)
 */

var minimumString = function (a, b, c) {
  const merge = (x, y) => {
    if (x.includes(y)) {
      return x;
    }

    const maxOverlap = Math.min(x.length, y.length);

    for (let len = maxOverlap; len >= 1; len--) {
      if (x.slice(x.length - len) === y.slice(0, len)) {
        return x + y.slice(len);
      }
    }

    return x + y;
  };

  const strings = [a, b, c];

  const permutations = [
    [0, 1, 2],
    [0, 2, 1],
    [1, 0, 2],
    [1, 2, 0],
    [2, 0, 1],
    [2, 1, 0],
  ];

  let answer = null;

  for (const [i, j, k] of permutations) {
    const candidate = merge(merge(strings[i], strings[j]), strings[k]);

    if (
      answer === null ||
      candidate.length < answer.length ||
      (candidate.length === answer.length && candidate < answer)
    ) {
      answer = candidate;
    }
  }

  return answer;
};
