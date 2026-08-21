/**
 * Brace Expansion
 * Intuition: The string is a product of option groups ({a,b} or a single letter). Cartesian product of those groups, then sort, lists every word in lexicographic order.
 * Approach: 1. Parse: on '{', split until '}' by commas; else a singleton group. 2. Backtrack concatenating one choice per group. 3. Sort the generated words.
 * Dry Run: {a,b}c{d,e} → groups [a,b], [c], [d,e] → acd, ace, bcd, bce after sort.
 * Time Complexity: O(N + W * N_word * logW)
 * Space Complexity: O(W * N_word)
 */
var expand = function (stringInput) {
  const allOptionSets = [];
  let parseIndex = 0;

  while (parseIndex < stringInput.length) {
    if (stringInput[parseIndex] === "{") {
      const braceContentStart = parseIndex + 1;
      let groupEndPos = braceContentStart;
      while (stringInput[groupEndPos] !== "}") {
        groupEndPos++;
      }
      const subExpression = stringInput.substring(
        braceContentStart,
        groupEndPos
      );
      const parsedOptions = subExpression.split(",");
      allOptionSets.push(parsedOptions);
      parseIndex = groupEndPos + 1;
    } else {
      const singleCharGroup = [stringInput[parseIndex]];
      allOptionSets.push(singleCharGroup);
      parseIndex++;
    }
  }

  const finalCombinations = [];

  const backtrackGenerator = (currentGroupLevel, currentWordBuild) => {
    if (currentGroupLevel === allOptionSets.length) {
      finalCombinations.push(currentWordBuild);
      return;
    }

    const optionsForCurrentLevel = allOptionSets[currentGroupLevel];
    for (const singleChoice of optionsForCurrentLevel) {
      const nextWordBuild = currentWordBuild + singleChoice;
      backtrackGenerator(currentGroupLevel + 1, nextWordBuild);
    }
  };

  backtrackGenerator(0, "");

  finalCombinations.sort();

  return finalCombinations;
};
