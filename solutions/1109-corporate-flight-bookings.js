/**
 * Corporate Flight Bookings
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
