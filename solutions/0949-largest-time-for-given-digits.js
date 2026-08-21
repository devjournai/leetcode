/**
 * Largest Time For Given Digits
 * Intuition: There are only 4! permutations; keep the lexicographically largest "HH:MM" with HH<24 and MM<60.
 * Approach: 1. Nested four loops over distinct indices. 2. hours = 10*d1+d2, minutes similarly. 3. If valid, format with leading zeros and compare as strings to `latestValidTime`. 4. Return that string ("" if none).
 * Dry Run: [1,2,3,4] best 23:41. [5,5,5,5] none → "".
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
