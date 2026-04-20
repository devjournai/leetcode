/**
 * Html Entity Parser
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
    (matchedEntity) => entityMapping[matchedEntity],
  );

  return finalResultString;
};
