/**
 * Strong Password Checker
 * Intuition: Need length in [6,20], three character classes, and no three identical in a row. Repeats of length L cost `floor(L/3)` replacements; extra length is deleted first from groups whose `L%3` makes each deletion reduce that replacement cost most (mod 0, then mod 1, then others).
 * Approach: 1. Count missing lower/upper/digit types. 2. Scan runs ≥ 3, tally replacements and mod-3 group counts. 3. Length < 6: max(inserts, missing types). 4. Length ≤ 20: max(missing types, replacements). 5. Else delete down to 20, reducing replacement need, then add deletions + max(types, remaining replacements).
 * Dry Run: password = "aaa".
 *   - length 3, missing 2 types, one run of 3. Inserts=3. max(3,2)=3.
 * Time Complexity: O(L)
 * Space Complexity: O(1)
 */
var strongPasswordChecker = function (password) {
  const inputStringLength = password.length;

  const hasLowercaseChar = /[a-z]/.test(password);
  const hasUppercaseChar = /[A-Z]/.test(password);
  const hasDigitChar = /[0-9]/.test(password);
  const neededCharacterTypes =
    3 - (hasLowercaseChar + hasUppercaseChar + hasDigitChar);

  let totalReplacementsForRepeats = 0;
  let groupsWithZeroModThree = 0;
  let groupsWithOneModThree = 0;

  let passwordIndex = 0;
  while (passwordIndex < inputStringLength) {
    let repeatEndIndex = passwordIndex;
    while (
      repeatEndIndex < inputStringLength &&
      password[repeatEndIndex] === password[passwordIndex]
    ) {
      repeatEndIndex++;
    }
    const currentRepeatLength = repeatEndIndex - passwordIndex;

    if (currentRepeatLength >= 3) {
      totalReplacementsForRepeats += Math.floor(currentRepeatLength / 3);
      if (currentRepeatLength % 3 === 0) {
        groupsWithZeroModThree++;
      } else if (currentRepeatLength % 3 === 1) {
        groupsWithOneModThree++;
      }
    }
    passwordIndex = repeatEndIndex;
  }

  if (inputStringLength < 6) {
    const insertionsRequired = 6 - inputStringLength;
    return Math.max(insertionsRequired, neededCharacterTypes);
  }

  if (inputStringLength <= 20) {
    return Math.max(neededCharacterTypes, totalReplacementsForRepeats);
  }

  const deletionsNeeded = inputStringLength - 20;
  let remainingDeletions = deletionsNeeded;
  let currentReplacementsValue = totalReplacementsForRepeats;

  const deletionsFromTypeZeroGroups = Math.min(
    remainingDeletions,
    groupsWithZeroModThree
  );
  currentReplacementsValue -= deletionsFromTypeZeroGroups;
  remainingDeletions -= deletionsFromTypeZeroGroups;

  const deletionsFromTypeOneGroups = Math.min(
    remainingDeletions,
    groupsWithOneModThree * 2
  );
  currentReplacementsValue -= Math.floor(deletionsFromTypeOneGroups / 2);
  remainingDeletions -= deletionsFromTypeOneGroups;

  currentReplacementsValue -= Math.floor(remainingDeletions / 3);

  return (
    deletionsNeeded +
    Math.max(neededCharacterTypes, Math.max(0, currentReplacementsValue))
  );
};
