/**
 * Delivering Boxes From Storage To Ports
 * Intuition: `dpMinTrips[i]` is min trips to deliver the first `i` boxes. A ship load is a window of consecutive boxes under `maxBoxes`/`maxWeight`; trips for that load equal (port changes in the window) + 2 (storage round trips). Slide the left bound so the window is always an optimal last load.
 * Approach: 1. Maintain `windowBeginPointer`, `portTripChanges`, remaining box/weight capacity. 2. Expand to `boxIndex`; shrink while over capacity or while `dpMinTrips[windowBeginPointer+1]===dpMinTrips[windowBeginPointer]` (drop a useless prefix). 3. Set `dpMinTrips[boxIndex+1] = portTripChanges + 2 + dpMinTrips[windowBeginPointer]`. 4. Return `dpMinTrips[totalBoxes]`.
 * Dry Run: boxes = [[1,1],[2,1],[1,1]], portsCount=2, maxBoxes=3, maxWeight=3
 * After all three in one window: one port change (1→2→1) → 1+2=3 trips; dp ends at 3.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var boxDelivering = function (boxes, portsCount, maxBoxes, maxWeight) {
  const totalBoxes = boxes.length;
  const dpMinTrips = new Array(totalBoxes + 1).fill(0);

  let windowBeginPointer = 0;
  let portTripChanges = 0;
  let currentShipBoxCapacity = maxBoxes;
  let currentShipWeightCapacity = maxWeight;

  for (let boxIndex = 0; boxIndex < totalBoxes; boxIndex++) {
    const boxWeightValue = boxes[boxIndex][1];
    const currentBoxPortIdentifier = boxes[boxIndex][0];

    currentShipBoxCapacity--;
    currentShipWeightCapacity -= boxWeightValue;

    if (boxIndex > 0 && currentBoxPortIdentifier !== boxes[boxIndex - 1][0]) {
      portTripChanges++;
    }

    while (
      currentShipBoxCapacity < 0 ||
      currentShipWeightCapacity < 0 ||
      (windowBeginPointer < boxIndex &&
        dpMinTrips[windowBeginPointer + 1] === dpMinTrips[windowBeginPointer])
    ) {
      const boxWeightRemoved = boxes[windowBeginPointer][1];
      const portIdentifierRemoved = boxes[windowBeginPointer][0];

      currentShipBoxCapacity++;
      currentShipWeightCapacity += boxWeightRemoved;

      if (
        windowBeginPointer > 0 &&
        portIdentifierRemoved !== boxes[windowBeginPointer - 1][0]
      ) {
        portTripChanges--;
      }
      windowBeginPointer++;
    }

    dpMinTrips[boxIndex + 1] =
      portTripChanges + 2 + dpMinTrips[windowBeginPointer];
  }

  return dpMinTrips[totalBoxes];
};
