/**
 * Put Boxes Into The Warehouse II
 * Intuition: Boxes may enter from either end. Place the largest remaining box at the currently shorter-constrained end if it fits.
 * Approach: 1. Sort boxes. 2. Two pointers on warehouse with running min heights from each end. 3. From the largest box, occupy left, right, or skip.
 * Dry Run: boxes = [1,2,2,3,4], warehouse = [3,4,1,2].
 *   - Place from both ends → 4 boxes.
 * Time Complexity: O(N log N + M)
 * Space Complexity: O(log N)
 */
var maxBoxesInWarehouse = function (boxes, warehouse) {
  boxes.sort(
    (firstDimension, secondDimension) => firstDimension - secondDimension
  );

  let currentLeftIndex = 0;
  let currentRightIndex = warehouse.length - 1;
  let boxesSuccessfullyPlaced = 0;

  let boxSelectionIndex = boxes.length - 1;

  let minimumPassThroughHeightLeft = warehouse[0];
  let minimumPassThroughHeightRight = warehouse[warehouse.length - 1];

  while (boxSelectionIndex >= 0 && currentLeftIndex <= currentRightIndex) {
    let selectedBoxHeight = boxes[boxSelectionIndex];

    const canOccupyLeft = selectedBoxHeight <= minimumPassThroughHeightLeft;
    const canOccupyRight = selectedBoxHeight <= minimumPassThroughHeightRight;

    if (canOccupyLeft && canOccupyRight) {
      if (minimumPassThroughHeightLeft <= minimumPassThroughHeightRight) {
        boxesSuccessfullyPlaced++;
        currentLeftIndex++;
        if (currentLeftIndex <= currentRightIndex) {
          minimumPassThroughHeightLeft = Math.min(
            warehouse[currentLeftIndex],
            minimumPassThroughHeightLeft
          );
        }
      } else {
        boxesSuccessfullyPlaced++;
        currentRightIndex--;
        if (currentRightIndex >= currentLeftIndex) {
          minimumPassThroughHeightRight = Math.min(
            warehouse[currentRightIndex],
            minimumPassThroughHeightRight
          );
        }
      }
    } else if (canOccupyLeft) {
      boxesSuccessfullyPlaced++;
      currentLeftIndex++;
      if (currentLeftIndex <= currentRightIndex) {
        minimumPassThroughHeightLeft = Math.min(
          warehouse[currentLeftIndex],
          minimumPassThroughHeightLeft
        );
      }
    } else if (canOccupyRight) {
      boxesSuccessfullyPlaced++;
      currentRightIndex--;
      if (currentRightIndex >= currentLeftIndex) {
        minimumPassThroughHeightRight = Math.min(
          warehouse[currentRightIndex],
          minimumPassThroughHeightRight
        );
      }
    } else {
    }
    boxSelectionIndex--;
  }

  return boxesSuccessfullyPlaced;
};
