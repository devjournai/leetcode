/**
 * Encode String With Shortest Length
 * Intuition: The shortest encoding of s[i..j] is either a concatenation of two shorter encodings, or `k[pattern]` when the slice is `pattern` repeated k times (and the pattern itself is already encoded). Fill increasing substring lengths so both options are available.
 * Approach: 1. `dpStore[i][j]` starts as the raw slice. 2. For each length then start, try every split: keep `left+right` if shorter. 3. For every `subpatternLen` dividing the length, check all tiles equal `foundPattern`; if so, candidate is `` `${repeatCount}[${dpStore[start][start+subpatternLen-1]}]` ``. 4. Return `dpStore[0][n-1]`.
 * Dry Run: s = "aaa".
 *   - Length 1: "a","a","a". Length 2: "aa" (repeat 2["a"] is "2[a]" length 4, keep "aa").
 *   - Length 3: "aaa" vs "a"+"aa" vs 3["a"] = "3[a]" length 4, keep "aaa". Return "aaa".
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^3)
 */
var encode = function (s) {
  const stringLength = s.length;
  const dpStore = Array.from({ length: stringLength }, () =>
    new Array(stringLength).fill("")
  );

  for (let subLength = 1; subLength <= stringLength; subLength++) {
    for (let startIdx = 0; startIdx <= stringLength - subLength; startIdx++) {
      const endIdx = startIdx + subLength - 1;
      const currentSubstr = s.slice(startIdx, endIdx + 1);

      dpStore[startIdx][endIdx] = currentSubstr;

      for (let partitionIdx = startIdx; partitionIdx < endIdx; partitionIdx++) {
        const leftPart = dpStore[startIdx][partitionIdx];
        const rightPart = dpStore[partitionIdx + 1][endIdx];
        const combinedPart = leftPart + rightPart;

        if (combinedPart.length < dpStore[startIdx][endIdx].length) {
          dpStore[startIdx][endIdx] = combinedPart;
        }
      }

      for (let subpatternLen = 1; subpatternLen < subLength; subpatternLen++) {
        if (subLength % subpatternLen === 0) {
          const foundPattern = s.slice(startIdx, startIdx + subpatternLen);
          const repeatCount = subLength / subpatternLen;

          let isRepeatable = true;
          for (
            let patternSegment = 1;
            patternSegment < repeatCount;
            patternSegment++
          ) {
            const nextSegmentStart = startIdx + patternSegment * subpatternLen;
            const nextSegmentEnd = nextSegmentStart + subpatternLen;
            if (s.slice(nextSegmentStart, nextSegmentEnd) !== foundPattern) {
              isRepeatable = false;
              break;
            }
          }

          if (isRepeatable) {
            const encodedVersion = `${repeatCount}[${dpStore[startIdx][startIdx + subpatternLen - 1]}]`;
            if (encodedVersion.length < dpStore[startIdx][endIdx].length) {
              dpStore[startIdx][endIdx] = encodedVersion;
            }
          }
        }
      }
    }
  }

  return dpStore[0][stringLength - 1];
};
