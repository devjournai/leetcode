/**
 * Design Ride Sharing System
 * Intuition: We use two sorted sets $\textit{riders}$ and $\textit{drivers}$ to store waiting riders and available drivers respectively. Each element is a tuple $(t, \textit{id})$, representing the ID of the rider/driver and their timestamp $t$ when they joined the system. The timestamp $t$ is used to distinguish the order of arrival. Initially, $t = 0$, and each time a rider or driver is added, $t$ is incremented by $1$. Additionally, we use a hash table $\textit{d}$ to store the mapping between each rider's ID and their timestamp, which facilitates lookup when canceling a rider's request. Specifically: - When adding a rider, we add $(t, \textit{riderId})$ to $\textit{riders}$, set $\textit{d}[\textit{riderId}] = t$, and then increment $t$ by $1$. - When adding a driver, we add $(t, \textit{driverId})$ to $\textit{drivers}$ and then increment $t$ by $1$. - When matching a driver with a rider, if eit...
 * Approach: We use two sorted sets $\textit{riders}$ and $\textit{drivers}$ to store waiting riders and available drivers respectively. Each element is a tuple $(t, \textit{id})$, representing the ID of the rider/driver and their timestamp $t$ when they joined the system. The timestamp $t$ is used to distinguish the order of arrival. Initially, $t = 0$, and each time a rider or driver is added, $t$ is incremented by $1$. Additionally, we use a hash table $\textit{d}$ to store the mapping between each rider's ID and their timestamp, which facilitates lookup when canceling a rider's request. Specifically: - When adding a rider, we add $(t, \textit{riderId})$ to $\textit{riders}$, set $\textit{d}[\textit{riderId}] = t$, and then increment $t$ by $1$. - When adding a driver, we add $(t, \textit{driverId})$ to $\textit{drivers}$ and then increment $t$ by $1$. - When matching a driver with a rider, if eit...
 * Dry Run: Input: [&quot;RideSharingSystem&quot;, &quot;addRider&quot;, &quot;addDriver&quot;, &quot;addRider&quot;, &quot;matchDriverWithRider&quot;, &quot;addDriver&quot;, &quot;cancelRider&quot;, &quot;matchDriverWithRider&quot;, &quot;matchDriverWithRider&quot;] [[], [3], [2], [1], [], [5], [3], [], []] => Output: [null, null, null, null, [2, 3], null, null, [5, 1], [-1, -1]]
 * Time Complexity: O(N) per cancel in the worst case
 * Space Complexity: O(N)
 */
var RideSharingSystem = function () {
  this.t = 0;
  this.riders = [];
  this.drivers = [];
  this.riderTime = new Map();
};

RideSharingSystem.prototype.addRider = function (riderId) {
  this.riderTime.set(riderId, this.t);
  this.riders.push([this.t, riderId]);
  this.t++;
};

RideSharingSystem.prototype.addDriver = function (driverId) {
  this.drivers.push([this.t, driverId]);
  this.t++;
};

RideSharingSystem.prototype.matchDriverWithRider = function () {
  while (this.riders.length && this.riders[0][0] < 0) this.riders.shift();
  if (this.riders.length < 1 || this.drivers.length < 1) return [-1, -1];
  const driver = this.drivers.shift()[1];
  const rider = this.riders.shift()[1];
  this.riderTime.delete(rider);
  return [driver, rider];
};

RideSharingSystem.prototype.cancelRider = function (riderId) {
  const ts = this.riderTime.get(riderId);
  this.riderTime.delete(riderId);
  const idx = this.riders.findIndex((r) => r[0] === ts && r[1] === riderId);
  if (idx !== -1) this.riders.splice(idx, 1);
};
