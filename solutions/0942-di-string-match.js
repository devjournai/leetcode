/**
 * Di String Match
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var diStringMatch = function (inputString) {
  const permutationArray = [];
  let currentLow = 0;
  let currentHigh = inputString.length;

  for (let stringIndex = 0; stringIndex < inputString.length; stringIndex++) {
    const currentCharacter = inputString[stringIndex];

    if (currentCharacter === "I") {
      permutationArray.push(currentLow);
      currentLow++;
    } else {
      permutationArray.push(currentHigh);
      currentHigh--;
    }
  }

  permutationArray.push(currentLow);

  return permutationArray;
};
