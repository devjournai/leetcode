/**
 * Latest Time By Replacing Hidden Digits
 * Intuition: Maximize HH:MM independently: hour tens is 2 if the ones digit allows ≤3, else 1; hour ones is 3 if tens is 2 else 9; minutes 5 and 9.
 * Approach: 1. Split into `timeCharacterArray`. 2. Fill '?' at indices 0,1 then 3,4 with those greedy digits. 3. Join.
 * Dry Run: time = "2?:?0"
 * hour ones → 3; minute tens → 5 → "23:50".
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var maximumTime = function (timeInputString) {
  const timeCharacterArray = timeInputString.split("");

  const firstHourCandidate = timeCharacterArray[0];
  const secondHourCandidate = timeCharacterArray[1];
  if (firstHourCandidate === "?") {
    timeCharacterArray[0] =
      secondHourCandidate === "?" || secondHourCandidate <= "3" ? "2" : "1";
  }

  const currentFirstHourValue = timeCharacterArray[0];
  const currentSecondHourCandidate = timeCharacterArray[1];
  if (currentSecondHourCandidate === "?") {
    timeCharacterArray[1] = currentFirstHourValue === "2" ? "3" : "9";
  }

  const firstMinuteCandidate = timeCharacterArray[3];
  if (firstMinuteCandidate === "?") {
    timeCharacterArray[3] = "5";
  }

  const secondMinuteCandidate = timeCharacterArray[4];
  if (secondMinuteCandidate === "?") {
    timeCharacterArray[4] = "9";
  }

  const finalTimeResult = timeCharacterArray.join("");
  return finalTimeResult;
};
