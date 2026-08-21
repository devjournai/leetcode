/**
 * Maximum Population Year
 * Intuition: Difference array on years 1950–2050: +1 at birth, −1 at death. Prefix sum is population; the first year with the maximum is the answer.
 * Approach: 1. Fill `annualPopulationChanges`. 2. Scan years accumulating `currentYearPopulationCount`. 3. Whenever it exceeds `largestPopulation`, record `resultYearForMaxPopulation`.
 * Dry Run: logs=[[1993,1999],[2000,2010]].
 *   - 1993: pop 1 (max year 1993). 1999: pop 0. 2000: pop 1 (not greater). Return 1993.
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
