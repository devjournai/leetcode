/**
 * Maximum Number of Subsequences After One Inserting
 * Intuition: Count "LCT" subsequences in s, then the best single insert is L at the front, C at the max L-before * T-after index, or T at the end.
 * Approach: 1. Current LCT count via prefix L * suffix T at each C. 2. Best C-insert is max prefixL * suffixT over positions. 3. Best L-insert = count of "CT"; best T-insert = count of "LC". 4. Add the max of those three to the original count.
 * Dry Run: s = "LCT" already 1; inserting C between L and T adds 1 more via L*T=1.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var numOfSubsequences = function (s) {
  const countPair = (first, second) => {
    let pairs = 0;
    let firstCount = 0;
    for (const character of s) {
      if (character === second) {
        pairs += firstCount;
      }
      if (character === first) {
        firstCount++;
      }
    }
    return pairs;
  };

  let suffixT = 0;
  for (const character of s) {
    if (character === "T") {
      suffixT++;
    }
  }

  let prefixL = 0;
  let original = 0;
  let bestCInsert = 0;
  for (const character of s) {
    if (character === "T") {
      suffixT--;
    }
    if (character === "C") {
      original += prefixL * suffixT;
    }
    if (character === "L") {
      prefixL++;
    }
    bestCInsert = Math.max(bestCInsert, prefixL * suffixT);
  }

  const extra = Math.max(bestCInsert, countPair("L", "C"), countPair("C", "T"));
  return original + extra;
};
