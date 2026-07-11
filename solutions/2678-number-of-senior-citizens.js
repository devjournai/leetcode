/**
 * Number Of Senior Citizens
 * Intuition: Each passenger's age is consistently located at specific character indices within their detail string. By extracting this segment and converting it to an integer, we can directly compare it against the threshold of 60 to identify senior citizens.
 * Approach: 1. Initialize a counter variable to keep track of senior citizens. 2. Iterate through the array of passenger detail strings using an index-based loop. 3. For each detail string, extract the two-character substring representing the age (indices 11 and 12). 4. Convert this age substring into an integer. 5. Check if the parsed integer age is strictly greater than 60. 6. If the condition is met, increment the senior citizens counter. 7. After processing all detail strings, return the final count.
 * Dry Run: Input: `details = ["7868190130M7522", "5303914400F9213", "8899001122M4510"]`
 * 1. `seniorCount = 0`
 * 2. `passengerIterator = 0`: `currentDetailString = "7868190130M7522"`
 *    - `ageSubstring = currentDetailString.substring(11, 13)` which is "75"
 *    - `parsedAge = parseInt("75")` which is 75
 *    - `75 > 60` is true. `seniorCount` becomes 1.
 * 3. `passengerIterator = 1`: `detailEntry = "5303914400F9213"`
 *    - `ageSegment = detailEntry.substring(11, 13)` which is "92"
 *    - `convertedAge = parseInt("92")` which is 92
 *    - `92 > 60` is true. `seniorCount` becomes 2.
 * 4. `passengerIterator = 2`: `elementValue = "8899001122M4510"`
 *    - `agePortion = elementValue.substring(11, 13)` which is "45"
 *    - `finalAge = parseInt("45")` which is 45
 *    - `45 > 60` is false. `seniorCount` remains 2.
 * 5. Loop finishes.
 * 6. Return `seniorCount` which is 2.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var countSeniors = function (details) {
  let seniorCount = 0;

  for (
    let passengerIterator = 0;
    passengerIterator < details.length;
    passengerIterator++
  ) {
    let currentDetailString = details[passengerIterator];
    let ageSubstring = currentDetailString.substring(11, 13);
    let parsedAge = parseInt(ageSubstring);

    if (parsedAge > 60) {
      seniorCount++;
    }
  }

  return seniorCount;
};
