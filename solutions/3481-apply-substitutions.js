/**
 * Apply Substitutions
 * Intuition: Placeholders are `%key%` and replacement values may themselves contain placeholders, so each value is expanded recursively until only plain text remains. A map from key to replacement makes lookups O(1).
 * Approach: 1. Store replacements in a map. 2. Scan text; copy ordinary characters. 3. On `%`, find the matching `%`, look up the key, and recurse on its value. 4. Concatenate pieces and return the fully expanded string.
 * Dry Run: replacements = [["A","abc"],["B","%A%_%A%"]], text = "%B%".
 *   - Evaluate "%B%" → key B → evaluate "%A%_%A%".
 *   - Each %A% → "abc". Result "abc_abc".
 * Time Complexity: O(|text|^2)
 * Space Complexity: O(|replacements| + |text|)
 */
var applySubstitutions = function (replacements, text) {
  const replaceMap = new Map();
  for (const replacement of replacements) {
    replaceMap.set(replacement[0], replacement[1]);
  }

  const evaluate = (sourceText) => {
    let result = "";
    let index = 0;

    while (index < sourceText.length) {
      if (sourceText[index] === "%") {
        const closingIndex = sourceText.indexOf("%", index + 1);
        const key = sourceText.slice(index + 1, closingIndex);
        const value = replaceMap.get(key);
        result += evaluate(value);
        index = closingIndex + 1;
      } else {
        result += sourceText[index];
        index++;
      }
    }

    return result;
  };

  return evaluate(text);
};
