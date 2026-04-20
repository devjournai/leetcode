/**
 * Largest Number
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
