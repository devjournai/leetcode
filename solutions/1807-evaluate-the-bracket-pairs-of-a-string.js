/**
 * Evaluate The Bracket Pairs Of A String
 * Time Complexity: O(s.length + sum(key.length for key in s) + sum(key.length + value.length for key,value in knowledge))
 * Space Complexity: O(s.length + sum(key.length + value.length for key,value in knowledge))
 */
var evaluate = function (s, knowledge) {
  const knowledgeMap = new Map();
  let knowledgeTraversalIndex = 0;

  while (knowledgeTraversalIndex < knowledge.length) {
    const currentEntry = knowledge[knowledgeTraversalIndex];
    const keyIdentifier = currentEntry[0];
    const valueResult = currentEntry[1];
    knowledgeMap.set(keyIdentifier, valueResult);
    knowledgeTraversalIndex++;
  }

  const outputParts = [];
  let primaryStringPointer = 0;

  while (primaryStringPointer < s.length) {
    const characterAtPointer = s[primaryStringPointer];

    if (characterAtPointer === "(") {
      primaryStringPointer++; // Move past '('

      let currentKeyBuffer = "";
      let keyParsingPointer = primaryStringPointer;

      while (keyParsingPointer < s.length && s[keyParsingPointer] !== ")") {
        currentKeyBuffer += s[keyParsingPointer];
        keyParsingPointer++;
      }

      const retrievedMapping = knowledgeMap.get(currentKeyBuffer);

      if (retrievedMapping !== undefined) {
        outputParts.push(retrievedMapping);
      } else {
        outputParts.push("?");
      }

      primaryStringPointer = keyParsingPointer + 1; // Move past ')'
    } else {
      outputParts.push(characterAtPointer);
      primaryStringPointer++;
    }
  }

  const finalEvaluatedString = outputParts.join("");
  return finalEvaluatedString;
};
