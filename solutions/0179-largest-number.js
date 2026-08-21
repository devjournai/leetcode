/**
 * Largest Number
 * Intuition: The largest concatenation is not numeric sort. Compare two numbers by which order of concatenating their strings is larger (BA vs AB).
 * Approach: 1. Sort with comparator: convert a,b to strings; return Number(b+a) - Number(a+b) so larger concatenations come first. 2. Join the sorted array. 3. Collapse a leading run of zeros to a single "0".
 * Dry Run: nums = [10, 2].
 *   - "210" vs "102": 210 - 102 > 0 so 2 comes before 10.
 *   - join → "210". No extra leading zeros. Return "210".
 * Time Complexity: O(N log N * D)
 * Space Complexity: O(N * D)
 */
var largestNumber = function (numsInput) {
  let sortedNumberArray = numsInput.sort((compareValueA, compareValueB) => {
    let stringRepresentationA = String(compareValueA);
    let stringRepresentationB = String(compareValueB);

    let combinedStringFromBThenA =
      stringRepresentationB + stringRepresentationA;
    let combinedStringFromAThenB =
      stringRepresentationA + stringRepresentationB;

    let numericValueFromBThenA = Number(combinedStringFromBThenA);
    let numericValueFromAThenB = Number(combinedStringFromAThenB);

    return numericValueFromBThenA - numericValueFromAThenB;
  });

  let assembledNumberString = sortedNumberArray.join("");

  let finalOutputString = assembledNumberString.replace(/^0+/, "0");

  return finalOutputString;
};
