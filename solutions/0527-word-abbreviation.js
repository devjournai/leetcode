/**
 * Word Abbreviation
 * Intuition: Abbreviate as `prefix + (skipped count) + last char`. When several words share an abbreviation, grow the prefix until groups become unique (or fall back to the full word if it is not shorter).
 * Approach: 1. Start `wordPrefixLengths` at 1 and group indices by abbreviation. 2. Unique groups get the abbreviation if shorter than the word. 3. Conflicts increment prefix length, regroup, and repeat until no collisions.
 * Dry Run: ["like","god","internal","me"].
 *   - "like" → l2e, "god" stays god (too short), "internal" → i6l, "me" stays me. No collisions. Result ["l2e","god","i6l","me"].
 * Time Complexity: O(N * L^2)
 * Space Complexity: O(N * L)
 */
var wordsAbbreviation = function (words) {
  const totalWords = words.length;
  const finalAbbreviations = new Array(totalWords).fill("");
  const wordPrefixLengths = new Array(totalWords).fill(1);

  function generateCurrentAbbreviation(fullWord, prefixSize) {
    const wordLength = fullWord.length;
    if (wordLength <= prefixSize + 2) {
      return fullWord;
    }
    return (
      fullWord.slice(0, prefixSize) +
      (wordLength - prefixSize - 1) +
      fullWord[wordLength - 1]
    );
  }

  let currentAbbreviationGroups = new Map();

  for (let wordIndex = 0; wordIndex < totalWords; ++wordIndex) {
    const currentWordText = words[wordIndex];
    const initialAbbreviation = generateCurrentAbbreviation(
      currentWordText,
      wordPrefixLengths[wordIndex]
    );

    if (!currentAbbreviationGroups.has(initialAbbreviation)) {
      currentAbbreviationGroups.set(initialAbbreviation, []);
    }
    currentAbbreviationGroups.get(initialAbbreviation).push(wordIndex);
  }

  let allConflictsResolved = false;
  while (!allConflictsResolved) {
    allConflictsResolved = true;
    let nextAbbreviationGroups = new Map();
    let conflictsToProcess = [];

    for (const [
      abbreviationKey,
      indicesInGroup,
    ] of currentAbbreviationGroups.entries()) {
      if (indicesInGroup.length === 1) {
        const singleWordIndex = indicesInGroup[0];
        const originalFullWord = words[singleWordIndex];
        const finalProposedAbbr = generateCurrentAbbreviation(
          originalFullWord,
          wordPrefixLengths[singleWordIndex]
        );

        finalAbbreviations[singleWordIndex] =
          finalProposedAbbr.length < originalFullWord.length
            ? finalProposedAbbr
            : originalFullWord;
      } else {
        allConflictsResolved = false;
        conflictsToProcess.push(indicesInGroup);
      }
    }

    if (allConflictsResolved) {
      break;
    }

    for (const conflictingGroup of conflictsToProcess) {
      for (const specificWordIdx of conflictingGroup) {
        wordPrefixLengths[specificWordIdx]++;
        const evaluatedWordString = words[specificWordIdx];
        const newPrefixValue = wordPrefixLengths[specificWordIdx];
        const newComputedAbbreviation = generateCurrentAbbreviation(
          evaluatedWordString,
          newPrefixValue
        );

        if (!nextAbbreviationGroups.has(newComputedAbbreviation)) {
          nextAbbreviationGroups.set(newComputedAbbreviation, []);
        }
        nextAbbreviationGroups
          .get(newComputedAbbreviation)
          .push(specificWordIdx);
      }
    }
    currentAbbreviationGroups = nextAbbreviationGroups;
  }

  return finalAbbreviations;
};
