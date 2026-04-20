/**
 * Defanging An Ip Address
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
