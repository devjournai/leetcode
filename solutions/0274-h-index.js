/**
 * H Index
 * Intuition: h is the largest h such that at least h papers have ≥ h citations. Bucket counts (citations ≥ n go in bin n) then scan h downward, accumulating papers until the count meets h.
 * Approach: 1. `citationFrequency` of size n+1. 2. For each citation, increment bin `min(c, n)`. 3. From h=n down to 0, add `citationFrequency[h]` into `papersWithAtLeastXCitations`; if that ≥ h, return h. 4. Return 0 if the loop never hits (unreachable for valid n).
 * Dry Run: citations = [3,0,6,1,5], n=5.
 *   - Bins: 0:1, 1:1, 3:1, 5:2 (6 and 5). Scan h=5 count=2<5; h=4 count=2<4; h=3 count=3≥3. Return 3.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var hIndex = function (citations) {
  const numPapers = citations.length;
  const citationFrequency = new Array(numPapers + 1).fill(0);

  for (const currentCitationValue of citations) {
    if (currentCitationValue >= numPapers) {
      citationFrequency[numPapers]++;
    } else {
      citationFrequency[currentCitationValue]++;
    }
  }

  let papersWithAtLeastXCitations = 0;
  for (
    let potentialHIndex = numPapers;
    potentialHIndex >= 0;
    potentialHIndex--
  ) {
    papersWithAtLeastXCitations += citationFrequency[potentialHIndex];
    if (papersWithAtLeastXCitations >= potentialHIndex) {
      return potentialHIndex;
    }
  }

  return 0;
};
