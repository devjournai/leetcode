/**
 * Reverse Only Letters
 * Intuition: Only A–Z/a–z reverse; other characters stay put, so two pointers skip non-letters then swap.
 * Approach: 1. Split to `stringChars`. 2. `isAlphabetical` via char codes 65–90 or 97–122. 3. pointerOne from left, pointerTwo from right: skip non-letters, else swap and both move. 4. Join.
 * Dry Run: "ab-cd" → swap a/d then b/c → "dc-ba".
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
