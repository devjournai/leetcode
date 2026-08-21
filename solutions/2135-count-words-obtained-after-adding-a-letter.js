/**
 * Count Words Obtained After Adding A Letter
 * Intuition: Both operations (adding a letter, then rearranging) simplify to determining if a target word is simply a start word with one unique new character appended. Normalizing words by sorting their characters allows for direct comparison of character multisets. Thus, a target word's sorted representation must be equal to a start word's sorted representation plus exactly one additional character.
 * Approach: 1. Process `originalStartWords`: for each word, sort its characters and store the resulting sorted string in a `Set` for efficient lookups. Let's call this `sortedStartRepresentations`. 2. Initialize a counter, `numberOfObtainableTargets`, to zero. 3. Iterate through each `targetCandidateWords`: a. For the current `targetCandidateWord`, sort its characters to get `currentSortedTargetRepresentation`. b. Loop through each possible character removal from `currentSortedTargetRepresentation`. For each removal, create a `candidateBaseRepresentation` string. c. Check if this `candidateBaseRepresentation` exists in `sortedStartRepresentations`. If found, increment `numberOfObtainableTargets` and immediately proceed to the next `targetCandidateWord` (as only one match is needed). 4. Return `numberOfObtainableTargets`.
 * Dry Run: originalStartWords = ["ant", "add"], targetCandidateWords = ["tana", "dare"]
 *   1. `sortedStartRepresentations` initialization:
 *      - "ant" -> split(['a','n','t']) -> sort(['a','n','t']) -> join("ant")
 *      - "add" -> split(['a','d','d']) -> sort(['a','d','d']) -> join("add")
 *      `sortedStartRepresentations` = {"ant", "add"}
 *   2. `numberOfObtainableTargets` = 0
 *   3. Process `targetCandidateWords`:
 *      a. `currentRawTargetWord` = "tana"
 *         `targetCharacterArray` = ['t', 'a', 'n', 'a']
 *         `targetCharacterArray.sort()` -> ['a', 'a', 'n', 't']
 *         `currentSortedTargetRepresentation` = "aant"
 *         Loop `removalIndex` from 0 to 3:
 *         - `removalIndex` = 0: `candidateBaseRepresentation` = "ant" (from "aant" removing 'a' at index 0)
 *           `sortedStartRepresentations.has("ant")` is true.
 *           `numberOfObtainableTargets` = 1. Break inner loop and move to next `targetCandidateWord`.
 *      b. `currentRawTargetWord` = "dare"
 *         `targetCharacterArray` = ['d', 'a', 'r', 'e']
 *         `targetCharacterArray.sort()` -> ['a', 'd', 'e', 'r']
 *         `currentSortedTargetRepresentation` = "ader"
 *         Loop `removalIndex` from 0 to 3:
 *         - `removalIndex` = 0: `candidateBaseRepresentation` = "der". `sortedStartRepresentations.has("der")` is false.
 *         - `removalIndex` = 1: `candidateBaseRepresentation` = "aer". `sortedStartRepresentations.has("aer")` is false.
 *         - `removalIndex` = 2: `candidateBaseRepresentation` = "adr". `sortedStartRepresentations.has("adr")` is false.
 *         - `removalIndex` = 3: `candidateBaseRepresentation` = "ade". `sortedStartRepresentations.has("ade")` is false.
 *         No match found for "dare".
 *   4. Return `numberOfObtainableTargets` (which is 1).
 * Time Complexity: O(N_s * L_max log L_max + N_t * L_max^2)
 * Space Complexity: O(N_s * L_max)
 */
var wordCount = function (originalStartWords, targetCandidateWords) {
  const sortedStartRepresentations = new Set(
    originalStartWords.map((currentRawStartWord) => {
      const characterArray = currentRawStartWord.split("");
      characterArray.sort();
      const sortedCharacterString = characterArray.join("");
      return sortedCharacterString;
    })
  );

  let numberOfObtainableTargets = 0;

  for (const currentRawTargetWord of targetCandidateWords) {
    const targetCharacterArray = currentRawTargetWord.split("");
    targetCharacterArray.sort();
    const currentSortedTargetRepresentation = targetCharacterArray.join("");

    for (
      let removalIndex = 0;
      removalIndex < currentSortedTargetRepresentation.length;
      removalIndex++
    ) {
      const candidateBaseRepresentation =
        currentSortedTargetRepresentation.slice(0, removalIndex) +
        currentSortedTargetRepresentation.slice(removalIndex + 1);
      if (sortedStartRepresentations.has(candidateBaseRepresentation)) {
        numberOfObtainableTargets++;
        break;
      }
    }
  }

  return numberOfObtainableTargets;
};
