/**
 * Reverse Only Letters
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var reverseOnlyLetters = function (s) {
  const stringChars = s.split("");

  const isAlphabetical = (charCheck) => {
    const charCode = charCheck.charCodeAt(0);
    return (
      (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)
    );
  };

  for (
    let pointerOne = 0, pointerTwo = s.length - 1;
    pointerOne < pointerTwo;
  ) {
    const charOne = stringChars[pointerOne];
    const charTwo = stringChars[pointerTwo];

    if (!isAlphabetical(charOne)) {
      pointerOne++;
    } else if (!isAlphabetical(charTwo)) {
      pointerTwo--;
    } else {
      let temporaryHolder = stringChars[pointerOne];
      stringChars[pointerOne] = stringChars[pointerTwo];
      stringChars[pointerTwo] = temporaryHolder;

      pointerOne++;
      pointerTwo--;
    }
  }

  return stringChars.join("");
};
