/**
 * Maximum Vacation Days
 * Time Complexity: O(K * N^2)
 * Space Complexity: O(K * N)
 */
var maxVacationDays = function (flightConnections, vacationDaysMatrix) {
  const numCities = flightConnections.length;
  const numWeeks = vacationDaysMatrix[0].length;

  const maxVacationAccumulated = Array.from({ length: numWeeks + 1 }, () =>
    Array(numCities).fill(-Infinity),
  );

  maxVacationAccumulated[0][0] = 0;

  for (
    let currentWeekIndex = 1;
    currentWeekIndex <= numWeeks;
    currentWeekIndex++
  ) {
    for (
      let destinationCity = 0;
      destinationCity < numCities;
      destinationCity++
    ) {
      for (let originCity = 0; originCity < numCities; originCity++) {
        const previousWeekVacationTotal =
          maxVacationAccumulated[currentWeekIndex - 1][originCity];

        if (previousWeekVacationTotal !== -Infinity) {
          const flightAvailable =
            flightConnections[originCity][destinationCity] === 1;
          const remainedInSameCity = originCity === destinationCity;

          if (flightAvailable || remainedInSameCity) {
            const currentWeekVacationAllowance =
              vacationDaysMatrix[destinationCity][currentWeekIndex - 1];
            maxVacationAccumulated[currentWeekIndex][destinationCity] =
              Math.max(
                maxVacationAccumulated[currentWeekIndex][destinationCity],
                previousWeekVacationTotal + currentWeekVacationAllowance,
              );
          }
        }
      }
    }
  }

  return Math.max(0, ...maxVacationAccumulated[numWeeks]);
};
