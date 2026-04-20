/**
 * Largest Time For Given Digits
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var largestTimeFromDigits = function (arr) {
  let latestValidTime = "";
  const totalDigits = 4;

  for (let indexOne = 0; indexOne < totalDigits; indexOne++) {
    for (let indexTwo = 0; indexTwo < totalDigits; indexTwo++) {
      if (indexOne === indexTwo) continue;

      for (let indexThree = 0; indexThree < totalDigits; indexThree++) {
        if (indexThree === indexOne || indexThree === indexTwo) continue;

        for (let indexFour = 0; indexFour < totalDigits; indexFour++) {
          if (
            indexFour === indexOne ||
            indexFour === indexTwo ||
            indexFour === indexThree
          )
            continue;

          const hourDigitOne = arr[indexOne];
          const hourDigitTwo = arr[indexTwo];
          const minuteDigitOne = arr[indexThree];
          const minuteDigitTwo = arr[indexFour];

          const currentHours = hourDigitOne * 10 + hourDigitTwo;
          const currentMinutes = minuteDigitOne * 10 + minuteDigitTwo;

          if (currentHours < 24 && currentMinutes < 60) {
            const formattedHours =
              currentHours < 10 ? `0${currentHours}` : `${currentHours}`;
            const formattedMinutes =
              currentMinutes < 10 ? `0${currentMinutes}` : `${currentMinutes}`;
            const currentTimeCandidate = `${formattedHours}:${formattedMinutes}`;

            if (currentTimeCandidate > latestValidTime) {
              latestValidTime = currentTimeCandidate;
            }
          }
        }
      }
    }
  }

  return latestValidTime;
};
