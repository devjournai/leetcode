/**
 * Count Houses In A Circular Street
 * Intuition: To count the houses in a circular street, we can mark a unique starting house and then traverse the street, counting each house until we encounter our marked starting house again.
 * Approach: 1. First, establish a known state for all doors: we ensure all doors on the street are closed. This is done by traversing the street a sufficient number of times (up to 'k' houses, the maximum possible street length) and closing each door. We then return to our initial starting position. 2. Next, we uniquely mark our starting house by opening its door. At this point, only the starting house's door is open, and all other doors are closed. 3. Finally, we traverse the street again, starting from the house next to our marked house, counting each house until we find an open door, which signifies we have returned to our starting house. The count at this point represents the total number of houses.
 * Dry Run:
 * Let N=3, k=5. Street: [?, ?, ?]. Initial position at House 0.
 *
 * 1. Setup Phase:
 *    - `street.closeDoor()`: House 0 is closed. Street state: [X, ?, ?].
 *    - `doorCloser = 0;`
 *    - While loop (doorCloser < k, i.e., 5 iterations):
 *      - Iter 1 (doorCloser=0): `street.closeDoor()` (House 0 remains closed). `street.moveRight()` (to House 1). `doorCloser=1`. State: [X, ?, ?].
 *      - Iter 2 (doorCloser=1): `street.closeDoor()` (House 1 closed). `street.moveRight()` (to House 2). `doorCloser=2`. State: [X, X, ?].
 *      - Iter 3 (doorCloser=2): `street.closeDoor()` (House 2 closed). `street.moveRight()` (to House 0). `doorCloser=3`. State: [X, X, X].
 *      - Iter 4 (doorCloser=3): `street.closeDoor()` (House 0 remains closed). `street.moveRight()` (to House 1). `doorCloser=4`. State: [X, X, X].
 *      - Iter 5 (doorCloser=4): `street.closeDoor()` (House 1 remains closed). `street.moveRight()` (to House 2). `doorCloser=5`. State: [X, X, X].
 *    - Loop ends. `doorCloser` is 5. Current position at House 2. All doors are closed.
 *
 *    - Return to start (House 0):
 *    - `returner = 0;`
 *    - While loop (returner < doorCloser, i.e., 5 iterations):
 *      - Iter 1 (returner=0): `street.moveLeft()` (to House 1). `returner=1`.
 *      - Iter 2 (returner=1): `street.moveLeft()` (to House 0). `returner=2`.
 *      - Iter 3 (returner=2): `street.moveLeft()` (to House 2). `returner=3`.
 *      - Iter 4 (returner=3): `street.moveLeft()` (to House 1). `returner=4`.
 *      - Iter 5 (returner=4): `street.moveLeft()` (to House 0). `returner=5`.
 *    - Loop ends. `returner` is 5. Current position at House 0. All doors are closed.
 *
 *    - Mark starting house:
 *    - `street.openDoor()`: House 0 is opened. Street state: [O, X, X].
 *
 * 2. Counting Phase:
 *    - `houseTotal = 1;` (for the marked House 0).
 *    - `street.moveRight()` (to House 1).
 *    - While loop `(!street.isDoorOpen())`:
 *      - Iter 1: Current at House 1. `street.isDoorOpen()` is false.
 *        - `houseTotal = 2;`
 *        - `street.moveRight()` (to House 2).
 *      - Iter 2: Current at House 2. `street.isDoorOpen()` is false.
 *        - `houseTotal = 3;`
 *        - `street.moveRight()` (to House 0).
 *      - Iter 3: Current at House 0. `street.isDoorOpen()` is true. Loop condition `!true` is false. Loop terminates.
 *
 *    - Return `houseTotal` (which is 3).
 *
 * Time Complexity: O(K + N), where K is the given maximum bound and N is the actual number of houses. Since N <= K, this simplifies to O(K). The first two loops run K times each. The final counting loop runs N times.
 * Space Complexity: O(1). Only a few integer variables are used.
*/
var houseCount = function(street, k) {
  street.closeDoor();

  let doorCloser = 0;
  while (doorCloser < k) {
    street.closeDoor();
    street.moveRight();
    doorCloser++;
  }

  let returner = 0;
  while (returner < doorCloser) {
    street.moveLeft();
    returner++;
  }

  street.openDoor();
  let houseTotal = 1;
  street.moveRight();

  while (!street.isDoorOpen()) {
    houseTotal++;
    street.moveRight();
  }

  return houseTotal;
};