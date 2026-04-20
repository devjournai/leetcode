/**
 * Strong Password Checker
 * Time Complexity: O(L)
 * Space Complexity: O(1)
 */
var strongPasswordChecker = function (password) {
  const inputStringLength = password.length;

  const hasLowercaseChar = /[a-z]/.test(password);
  const hasUppercaseChar = /[A-Z]/.test(password);
  const hasDigitChar = /[0-9]/.test(password);
  const neededCharacterTypes = 3 - (hasLowercaseChar + hasUppercaseChar + hasDigitChar);

  let totalReplacementsForRepeats = 0;
  let groupsWithZeroModThree = 0;
  let groupsWithOneModThree = 0;

  let passwordIndex = 0;
  while (passwordIndex < inputStringLength) {
    let repeatEndIndex = passwordIndex;
    while (repeatEndIndex < inputStringLength && password[repeatEndIndex] === password[passwordIndex]) {
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

  const deletionsFromTypeZeroGroups = Math.min(remainingDeletions, groupsWithZeroModThree);
  currentReplacementsValue -= deletionsFromTypeZeroGroups;
  remainingDeletions -= deletionsFromTypeZeroGroups;

  const deletionsFromTypeOneGroups = Math.min(remainingDeletions, groupsWithOneModThree * 2);
  currentReplacementsValue -= Math.floor(deletionsFromTypeOneGroups / 2);
  remainingDeletions -= deletionsFromTypeOneGroups;

  currentReplacementsValue -= Math.floor(remainingDeletions / 3);

  return deletionsNeeded + Math.max(neededCharacterTypes, Math.max(0, currentReplacementsValue));
};