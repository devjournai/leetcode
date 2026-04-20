/**
 * Delivering Boxes From Storage To Ports
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
