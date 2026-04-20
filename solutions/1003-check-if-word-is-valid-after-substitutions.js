/**
 * Check If Word Is Valid After Substitutions
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var isValid = function (s) {
  const characterStack = [];
  const inputLength = s.length;

  for (let currentIdx = 0; currentIdx < inputLength; currentIdx++) {
    const currentChar = s[currentIdx];

    if (currentChar === "c") {
      if (characterStack.length < 2) {
        return false;
      }
      const secondPoppedChar = characterStack.pop();
      const firstPoppedChar = characterStack.pop();

      if (secondPoppedChar !== "b" || firstPoppedChar !== "a") {
        return false;
      }
    } else {
      characterStack.push(currentChar);
    }
  }

  return characterStack.length === 0;
};
