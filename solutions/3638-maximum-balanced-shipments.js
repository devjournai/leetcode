/**
 * Maximum Balanced Shipments
 * Intuition: A balanced shipment ends at the first value strictly less than the max seen since the previous shipment. Greedily cut as soon as that happens to maximize the number of pieces.
 * Approach: 1. Track running max. 2. When weight[i] < max, count a shipment and reset max.
 * Dry Run: [2,5,1,4,3] → after 1 < 5 cut, then 3 < 4 cut, answer 2.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxBalancedShipments = function (weight) {
  let shipments = 0;
  let runningMax = 0;

  for (const parcel of weight) {
    runningMax = Math.max(runningMax, parcel);
    if (parcel < runningMax) {
      shipments++;
      runningMax = 0;
    }
  }

  return shipments;
};
