/**
 * Html Entity Parser
 * Intuition: Replace the six named HTML entities with their characters via a single global regex of the entity keys.
 * Approach: 1. Map &quot; &apos; &amp; &gt; &lt; &frasl; to the matching symbols. 2. Join the keys with | into a global RegExp. 3. text.replace with the mapped character.
 * Dry Run: text = "&amp; is &quot;and&quot;".
 *   - &amp; → &, &quot; → ". Result `& is "and"`.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var entityParser = function (text) {
  const entityMapping = {
    "&quot;": '"',
    "&apos;": "'",
    "&amp;": "&",
    "&gt;": ">",
    "&lt;": "<",
    "&frasl;": "/",
  };

  const entityNamesArray = Object.keys(entityMapping);

  const regexExpressionString = entityNamesArray.join("|");
  const regexPatternObject = new RegExp(regexExpressionString, "g");

  const finalResultString = text.replace(
    regexPatternObject,
    (matchedEntity) => entityMapping[matchedEntity]
  );

  return finalResultString;
};
