/**
 * Maximum Vacation Days
 * Intuition: DP `maxVacationAccumulated[week][city]` is the best total after `week` weeks ending in `city`, reachable by staying or taking a flight from a previously reachable city. Start week 0 in city 0 with 0 days.
 * Approach: 1. Table of size (K+1)×N filled with -Infinity; [0][0]=0. 2. For week 1..K, for each dest and origin, if origin was reachable and (flight or same city), take max of dest += vacationDays[dest][week-1]. 3. Return max over cities at week K (at least 0).
 * Dry Run: flights [[0,1,1],[1,0,1],[1,1,0]], days [[1,3,1],[6,0,3],[3,3,3]].
 *   - Week1: city1 gets 6 (0→1). Later weeks prefer city 1 then 2. Optimal 12.
 * Time Complexity: O(K * N^2)
 * Space Complexity: O(K * N)
 */
var maxVacationDays = function (flightConnections, vacationDaysMatrix) {
  const numCities = flightConnections.length;
  const numWeeks = vacationDaysMatrix[0].length;

  const maxVacationAccumulated = Array.from({ length: numWeeks + 1 }, () =>
    Array(numCities).fill(-Infinity)
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
                previousWeekVacationTotal + currentWeekVacationAllowance
              );
          }
        }
      }
    }
  }

  return Math.max(0, ...maxVacationAccumulated[numWeeks]);
};
