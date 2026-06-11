/**
 * Strong Password Checker II
 * Intuition: A strong password requires satisfying multiple independent criteria simultaneously. These criteria, including length, presence of different character types, and absence of adjacent duplicates, can be efficiently evaluated through a single traversal of the password string.
 * Approach:
 * 1. Immediately check if the password length is less than 8 characters. If it is, return false as per the first criterion.
 * 2. Create a Set containing all specified special characters for efficient O(1) lookup during character type checking.
 * 3. Initialize an accumulator object for the `reduce` operation. This object will track four boolean flags (for lowercase, uppercase, digit, special character presence), a flag for whether adjacent identical characters were found, and the character processed in the previous iteration.
 * 4. Convert the password string into an array of characters and apply the `reduce` method. This serves as the single pass through the password.
 *    a. Inside the reducer, compare the current character with the `previousCharacter` stored in the accumulator. If they are identical and `previousCharacter` is not null (i.e., not the very first character), set the `hasAdjacentSame` flag in the accumulator to true.
 *    b. Use regular expressions to test if the current character is a lowercase letter, an uppercase letter, or a digit. Update the corresponding `foundLowercase`, `foundUppercase`, or `foundDigit` flag in the accumulator to true if a match is found.
 *    c. If none of the above, check if the current character is present in the `specialCharactersSet`. If so, update the `foundSpecial` flag to true.
 *    d. Update the `previousCharacter` in the accumulator to the current character for the next iteration.
 *    e. Return the modified accumulator for the next step of the reduction.
 * 5. After the `reduce` operation completes, inspect the final state of the accumulator. If `hasAdjacentSame` is true, return false.
 * 6. Finally, return true only if all four character type flags (`foundLowercase`, `foundUppercase`, `foundDigit`, `foundSpecial`) are true.
 * Dry Run: password = "aP1!pA!1"
 * 1. passwordLengthContainer = 8. 8 < 8 is false. Continue.
 * 2. allowedSpecialChars = new Set(['!', '@', ..., '+']).
 * 3. initialPasswordState = { foundLowercase: false, foundUppercase: false, foundDigit: false, foundSpecial: false, previousCharacter: null, hasAdjacentSame: false }.
 * 4. processedPasswordState = password.split('').reduce( (accumulatedState, charElement) => { ... }, initialPasswordState );
 *    - charElement='a': accumulatedState.foundLowercase = true; accumulatedState.previousCharacter = 'a';
 *    - charElement='P': accumulatedState.foundUppercase = true; accumulatedState.previousCharacter = 'P';
 *    - charElement='1': accumulatedState.foundDigit = true; accumulatedState.previousCharacter = '1';
 *    - charElement='!': accumulatedState.foundSpecial = true; accumulatedState.previousCharacter = '!';
 *    - charElement='p': (no new flag set, `foundLowercase` already true) accumulatedState.previousCharacter = 'p';
 *    - charElement='A': (no new flag set, `foundUppercase` already true) accumulatedState.previousCharacter = 'A';
 *    - charElement='!': (no new flag set, `foundSpecial` already true) accumulatedState.previousCharacter = '!';
 *    - charElement='1': (no new flag set, `foundDigit` already true) accumulatedState.previousCharacter = '1';
 *    End of reduce. processedPasswordState = { foundLowercase: true, foundUppercase: true, foundDigit: true, foundSpecial: true, previousCharacter: '1', hasAdjacentSame: false }.
 * 5. processedPasswordState.hasAdjacentSame (false) is not true. Continue.
 * 6. Return processedPasswordState.foundLowercase (true) && processedPasswordState.foundUppercase (true) && processedPasswordState.foundDigit (true) && processedPasswordState.foundSpecial (true). Result: true.
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */
var strongPasswordCheckerII = function (password) {
  const passwordLengthContainer = password.length;
  if (passwordLengthContainer < 8) {
    return false;
  }

  const allowedSpecialChars = new Set([
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "+",
  ]);

  const initialPasswordState = {
    foundLowercase: false,
    foundUppercase: false,
    foundDigit: false,
    foundSpecial: false,
    previousCharacter: null,
    hasAdjacentSame: false,
  };

  const processedPasswordState = password
    .split("")
    .reduce((accumulatedState, charElement) => {
      if (
        accumulatedState.previousCharacter !== null &&
        accumulatedState.previousCharacter === charElement
      ) {
        accumulatedState.hasAdjacentSame = true;
      }

      if (/[a-z]/.test(charElement)) {
        accumulatedState.foundLowercase = true;
      } else if (/[A-Z]/.test(charElement)) {
        accumulatedState.foundUppercase = true;
      } else if (/\d/.test(charElement)) {
        accumulatedState.foundDigit = true;
      } else if (allowedSpecialChars.has(charElement)) {
        accumulatedState.foundSpecial = true;
      }

      accumulatedState.previousCharacter = charElement;
      return accumulatedState;
    }, initialPasswordState);

  if (processedPasswordState.hasAdjacentSame) {
    return false;
  }

  return (
    processedPasswordState.foundLowercase &&
    processedPasswordState.foundUppercase &&
    processedPasswordState.foundDigit &&
    processedPasswordState.foundSpecial
  );
};
