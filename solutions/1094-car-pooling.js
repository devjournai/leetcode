/**
 * Car Pooling
 * Time Complexity: O(N + M)
 * Space Complexity: O(M)
 */
var carPooling = function (trips, capacity) {
  const maxTravelLocation = 1001;
  const locationPassengerChanges = new Array(maxTravelLocation).fill(0);

  for (
    let tripIdentifier = 0;
    tripIdentifier < trips.length;
    tripIdentifier++
  ) {
    const tripRecord = trips[tripIdentifier];
    const passengersToBoard = tripRecord[0];
    const pickupCoordinate = tripRecord[1];
    const dropoffCoordinate = tripRecord[2];

    locationPassengerChanges[pickupCoordinate] += passengersToBoard;
    locationPassengerChanges[dropoffCoordinate] -= passengersToBoard;
  }

  let currentOccupancy = 0;
  for (
    let geographicPoint = 0;
    geographicPoint < maxTravelLocation;
    geographicPoint++
  ) {
    const passengerFlowChange = locationPassengerChanges[geographicPoint];
    currentOccupancy += passengerFlowChange;
    if (currentOccupancy > capacity) {
      return false;
    }
  }

  return true;
};
