/**
 * Groups Of Special Equivalent Strings
 * Intuition: Even-index letters can be swapped among themselves, and odd-index letters among themselves. Two words are equivalent iff sorted even chars and sorted odd chars match.
 * Approach: 1. `createCanonicalString` buckets even/odd indices, sorts each bucket, joins as `even#odd`. 2. Insert every word's canonical form into a Set. 3. Return the set size.
 * Dry Run: words = ["abcd","cdab","cbad","xyzz","zzxy","zzyx"].
 *   - "abcd"/"cdab"/"cbad" share even {a,c} odd {b,d}. "xyzz"/"zzxy" share even xz odd yz. "zzyx" even zy odd zx — third group. Return 3.
 * Time Complexity: O(N * L log L)
 * Space Complexity: O(N * L)
 */
var numSpecialEquivGroups = function (inputWords) {
  const createCanonicalString = (targetWord) => {
    const evenCharacterBucket = [];
    const oddCharacterBucket = [];

    for (
      let iteratorIndex = 0;
      iteratorIndex < targetWord.length;
      iteratorIndex++
    ) {
      if (iteratorIndex % 2 === 0) {
        evenCharacterBucket.push(targetWord[iteratorIndex]);
      } else {
        oddCharacterBucket.push(targetWord[iteratorIndex]);
      }
    }

    evenCharacterBucket.sort();
    oddCharacterBucket.sort();

    const sortedEvenPart = evenCharacterBucket.join("");
    const sortedOddPart = oddCharacterBucket.join("");

    const combinedIdentifier = sortedEvenPart + "#" + sortedOddPart;
    return combinedIdentifier;
  };

  const canonicalRepresentations = new Set();

  for (const currentWord of inputWords) {
    const processedForm = createCanonicalString(currentWord);
    canonicalRepresentations.add(processedForm);
  }

  return canonicalRepresentations.size;
};
