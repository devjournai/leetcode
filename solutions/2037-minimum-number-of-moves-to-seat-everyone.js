/**
 * Minimum Number Of Moves To Seat Everyone
 * Intuition: To minimize the total moves required to seat all students, we should minimize the distance each student travels. On a 1D line, this is achieved by pairing the student at the smallest position with the seat at the smallest position, the student at the second smallest position with the seat at the second smallest position, and so on. Any other pairing would result in a larger total sum of distances due to 'crossings' which introduce extra moves.
 * Approach: 1. Sort the given `seats` array in non-decreasing order. 2. Sort the given `students` array in non-decreasing order. 3. Initialize a variable `totalMovesCalculation` to zero. 4. Iterate from `loopIndex` 0 up to `n-1` (where `n` is the length of the arrays). 5. In each iteration, calculate the absolute difference between `seats[loopIndex]` and `students[loopIndex]`. 6. Add this `currentDifferenceMagnitude` to `totalMovesCalculation`. 7. After the loop completes, `totalMovesCalculation` will hold the minimum number of moves. 8. Return `totalMovesCalculation`.
 * Dry Run: seats = [3, 1, 5], students = [2, 7, 4]
 * Initial: seats = [3, 1, 5], students = [2, 7, 4]
 * 1. seats sorted: [1, 3, 5]
 * 2. students sorted: [2, 4, 7]
 * 3. totalMovesCalculation = 0
 * 4. Loop (loopIndex from 0 to 2):
 *    - loopIndex = 0:
 *      seatAtCurrentPos = seats[0] = 1
 *      studentAtCurrentPos = students[0] = 2
 *      currentDifferenceMagnitude = Math.abs(1 - 2) = 1
 *      totalMovesCalculation = 0 + 1 = 1
 *    - loopIndex = 1:
 *      seatAtCurrentPos = seats[1] = 3
 *      studentAtCurrentPos = students[1] = 4
 *      currentDifferenceMagnitude = Math.abs(3 - 4) = 1
 *      totalMovesCalculation = 1 + 1 = 2
 *    - loopIndex = 2:
 *      seatAtCurrentPos = seats[2] = 5
 *      studentAtCurrentPos = students[2] = 7
 *      currentDifferenceMagnitude = Math.abs(5 - 7) = 2
 *      totalMovesCalculation = 2 + 2 = 4
 * 5. Return totalMovesCalculation = 4.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var minMovesToSeat = function (seats, students) {
  seats.sort((positionA, positionB) => positionA - positionB);
  students.sort((personA, personB) => personA - personB);

  let totalMovesCalculation = 0;
  const arrayLengthValue = seats.length;

  for (let loopIndex = 0; loopIndex < arrayLengthValue; loopIndex++) {
    const seatAtCurrentPos = seats[loopIndex];
    const studentAtCurrentPos = students[loopIndex];
    const currentDifferenceMagnitude = Math.abs(
      seatAtCurrentPos - studentAtCurrentPos,
    );
    totalMovesCalculation += currentDifferenceMagnitude;
  }

  return totalMovesCalculation;
};
