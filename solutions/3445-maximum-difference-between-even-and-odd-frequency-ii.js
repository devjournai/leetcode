/**
 * Maximum Difference Between Even and Odd Frequency II
 * Intuition: For a window, freq(a) should be odd and freq(b) even, maximizing freq(a)-freq(b). Track prefix counts and the minimum prefix difference of each parity pair while the window stays length >= k and both letters appear.
 * Approach: 1. Try every ordered pair of digits a,b. 2. Maintain prefix counts of a and b. 3. Slide the left pointer once those counts are positive and the window is long enough, storing min (prefixA-prefixB) by parities. 4. Candidate is current (A-B) minus minDiff of opposite A-parity and same B-parity.
 * Dry Run: s = "12233", k = 4. Pair a='3', b='2' on the whole string: 3 appears twice (even, skip) vs 3 once and 2 twice on a suffix — the parity DP yields 1.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var maxDifference = function (s, k) {
  let answer = Number.NEGATIVE_INFINITY;
  const digits = ["0", "1", "2", "3", "4"];

  for (const a of digits) {
    for (const b of digits) {
      if (a === b) {
        continue;
      }
      const minDiff = [
        [Infinity, Infinity],
        [Infinity, Infinity],
      ];
      const prefixA = [0];
      const prefixB = [0];
      let left = 0;
      for (let right = 0; right < s.length; right++) {
        prefixA.push(prefixA[prefixA.length - 1] + (s[right] === a ? 1 : 0));
        prefixB.push(prefixB[prefixB.length - 1] + (s[right] === b ? 1 : 0));
        while (
          right - left + 1 >= k &&
          prefixA[left] < prefixA[prefixA.length - 1] &&
          prefixB[left] < prefixB[prefixB.length - 1]
        ) {
          const parityA = prefixA[left] % 2;
          const parityB = prefixB[left] % 2;
          minDiff[parityA][parityB] = Math.min(
            minDiff[parityA][parityB],
            prefixA[left] - prefixB[left]
          );
          left++;
        }
        const currentA = prefixA[prefixA.length - 1];
        const currentB = prefixB[prefixB.length - 1];
        answer = Math.max(
          answer,
          currentA - currentB - minDiff[1 - (currentA % 2)][currentB % 2]
        );
      }
    }
  }

  return answer;
};
