/**
 * Binary Watch
 * Intuition: Hours 0–11 and minutes 0–59 are a tiny space, so enumerate every clock time and keep those whose binary 1-bits sum to `turnedOn`.
 * Approach: 1. Nested loops over hours and minutes. 2. Count set bits via `toString(2).split('1').length - 1`. 3. If the sum equals `turnedOn`, format minutes with a leading zero when `< 10` and push `"h:mm"`.
 * Dry Run: turnedOn = 1.
 *   - 1:00 has one hour bit; 0:01, 0:02, 0:04, 0:08, 0:16, 0:32 have one minute bit; 2:00, 4:00, 8:00 similarly. Collect those strings.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var readBinaryWatch = function (turnedOn) {
  const allPossibleTimes = [];

  for (let hourValue = 0; hourValue < 12; hourValue++) {
    for (let minuteValue = 0; minuteValue < 60; minuteValue++) {
      const hourSetBits = hourValue.toString(2).split("1").length - 1;
      const minuteSetBits = minuteValue.toString(2).split("1").length - 1;

      const totalOnLeds = hourSetBits + minuteSetBits;

      if (totalOnLeds === turnedOn) {
        let minuteDisplayString = minuteValue.toString();
        if (minuteValue < 10) {
          minuteDisplayString = "0" + minuteDisplayString;
        }
        const formattedTimeString = `${hourValue}:${minuteDisplayString}`;
        allPossibleTimes.push(formattedTimeString);
      }
    }
  }

  return allPossibleTimes;
};
