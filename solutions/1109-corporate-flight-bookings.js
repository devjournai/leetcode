/**
 * Corporate Flight Bookings
 * Intuition: Each booking [l,r,seats] is a range add. A difference array plus prefix sum fills every flight’s total in linear time.
 * Approach: 1. Zero an array of n. 2. Add seats at l-1; subtract at r if r<n. 3. Prefix-sum the difference array. 4. Return it.
 * Dry Run: bookings=[[1,2,10],[2,3,20]], n=3. Diff [10,20,-10] then prefix [10,30,20].
 * Time Complexity: O(n + B)
 * Space Complexity: O(n)
 */
var corpFlightBookings = function (bookings, n) {
  const flightSeatCounts = new Array(n).fill(0);

  for (const bookingDetails of bookings) {
    const firstFlight = bookingDetails[0];
    const lastFlight = bookingDetails[1];
    const numberOfSeats = bookingDetails[2];

    flightSeatCounts[firstFlight - 1] += numberOfSeats;

    if (lastFlight < n) {
      flightSeatCounts[lastFlight] -= numberOfSeats;
    }
  }

  for (
    let currentFlightIndex = 1;
    currentFlightIndex < n;
    currentFlightIndex++
  ) {
    flightSeatCounts[currentFlightIndex] +=
      flightSeatCounts[currentFlightIndex - 1];
  }

  return flightSeatCounts;
};
