/**
 * Longest Duplicate Substring
 * Intuition: If a duplicate of length L exists, shorter ones do too. Binary search L and Rabin-Karp rolling hashes to find a repeated substring of that length.
 * Approach: 1. Binary search length in 1..n-1. 2. For mid, roll a base-26 hash modulo 1e9+7, map hash -> start indices. 3. On hash collision, compare actual slices; return the string if equal. 4. Search higher if found, else lower. Keep the longest hit.
 * Dry Run: s = "banana".
 *   - Length 3 candidate "ana" appears twice. Longer 4 fails. Answer "ana".
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var longestDupSubstring = function (s) {
  const primeModuloValue = 1000000007;
  const radixBase = 26;
  let searchRangeLower = 1;
  let searchRangeUpper = s.length - 1;
  let finalLongestDuplicate = "";

  for (; searchRangeLower <= searchRangeUpper;) {
    const currentMidpointLength = Math.floor(
      (searchRangeLower + searchRangeUpper) / 2
    );
    const foundSubstringCandidate = checkDuplicationExistence(
      currentMidpointLength
    );

    if (foundSubstringCandidate) {
      finalLongestDuplicate = foundSubstringCandidate;
      searchRangeLower = currentMidpointLength + 1;
    } else {
      searchRangeUpper = currentMidpointLength - 1;
    }
  }

  return finalLongestDuplicate;

  function checkDuplicationExistence(testedLength) {
    if (testedLength === 0) {
      return "";
    }

    let rollingHashValue = 0;
    const hashToStartIndices = new Map();
    let powerFactor = 1;
    const inputStringLength = s.length;

    for (
      let powerCalcCounter = 0;
      powerCalcCounter < testedLength - 1;
      powerCalcCounter++
    ) {
      powerFactor = (powerFactor * radixBase) % primeModuloValue;
    }

    for (
      let initialSegmentIndex = 0;
      initialSegmentIndex < testedLength;
      initialSegmentIndex++
    ) {
      rollingHashValue =
        (rollingHashValue * radixBase +
          (s.charCodeAt(initialSegmentIndex) - 97)) %
        primeModuloValue;
    }

    hashToStartIndices.set(rollingHashValue, [0]);

    for (
      let windowIterator = 1;
      windowIterator <= inputStringLength - testedLength;
      windowIterator++
    ) {
      const charRemovedVal = s.charCodeAt(windowIterator - 1) - 97;
      rollingHashValue =
        (rollingHashValue -
          ((charRemovedVal * powerFactor) % primeModuloValue) +
          primeModuloValue) %
        primeModuloValue;

      const charAddedVal = s.charCodeAt(windowIterator + testedLength - 1) - 97;
      rollingHashValue =
        (rollingHashValue * radixBase + charAddedVal) % primeModuloValue;

      if (hashToStartIndices.has(rollingHashValue)) {
        const storedIndicesList = hashToStartIndices.get(rollingHashValue);
        const substringBeingChecked = s.slice(
          windowIterator,
          windowIterator + testedLength
        );

        for (
          let storedPositionIndex = 0;
          storedPositionIndex < storedIndicesList.length;
          storedPositionIndex++
        ) {
          const previousSubstringStart = storedIndicesList[storedPositionIndex];
          const comparedSubstring = s.slice(
            previousSubstringStart,
            previousSubstringStart + testedLength
          );
          if (comparedSubstring === substringBeingChecked) {
            return substringBeingChecked;
          }
        }
        storedIndicesList.push(windowIterator);
      } else {
        hashToStartIndices.set(rollingHashValue, [windowIterator]);
      }
    }
    return "";
  }
};
