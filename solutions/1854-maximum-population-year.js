/**
 * Maximum Population Year
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maximumPopulation = function (logs) {
  const earliestPossibleYear = 1950;
  const latestPossibleYear = 2050;
  const yearArraySize = latestPossibleYear - earliestPossibleYear + 1;

  const annualPopulationChanges = new Array(yearArraySize).fill(0);

  for (const personDetails of logs) {
    const personBirthYear = personDetails[0];
    const personDeathYear = personDetails[1];

    const birthYearArrayIndex = personBirthYear - earliestPossibleYear;
    annualPopulationChanges[birthYearArrayIndex]++;

    const deathYearArrayIndex = personDeathYear - earliestPossibleYear;
    annualPopulationChanges[deathYearArrayIndex]--;
  }

  let largestPopulation = 0;
  let currentYearPopulationCount = 0;
  let resultYearForMaxPopulation = earliestPossibleYear;

  for (
    let yearIterationIndex = 0;
    yearIterationIndex < yearArraySize;
    yearIterationIndex++
  ) {
    currentYearPopulationCount += annualPopulationChanges[yearIterationIndex];

    if (currentYearPopulationCount > largestPopulation) {
      largestPopulation = currentYearPopulationCount;
      resultYearForMaxPopulation = earliestPossibleYear + yearIterationIndex;
    }
  }

  return resultYearForMaxPopulation;
};
