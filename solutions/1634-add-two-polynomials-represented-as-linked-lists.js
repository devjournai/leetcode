/* Add Two Polynomials Represented as Linked Lists
 * Time Complexity: O(M + N)
 * Space Complexity: O(M + N)
 */
var addPoly = function (poly1, poly2) {
  const resultDummyHead = new PolyNode();
  let currentResultNode = resultDummyHead;
  let firstPolyPointer = poly1;
  let secondPolyPointer = poly2;

  while (firstPolyPointer || secondPolyPointer) {
    let currentCoefficient;
    let currentPower;

    if (firstPolyPointer && secondPolyPointer) {
      if (firstPolyPointer.power > secondPolyPointer.power) {
        currentCoefficient = firstPolyPointer.coefficient;
        currentPower = firstPolyPointer.power;
        firstPolyPointer = firstPolyPointer.next;
      } else if (secondPolyPointer.power > firstPolyPointer.power) {
        currentCoefficient = secondPolyPointer.coefficient;
        currentPower = secondPolyPointer.power;
        secondPolyPointer = secondPolyPointer.next;
      } else {
        currentCoefficient =
          firstPolyPointer.coefficient + secondPolyPointer.coefficient;
        currentPower = firstPolyPointer.power;
        firstPolyPointer = firstPolyPointer.next;
        secondPolyPointer = secondPolyPointer.next;
      }
    } else if (firstPolyPointer) {
      currentCoefficient = firstPolyPointer.coefficient;
      currentPower = firstPolyPointer.power;
      firstPolyPointer = firstPolyPointer.next;
    } else {
      currentCoefficient = secondPolyPointer.coefficient;
      currentPower = secondPolyPointer.power;
      secondPolyPointer = secondPolyPointer.next;
    }

    if (currentCoefficient !== 0) {
      currentResultNode.next = new PolyNode(currentCoefficient, currentPower);
      currentResultNode = currentResultNode.next;
    }
  }

  return resultDummyHead.next;
};
