/**
 * Maximize Active Section with Trade
 *
 * Intuition:
 * We first count the number of active sections ('1's) already present.
 *
 * To simplify handling edge cases, prepend and append a '1' to the string:
 *
 *      t = "1" + s + "1"
 *
 * Then split the string into consecutive blocks of equal characters.
 *
 * Example:
 *
 *      s = "010100"
 *
 *      t = "10101001"
 *
 *      Blocks:
 *
 *      1(1), 0(1), 1(1), 0(1), 1(1), 0(2), 1(1)
 *
 * Let
 *
 *      L = lengths of zero blocks
 *      W = lengths of internal one blocks
 *
 * A trade removes one internal block of ones and then turns one surrounded
 * zero block into ones.
 *
 * For every adjacent pair of zero blocks:
 *
 *      L[i]  W[i]  L[i+1]
 *
 * we have two possibilities:
 *
 * 1. Merge the two adjacent zero blocks by removing W[i].
 *
 *      gain = L[i] + L[i+1]
 *
 * 2. Remove W[i] but activate another larger zero block elsewhere.
 *
 *      gain = maxOtherZeroBlock - W[i]
 *
 * We compute both possibilities and keep the maximum gain.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Count the initial number of '1's.
 *
 * 2. Add sentinel '1's at both ends.
 *
 * 3. Run-length encode the string into blocks.
 *
 * 4. Build:
 *
 *      L -> zero block lengths
 *      W -> internal one block lengths
 *
 * 5. Build:
 *
 *      prefMax[i]
 *          Maximum zero block length from left.
 *
 *      suffMax[i]
 *          Maximum zero block length from right.
 *
 * 6. For every internal one block:
 *
 *      gain =
 *      max(
 *          L[i] + L[i+1],
 *          maxOtherZeroBlock - W[i]
 *      )
 *
 * 7. Maximum active sections:
 *
 *      initialOnes + maxGain
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * s = "010100"
 *
 * initialOnes = 2
 *
 * Blocks:
 *
 *      1
 *      0
 *      1
 *      0
 *      1
 *      00
 *      1
 *
 * L = [1,1,2]
 * W = [1,1]
 *
 * i = 0
 *
 * Merge:
 *
 *      1 + 1 = 2
 *
 * Other block:
 *
 *      2 - 1 = 1
 *
 * Gain = 2
 *
 * i = 1
 *
 * Merge:
 *
 *      1 + 2 = 3
 *
 * Gain = 3
 *
 * Answer:
 *
 *      2 + 3 = 5
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var maxActiveSectionsAfterTrade = function (s) {
  let initialOnes = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "1") {
      initialOnes++;
    }
  }

  const t = "1" + s + "1";

  const L = [];
  const W = [];

  const blocks = [];

  let count = 1;

  for (let i = 1; i < t.length; i++) {
    if (t[i] === t[i - 1]) {
      count++;
    } else {
      blocks.push({
        char: t[i - 1],
        len: count,
      });
      count = 1;
    }
  }

  blocks.push({
    char: t[t.length - 1],
    len: count,
  });

  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].char === "0") {
      L.push(blocks[i].len);
    } else if (i > 0 && i < blocks.length - 1) {
      W.push(blocks[i].len);
    }
  }

  const m = L.length;

  if (m <= 1) {
    return initialOnes;
  }

  const prefMax = new Int32Array(m);
  const suffMax = new Int32Array(m);

  prefMax[0] = L[0];

  for (let i = 1; i < m; i++) {
    prefMax[i] = Math.max(prefMax[i - 1], L[i]);
  }

  suffMax[m - 1] = L[m - 1];

  for (let i = m - 2; i >= 0; i--) {
    suffMax[i] = Math.max(suffMax[i + 1], L[i]);
  }

  let maxGain = 0;

  for (let i = 0; i < m - 1; i++) {
    let maxOther = -Infinity;

    if (i > 0) {
      maxOther = Math.max(maxOther, prefMax[i - 1]);
    }

    if (i + 2 < m) {
      maxOther = Math.max(maxOther, suffMax[i + 2]);
    }

    const gain = Math.max(L[i] + L[i + 1], maxOther - W[i]);

    maxGain = Math.max(maxGain, gain);
  }

  return initialOnes + maxGain;
};
