/**
 * Shortest Uncommon Substring In An Array
 * Intuition: To efficiently find the shortest uncommon substring for each string, we first pre-process all substrings from all input strings and record which original strings contain them. Then, for each original string, we iterate through its substrings by increasing length to find the first one that appears only in itself (and no other string).
 * Approach: 1. Create a `substringIndexMap` where keys are substrings and values are `Set`s of indices indicating which original strings contain that substring. 2. Populate `substringIndexMap` by iterating through all input strings, generating all their substrings, and adding the original string's index to the corresponding `Set` in the map. 3. Initialize `finalResultHolder` as an array of empty strings, matching the length of the input array. 4. Iterate `outerStringIndex` through each original string in `allInputStrings`. 5. For each `targetString`, initialize `currentMinLength` to infinity and `smallestUniqueSubstring` to an empty string. 6. Iterate `potentialLength` from 1 up to the `targetString`'s length. 7. Inside, iterate `potentialStart` from 0 to generate all substrings of `targetString` of `potentialLength`. 8. Extract `candidateSub`. 9. Retrieve `containingSet` from `substringIndexMap` for `candidateSub`. 10. Check if `containingSet.size` is 1 and `containingSet.has(outerStringIndex)` (this verifies `candidateSub` appears only in `targetString`). 11. If unique: a. If `potentialLength` is less than `currentMinLength`, update both `currentMinLength` and `smallestUniqueSubstring`. b. If `potentialLength` is equal to `currentMinLength` and `candidateSub` is lexicographically smaller than `smallestUniqueSubstring`, update `smallestUniqueSubstring`. 12. After checking all `potentialStart` for a given `potentialLength`, if `smallestUniqueSubstring` is no longer empty, it means we've found the shortest possible unique substring(s) at this length, so break from the `potentialLength` loop to maintain the shortest length guarantee. 13. Store `smallestUniqueSubstring` into `finalResultHolder` at `outerStringIndex`. 14. Return `finalResultHolder`.
 * Dry Run:
 * Input: allInputStrings = ["abc","bcd","abcd"]
 * stringCollectionSize = 3
 *
 * 1. Populate substringIndexMap:
 *    "a": {0, 2}, "b": {0, 1, 2}, "c": {0, 1, 2}, "d": {1, 2}
 *    "ab": {0, 2}, "bc": {0, 1, 2}, "cd": {1, 2}
 *    "abc": {0, 2}, "bcd": {1, 2}
 *    "abcd": {2}
 *
 * 2. finalResultHolder = ["","",""]
 *
 * 3. outerStringIndex = 0, targetString = "abc"
 *    currentMinLength = Infinity, smallestUniqueSubstring = ""
 *
 *    potentialLength = 1
 *      potentialStart = 0, candidateSub = "a"
 *        containingSet = {0}. size=1, has(0)=true. Unique.
 *        1 < Infinity => currentMinLength = 1, smallestUniqueSubstring = "a"
 *      potentialStart = 1, candidateSub = "b"
 *        containingSet = {0, 1, 2}. size=3. Not unique.
 *      potentialStart = 2, candidateSub = "c"
 *        containingSet = {0, 1, 2}. size=3. Not unique.
 *    smallestUniqueSubstring is "a" (not empty) => Break potentialLength loop.
 *    finalResultHolder[0] = "a" -> ["a","",""]
 *
 * 4. outerStringIndex = 1, targetString = "bcd"
 *    currentMinLength = Infinity, smallestUniqueSubstring = ""
 *
 *    potentialLength = 1
 *      potentialStart = 0, candidateSub = "b"
 *        containingSet = {0, 1, 2}. size=3. Not unique.
 *      potentialStart = 1, candidateSub = "c"
 *        containingSet = {0, 1, 2}. size=3. Not unique.
 *      potentialStart = 2, candidateSub = "d"
 *        containingSet = {1, 2}. size=2. Not unique.
 *    smallestUniqueSubstring is "" => Continue potentialLength loop.
 *
 *    potentialLength = 2
 *      potentialStart = 0, candidateSub = "bc"
 *        containingSet = {0, 1, 2}. size=3. Not unique.
 *      potentialStart = 1, candidateSub = "cd"
 *        containingSet = {1, 2}. size=2. Not unique.
 *    smallestUniqueSubstring is "" => Continue potentialLength loop.
 *
 *    potentialLength = 3
 *      potentialStart = 0, candidateSub = "bcd"
 *        containingSet = {1, 2}. size=2. Not unique.
 *    smallestUniqueSubstring is "" => Continue potentialLength loop.
 *
 *    (No unique substring found for "bcd")
 *    finalResultHolder[1] = "" -> ["a","",""]
 *
 * 5. outerStringIndex = 2, targetString = "abcd"
 *    currentMinLength = Infinity, smallestUniqueSubstring = ""
 *
 *    potentialLength = 1: No unique ("a":{0,2}, "b":{0,1,2}, "c":{0,1,2}, "d":{1,2})
 *    potentialLength = 2: No unique ("ab":{0,2}, "bc":{0,1,2}, "cd":{1,2})
 *    potentialLength = 3: No unique ("abc":{0,2}, "bcd":{1,2})
 *    smallestUniqueSubstring is "" after these loops => Continue potentialLength loop.
 *
 *    potentialLength = 4
 *      potentialStart = 0, candidateSub = "abcd"
 *        containingSet = {2}. size=1, has(2)=true. Unique.
 *        4 < Infinity => currentMinLength = 4, smallestUniqueSubstring = "abcd"
 *    smallestUniqueSubstring is "abcd" (not empty) => Break potentialLength loop.
 *    finalResultHolder[2] = "abcd" -> ["a","","abcd"]
 *
 * Final Result: ["a","","abcd"]
 *
 * Time Complexity: O(N * L^3)
 * Space Complexity: O(N * L^3)
 */
var shortestSubstrings = function (arr) {
  const allInputStrings = arr;
  const stringCollectionSize = allInputStrings.length;

  const substringIndexMap = new Map();

  for (
    let iteratorStringIndex = 0;
    iteratorStringIndex < stringCollectionSize;
    ++iteratorStringIndex
  ) {
    const currentExaminedString = allInputStrings[iteratorStringIndex];
    const currentStringLength = currentExaminedString.length;

    for (
      let substringStartingPosition = 0;
      substringStartingPosition < currentStringLength;
      ++substringStartingPosition
    ) {
      for (
        let substringEndingPosition = substringStartingPosition + 1;
        substringEndingPosition <= currentStringLength;
        ++substringEndingPosition
      ) {
        const extractedSubstringValue = currentExaminedString.substring(
          substringStartingPosition,
          substringEndingPosition
        );
        if (!substringIndexMap.has(extractedSubstringValue)) {
          substringIndexMap.set(extractedSubstringValue, new Set());
        }
        substringIndexMap.get(extractedSubstringValue).add(iteratorStringIndex);
      }
    }
  }

  const finalResultHolder = new Array(stringCollectionSize).fill("");

  for (
    let outerStringIndex = 0;
    outerStringIndex < stringCollectionSize;
    ++outerStringIndex
  ) {
    const targetString = allInputStrings[outerStringIndex];
    const targetStringLength = targetString.length;

    let currentMinLength = Infinity;
    let smallestUniqueSubstring = "";

    for (
      let potentialLength = 1;
      potentialLength <= targetStringLength;
      ++potentialLength
    ) {
      for (
        let potentialStart = 0;
        potentialStart <= targetStringLength - potentialLength;
        ++potentialStart
      ) {
        const candidateSub = targetString.substring(
          potentialStart,
          potentialStart + potentialLength
        );
        const containingSet = substringIndexMap.get(candidateSub);

        if (containingSet.size === 1 && containingSet.has(outerStringIndex)) {
          if (potentialLength < currentMinLength) {
            currentMinLength = potentialLength;
            smallestUniqueSubstring = candidateSub;
          } else if (
            potentialLength === currentMinLength &&
            candidateSub < smallestUniqueSubstring
          ) {
            smallestUniqueSubstring = candidateSub;
          }
        }
      }
      if (smallestUniqueSubstring) {
        break;
      }
    }
    finalResultHolder[outerStringIndex] = smallestUniqueSubstring;
  }

  return finalResultHolder;
};
