/**
 * Defanging An Ip Address
 * Intuition: Replace every '.' with "[.]" by scanning characters into a parts array and joining once.
 * Approach: 1. For each character, push "[.]" if it is a dot, else push the character. 2. Join the parts.
 * Dry Run: 1.1.1.1 → 1[.]1[.]1[.]1.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var defangIPaddr = function (address) {
  let defangedAddressParts = [];
  let currentIndex;

  for (currentIndex = 0; currentIndex < address.length; currentIndex++) {
    let currentCharacter = address[currentIndex];
    if (currentCharacter === ".") {
      defangedAddressParts.push("[.]");
    } else {
      defangedAddressParts.push(currentCharacter);
    }
  }

  let finalOutput = defangedAddressParts.join("");
  return finalOutput;
};
