/**
 * Decremental String Concatenation
 *
 * Intuition:
 * The exact middle of the constructed string never matters.
 *
 * Only three things affect future joins:
 *
 * • first character
 * • last character
 * • current total length
 *
 * Therefore, use Dynamic Programming where the state is determined by:
 *
 *      (index,
 *       first character,
 *       last character)
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * Let
 *
 *      dfs(i, first, last)
 *
 * be the minimum additional length needed after processing words[i...].
 *
 * The current string already has:
 *
 *      first character = first
 *      last character  = last
 *
 * For word i there are two choices:
 *
 * ------------------------------------------------
 *
 * 1. Append to the right
 *
 *      current + word
 *
 * Increase:
 *
 *      word.length
 *
 * If
 *
 *      last == word.first
 *
 * one character disappears.
 *
 * New boundary:
 *
 *      first
 *
 *      word.last
 *
 * ------------------------------------------------
 *
 * 2. Append to the left
 *
 *      word + current
 *
 * Increase:
 *
 *      word.length
 *
 * If
 *
 *      word.last == first
 *
 * one character disappears.
 *
 * New boundary:
 *
 *      word.first
 *
 *      last
 *
 * ------------------------------------------------
 *
 * Take the minimum of the two choices.
 *
 * Initial answer:
 *
 *      length(words[0])
 *      +
 *      dfs(...)
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * words =
 *
 * ["ab","bc"]
 *
 * Current:
 *
 * first = a
 *
 * last = b
 *
 * Append right:
 *
 * overlap:
 *
 * b == b
 *
 * add:
 *
 * 2 - 1 = 1
 *
 * Result length:
 *
 * 2 + 1 = 3
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N × 26 × 26)
 * Space Complexity: O(N × 26 × 26)
 */

var minimizeConcatenatedLength = function (words) {
  const n = words.length;

  const memo = new Map();

  const dfs = (index, first, last) => {
    if (index === n) {
      return 0;
    }

    const key = index + "," + first + "," + last;

    if (memo.has(key)) {
      return memo.get(key);
    }

    const word = words[index];

    const left = word.charCodeAt(0) - 97;
    const right = word.charCodeAt(word.length - 1) - 97;

    let costRight = word.length;

    if (last === left) {
      costRight--;
    }

    costRight += dfs(index + 1, first, right);

    let costLeft = word.length;

    if (right === first) {
      costLeft--;
    }

    costLeft += dfs(index + 1, left, last);

    const answer = Math.min(costLeft, costRight);

    memo.set(key, answer);

    return answer;
  };

  const first = words[0].charCodeAt(0) - 97;

  const last = words[0].charCodeAt(words[0].length - 1) - 97;

  return words[0].length + dfs(1, first, last);
};
