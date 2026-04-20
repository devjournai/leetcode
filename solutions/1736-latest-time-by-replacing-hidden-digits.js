/**
 * Latest Time By Replacing Hidden Digits
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
