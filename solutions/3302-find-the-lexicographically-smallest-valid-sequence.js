/**
 * Find the Lexicographically Smallest Valid Sequence
 *
 * Intuition:
 * We need to select indices from `word1` so that the selected
 * characters form a string that differs from `word2` by at most
 * one character.
 *
 * We also need the INDEX ARRAY to be lexicographically smallest.
 *
 * ------------------------------------------------------------
 *
 * Important Observation:
 *
 * We are allowed at most ONE mismatch.
 *
 * Therefore, while scanning word1 from left to right:
 *
 * 1. If word1[i] === word2[j]
 *    -> Always take it.
 *
 * 2. If word1[i] !== word2[j]
 *    -> We can use this position as our one allowed mismatch,
 *       BUT only if the remaining part of word2 can still be
 *       matched exactly.
 *
 * The second condition is the important part.
 *
 * ------------------------------------------------------------
 *
 * How do we know whether the remaining part can be matched?
 *
 * We scan word1 from RIGHT to LEFT first.
 *
 * `last[j]` stores the latest/leftmost useful position in word1
 * that can match word2[j] while continuing the remaining suffix.
 *
 * In other words:
 *
 *     last[j] = position where word2[j] can be matched
 *               when building the suffix from right to left.
 *
 * This allows us to check:
 *
 *     Can I use the current index as the one mismatch?
 *
 * If we choose word1[i] for word2[j] as a mismatch,
 * then word2[j + 1] must be matchable at some index > i.
 *
 * So we require:
 *
 *     i < last[j + 1]
 *
 * ------------------------------------------------------------
 *
 * Greedy:
 *
 * Scan word1 from left to right.
 *
 * For every character:
 *
 *     if it matches word2[j]:
 *         take it.
 *
 *     else if we still have the mismatch available
 *     AND the rest can be matched:
 *         take it as the mismatch.
 *
 * Because we scan from left to right and immediately take the
 * earliest valid index, the resulting index array is
 * lexicographically smallest.
 *
 * ------------------------------------------------------------
 *
 * Approach: 1. Scan word1 from right to left to fill last[j], the latest index that can match word2[j] as a suffix. 2. Scan left to right: take a match always; otherwise take a mismatch if the skip is still available and (this is the last character or i < last[j+1]). 3. Return the index array if word2 is fully covered, else [].
 *
 * Dry Run:
 *
 * word1 = "vbcca"
 * word2 = "abc"
 *
 * We need 3 indices.
 *
 * First scan from right to left:
 *
 * word2:
 *
 *     a b c
 *     0 1 2
 *
 * We find the suffix positions that can be matched.
 *
 * Then scan word1 from left to right:
 *
 * i = 0
 * word1[0] = 'v'
 * word2[0] = 'a'
 *
 * They don't match.
 *
 * But we can use our one mismatch here because
 * the remaining "bc" can be matched after index 0.
 *
 * Take index 0.
 *
 *     answer = [0]
 *     mismatch used = true
 *
 * i = 1
 * word1[1] = 'b'
 * word2[1] = 'b'
 *
 * Match.
 *
 *     answer = [0, 1]
 *
 * i = 2
 * word1[2] = 'c'
 * word2[2] = 'c'
 *
 * Match.
 *
 *     answer = [0, 1, 2]
 *
 * Answer:
 *
 *     [0, 1, 2]
 *
 * ------------------------------------------------------------
 *
 * Example 2:
 *
 * word1 = "bacdc"
 * word2 = "abc"
 *
 * We want:
 *
 *     a b c
 *
 * Scan:
 *
 * i = 0 -> 'b'
 *
 * Can't use it immediately because if we use it as the mismatch,
 * we would need to match "bc" afterwards, which isn't possible
 * in the required way for the lexicographically smallest answer.
 *
 * i = 1 -> 'a'
 *
 * Match:
 *
 *     answer = [1]
 *
 * i = 2 -> 'c'
 *
 * This can be used as the one mismatch for 'b'.
 *
 *     answer = [1, 2]
 *
 * i = 4 -> 'c'
 *
 * Match:
 *
 *     answer = [1, 2, 4]
 *
 * Therefore:
 *
 *     [1, 2, 4]
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(n + m)
 * Space Complexity: O(m)
 */
var validSequence = function (word1, word2) {
  const n = word1.length;
  const m = word2.length;

  const answer = new Array(m);
  const last = new Array(m).fill(-1);

  let i = n - 1;
  let j = m - 1;

  while (i >= 0 && j >= 0) {
    if (word1[i] === word2[j]) {
      last[j] = i;
      j--;
    }

    i--;
  }

  let canSkip = true;
  j = 0;
  for (i = 0; i < n; i++) {
    if (j === m) {
      break;
    }

    if (word1[i] === word2[j]) {
      answer[j] = i;
      j++;
    } else if (canSkip && (j === m - 1 || i < last[j + 1])) {
      answer[j] = i;
      j++;
      canSkip = false;
    }
  }

  return j === m ? answer : [];
};
