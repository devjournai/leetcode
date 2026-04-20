/**
 * Design Underground System
 * Time Complexity: O(1)
 * Space Complexity: O(U + S^2)
 */
var UndergroundSystem = function () {
  this.travelerCheckins = new Map();
  this.routeDurations = new Map();
};

UndergroundSystem.prototype.checkIn = function (id, stationName, t) {
  this.travelerCheckins.set(id, { entryStation: stationName, entryTime: t });
};

UndergroundSystem.prototype.checkOut = function (id, stationName, t) {
  const checkinDetails = this.travelerCheckins.get(id);
  const startPoint = checkinDetails.entryStation;
  const departureTime = checkinDetails.entryTime;
  const endPoint = stationName;
  const arrivalTime = t;

  const tripKey = `${startPoint}-${endPoint}`;
  const travelTime = arrivalTime - departureTime;

  if (!this.routeDurations.has(tripKey)) {
    this.routeDurations.set(tripKey, {
      totalAccumulatedTime: 0,
      journeyCount: 0,
    });
  }

  const routeStats = this.routeDurations.get(tripKey);
  routeStats.totalAccumulatedTime += travelTime;
  routeStats.journeyCount += 1;

  this.travelerCheckins.delete(id);
};

UndergroundSystem.prototype.getAverageTime = function (
  startStation,
  endStation,
) {
  const queryKey = `${startStation}-${endStation}`;
  const recordedStats = this.routeDurations.get(queryKey);
  const overallTimeSum = recordedStats.totalAccumulatedTime;
  const numberOfTrips = recordedStats.journeyCount;
  return overallTimeSum / numberOfTrips;
};
