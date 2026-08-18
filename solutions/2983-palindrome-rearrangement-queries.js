/**
 * Palindrome Rearrangement Queries
 * Intuition: After one rearrangement of each half-range in a query, the string can become a palindrome only if every unmatched pair outside those ranges is already equal, and the letters we are allowed to rearrange on the left can be matched with those on the right.
 * Approach: 1. Build prefix mirroredDiffs so mirroredDiffs[i] is how many of the first i left-half positions differ from their right-half mirrors. 2. Build prefix letter counts for the whole string. 3. For each query, treat ranges as half-open [a, b) and [c, d) and reflect them onto the opposite half. 4. Reject the query if any unmatched pair lies completely outside both a rearrangeable range and its reflection. 5. Subtract the letters that must stay fixed from each range's frequency vector; accept if both leftover frequency vectors are non-negative and equal.
 * Dry Run: s = "abcabc", queries = [[1, 1, 3, 5], [0, 2, 5, 5]]
 *   1. n = 6. mirroredDiffs = [0, 1, 1, 2] from pairs (0,5), (1,4), (2,3).
 *   2. First query can rearrange s[3..5] into "cba", making "abccba".
 *   3. Second query can rearrange s[0..2] into "cba", making "cbaabc". Both are true.
 * Time Complexity: O(n + q)
 * Space Complexity: O(n)
 */
var canMakePalindromeQueries = function (s, queries) {
  const stringLength = s.length;

  const subtractArrays = (leftCounts, rightCounts) => {
    const difference = [];
    for (let letterIndex = 0; letterIndex < leftCounts.length; letterIndex++) {
      difference.push(leftCounts[letterIndex] - rightCounts[letterIndex]);
    }
    return difference;
  };

  const getMirroredDiffs = (text) => {
    const diffs = [0];
    for (let leftIndex = 0, rightIndex = text.length - 1; leftIndex < rightIndex; leftIndex++, rightIndex--) {
      diffs.push(diffs[diffs.length - 1] + (text[leftIndex] !== text[rightIndex] ? 1 : 0));
    }
    return diffs;
  };

  const getCounts = (text) => {
    const runningCount = new Array(26).fill(0);
    const prefixCounts = [runningCount.slice()];
    for (const character of text) {
      runningCount[character.charCodeAt(0) - 97]++;
      prefixCounts.push(runningCount.slice());
    }
    return prefixCounts;
  };

  const allNonNegative = (frequencies) => {
    for (const frequency of frequencies) {
      if (frequency < 0) return false;
    }
    return true;
  };

  const arraysEqual = (leftCounts, rightCounts) => {
    for (let letterIndex = 0; letterIndex < leftCounts.length; letterIndex++) {
      if (leftCounts[letterIndex] !== rightCounts[letterIndex]) return false;
    }
    return true;
  };

  const mirroredDiffs = getMirroredDiffs(s);
  const counts = getCounts(s);
  const answers = [];

  for (const query of queries) {
    const a = query[0];
    const b = query[1] + 1;
    const c = query[2];
    const d = query[3] + 1;
    const reflectedA = stringLength - a;
    const reflectedB = stringLength - b;
    const reflectedC = stringLength - c;
    const reflectedD = stringLength - d;

    if (
      (Math.min(a, reflectedD) > 0 && mirroredDiffs[Math.min(a, reflectedD)] > 0) ||
      (stringLength / 2 > Math.max(b, reflectedC) &&
        mirroredDiffs[stringLength / 2] - mirroredDiffs[Math.max(b, reflectedC)] > 0) ||
      (reflectedD > b && mirroredDiffs[reflectedD] - mirroredDiffs[b] > 0) ||
      (a > reflectedC && mirroredDiffs[a] - mirroredDiffs[reflectedC] > 0)
    ) {
      answers.push(false);
      continue;
    }

    let leftRangeCount = subtractArrays(counts[b], counts[a]);
    let rightRangeCount = subtractArrays(counts[d], counts[c]);
    if (a > reflectedD) {
      rightRangeCount = subtractArrays(
        rightRangeCount,
        subtractArrays(counts[Math.min(a, reflectedC)], counts[reflectedD])
      );
    }
    if (reflectedC > b) {
      rightRangeCount = subtractArrays(
        rightRangeCount,
        subtractArrays(counts[reflectedC], counts[Math.max(b, reflectedD)])
      );
    }
    if (c > reflectedB) {
      leftRangeCount = subtractArrays(
        leftRangeCount,
        subtractArrays(counts[Math.min(c, reflectedA)], counts[reflectedB])
      );
    }
    if (reflectedA > d) {
      leftRangeCount = subtractArrays(
        leftRangeCount,
        subtractArrays(counts[reflectedA], counts[Math.max(d, reflectedB)])
      );
    }

    answers.push(
      allNonNegative(leftRangeCount) &&
        allNonNegative(rightRangeCount) &&
        arraysEqual(leftRangeCount, rightRangeCount)
    );
  }

  return answers;
};
