/**
 * Car Pooling
 * Intuition: Capacity is a sweep-line over locations: +passengers at pickup, −passengers at dropoff. Prefix occupancy never exceeding capacity is necessary and sufficient.
 * Approach: 1. Difference array on [0,1000]. 2. Apply each trip’s +num at start and −num at end. 3. Scan left to right accumulating load; return false if it exceeds capacity.
 * Dry Run: trips=[[2,1,5],[3,3,7]], capacity=4. At 1 load=2; at 3 load=5>4 → false. Capacity 5 stays ≤5 → true.
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
