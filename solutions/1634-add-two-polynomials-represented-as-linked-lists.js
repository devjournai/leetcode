/**
 * Add Two Polynomials Represented as Linked Lists
 * Intuition: Both lists are sorted by descending power, so merge like sorted lists: take the higher power, or add coefficients when powers match (drop zero sums).
 * Approach: 1. Dummy head and two pointers. 2. While either list remains, pick the larger power, or sum equal powers. 3. Append a node only if the coefficient is nonzero. 4. Return dummy.next.
 * Dry Run: 2x^2 + 4x + 3  and  -4x + 1.
 *   - Powers 2 then 1: 4-4=0 dropped, then 3+1=4 → 2x^2 + 4.
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
