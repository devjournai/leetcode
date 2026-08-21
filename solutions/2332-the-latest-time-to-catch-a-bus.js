/**
 * The Latest Time To Catch A Bus
 * Intuition: Simulate the bus boarding process by sorting buses and passengers. The latest possible arrival time depends on whether the final bus was full or not, and must not coincide with any existing passenger's arrival.
 * Approach: 1. Sort both the `buses` and `passengers` arrays in ascending order. 2. Iterate through each bus's departure time. For each bus, board passengers whose arrival times are less than or equal to the bus departure time, until the bus is full or no more eligible passengers are left. Keep track of the passengers who board the *very last* bus. 3. Determine an initial `candidateCatchTime`. If the last bus was not full, this time can be the last bus's departure time. If the last bus was full, this time must be one minute before the arrival time of the latest passenger who boarded that last bus. 4. Create a `Set` of all passenger arrival times for efficient lookup. 5. Decrement `candidateCatchTime` if it conflicts with an existing passenger's arrival time, until a non-conflicting time is found. 6. Return the `candidateCatchTime`.
 * Dry Run: buses = [10, 20], passengers = [2, 17, 18, 19], capacity = 2
 * 1. Sort: buses = [10, 20], passengers = [2, 17, 18, 19]
 * 2. passengerIndex = 0, lastBusPassengersCollection = []
 *    - Bus 1 (busDepartureTime = 10):
 *      - currentBusPassengerTracker = []
 *      - passengerIndex = 0, passengers[0] = 2 <= 10, currentBusFilledCount < 2: currentBusPassengerTracker.push(2), passengerIndex = 1
 *      - passengerIndex = 1, passengers[1] = 17 > 10. Loop ends.
 *      - lastBusPassengersCollection remains [] (this is not the last bus)
 *    - Bus 2 (busDepartureTime = 20):
 *      - currentBusPassengerTracker = []
 *      - passengerIndex = 1, passengers[1] = 17 <= 20, currentBusFilledCount < 2: currentBusPassengerTracker.push(17), passengerIndex = 2
 *      - passengerIndex = 2, passengers[2] = 18 <= 20, currentBusFilledCount < 2: currentBusPassengerTracker.push(18), passengerIndex = 3
 *      - passengerIndex = 3, passengers[3] = 19 <= 20, currentBusFilledCount = 2 (capacity reached). Loop ends.
 *      - lastBusPassengersCollection becomes [17, 18] (this is the absolute last bus)
 * 3. lastBusTimeValue = 20
 * 4. candidateCatchTime = 20 (initial guess based on last bus departure)
 * 5. Check if lastBusPassengersCollection.length === capacity: 2 === 2 is true.
 *    - candidateCatchTime = lastBusPassengersCollection[lastBusPassengersCollection.length - 1] - 1 = 18 - 1 = 17.
 * 6. existingPassengerArrivalSet = new Set([2, 17, 18, 19])
 * 7. While loop:
 *    - existingPassengerArrivalSet.has(17)? Yes. candidateCatchTime = 16.
 *    - existingPassengerArrivalSet.has(16)? No. Loop ends.
 * 8. Return 16.
 * Time Complexity: O(N log N + M log M)
 * Space Complexity: O(M)
 */
var latestTimeCatchTheBus = function (buses, passengers, capacity) {
  buses.sort((firstBus, secondBus) => firstBus - secondBus);
  passengers.sort(
    (firstPassenger, secondPassenger) => firstPassenger - secondPassenger
  );

  let currentPassengerIndex = 0;
  let passengersOnFinalBus = [];

  for (let busDepartureMoment of buses) {
    let currentBusBoardedCount = 0;
    let temporaryPassengersForBus = [];

    while (
      currentPassengerIndex < passengers.length &&
      passengers[currentPassengerIndex] <= busDepartureMoment &&
      currentBusBoardedCount < capacity
    ) {
      temporaryPassengersForBus.push(passengers[currentPassengerIndex]);
      currentBusBoardedCount++;
      currentPassengerIndex++;
    }

    if (busDepartureMoment === buses[buses.length - 1]) {
      passengersOnFinalBus = temporaryPassengersForBus;
    }
  }

  const finalBusDepartureTime = buses[buses.length - 1];
  let latestPossibleArrival = finalBusDepartureTime;

  if (passengersOnFinalBus.length === capacity) {
    latestPossibleArrival =
      passengersOnFinalBus[passengersOnFinalBus.length - 1] - 1;
  }

  const existingPassengerTimes = new Set(passengers);
  while (existingPassengerTimes.has(latestPossibleArrival)) {
    latestPossibleArrival--;
  }

  return latestPossibleArrival;
};
