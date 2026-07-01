/**
 * Time Taken To Cross The Door
 * Intuition: Simulate the door operations second by second, managing separate queues for entering and exiting persons, and dynamically adjusting priority based on the door's last usage. Efficiently skip idle time when no one is at the door.
 * Approach:
 * 1. Initialize two queues: `personsEnteringQueue` (for people wanting to enter) and `personsExitingQueue` (for people wanting to exit). Both queues store person indices.
 * 2. Set `currentMoment` to 0, `priorDoorMode` to 1 (indicating 'exit' preference or 'idle' state), `personIndexCursor` to 0, `totalPersonsCount` from `arrival.length`, and `finalCrossingTimes` array for results.
 * 3. Use a `do-while` loop for the main simulation, continuing as long as there are unarrived persons or non-empty queues.
 * 4. Inside the loop, first, process all persons whose `arrival` time is less than or equal to `currentMoment`. Add them to `personsEnteringQueue` or `personsExitingQueue` based on their `state`. This step ensures all ready persons are waiting.
 * 5. Determine which person crosses the door for the `currentMoment` using a `switch` statement based on `priorDoorMode`:
 *    a. If `priorDoorMode` is 1 (exit-priority or idle): Prioritize `personsExitingQueue`. If non-empty, a person exits, and `nextDoorMode` remains 1. If empty but `personsEnteringQueue` is non-empty, a person enters, and `nextDoorMode` becomes 0. If both are empty, `nextDoorMode` remains 1 (door stays idle with exit-priority).
 *    b. If `priorDoorMode` is 0 (enter-priority): Prioritize `personsEnteringQueue`. If non-empty, a person enters, and `nextDoorMode` remains 0. If empty but `personsExitingQueue` is non-empty, a person exits, and `nextDoorMode` becomes 1. If both are empty, `nextDoorMode` becomes 1 (door becomes idle with exit-priority).
 * 6. Store the crossing time for the person who crossed (if any) in `finalCrossingTimes`.
 * 7. Update `priorDoorMode` with `nextDoorMode`.
 * 8. Increment `currentMoment`. If no one crossed, both queues were empty, and there are still persons to arrive, `currentMoment` is optimized to jump directly to the next person's arrival time, and `priorDoorMode` resets to 1 (exit-priority).
 * 9. Return `finalCrossingTimes`.
 * Dry Run:
 * arrival = [0, 1, 1], state = [0, 1, 0] (P0 enters at 0, P1 exits at 1, P2 enters at 1)
 *
 * Initialize:
 *  personsEnteringQueue = [], personsExitingQueue = []
 *  currentMoment = 0
 *  priorDoorMode = 1 (exit/idle)
 *  personIndexCursor = 0
 *  totalPersonsCount = 3
 *  finalCrossingTimes = [undefined, undefined, undefined]
 *
 * do-while Loop iteration 1 (currentMoment = 0):
 *  - Process arrivals (personIndexCursor = 0, arrival[0]=0 <= 0):
 *    - state[0]=0. personsEnteringQueue.push(0). personIndexCursor = 1.
 *  - Queues: personsEnteringQueue = [0], personsExitingQueue = []
 *  - Decision (switch on priorDoorMode = 1):
 *    - exitingQueue empty.
 *    - enteringQueue has [0]. P0 crosses.
 *    - finalCrossingTimes[0] = 0. didSomeoneCrossAtThisSecond = true. nextDoorMode = 0.
 *  - Update priorDoorMode = 0.
 *  - Time increment: didSomeoneCrossAtThisSecond is true. currentMoment++. currentMoment = 1.
 *  - do-while condition: (1 < 3 || [].length > 0 || [].length > 0) -> true.
 *
 * do-while Loop iteration 2 (currentMoment = 1):
 *  - Process arrivals (personIndexCursor = 1):
 *    - arrival[1]=1 <= 1, state[1]=1. personsExitingQueue.push(1). personIndexCursor = 2.
 *    - arrival[2]=1 <= 1, state[2]=0. personsEnteringQueue.push(2). personIndexCursor = 3.
 *  - Queues: personsEnteringQueue = [2], personsExitingQueue = [1]
 *  - Decision (switch on priorDoorMode = 0):
 *    - enteringQueue has [2]. P2 crosses (smallest index rule).
 *    - finalCrossingTimes[2] = 1. didSomeoneCrossAtThisSecond = true. nextDoorMode = 0.
 *  - Update priorDoorMode = 0.
 *  - Time increment: didSomeoneCrossAtThisSecond is true. currentMoment++. currentMoment = 2.
 *  - do-while condition: (3 < 3 || [].length > 0 || [1].length > 0) -> true.
 *
 * do-while Loop iteration 3 (currentMoment = 2):
 *  - Process arrivals (personIndexCursor = 3): None.
 *  - Queues: personsEnteringQueue = [], personsExitingQueue = [1]
 *  - Decision (switch on priorDoorMode = 0):
 *    - enteringQueue empty.
 *    - exitingQueue has [1]. P1 crosses.
 *    - finalCrossingTimes[1] = 2. didSomeoneCrossAtThisSecond = true. nextDoorMode = 1.
 *  - Update priorDoorMode = 1.
 *  - Time increment: didSomeoneCrossAtThisSecond is true. currentMoment++. currentMoment = 3.
 *  - do-while condition: (3 < 3 || [].length > 0 || [].length > 0) -> false.
 *
 * Loop terminates.
 * Return finalCrossingTimes = [0, 2, 1].
 * Time Complexity: O(N + M)
 * Space Complexity: O(N)
 */
var timeTaken = function (arrival, state) {
  const personsEnteringQueue = [];
  const personsExitingQueue = [];
  let currentMoment = 0;
  let priorDoorMode = 1;
  let personIndexCursor = 0;
  const totalPersonsCount = arrival.length;
  const finalCrossingTimes = new Array(totalPersonsCount);

  do {
    while (
      personIndexCursor < totalPersonsCount &&
      arrival[personIndexCursor] <= currentMoment
    ) {
      if (state[personIndexCursor] === 0) {
        personsEnteringQueue.push(personIndexCursor);
      } else {
        personsExitingQueue.push(personIndexCursor);
      }
      personIndexCursor++;
    }

    let didSomeoneCrossAtThisSecond = false;
    let nextDoorMode = priorDoorMode;

    switch (priorDoorMode) {
      case 1:
        if (personsExitingQueue.length > 0) {
          const personIdExiting = personsExitingQueue.shift();
          finalCrossingTimes[personIdExiting] = currentMoment;
          didSomeoneCrossAtThisSecond = true;
          nextDoorMode = 1;
        } else if (personsEnteringQueue.length > 0) {
          const personIdEntering = personsEnteringQueue.shift();
          finalCrossingTimes[personIdEntering] = currentMoment;
          didSomeoneCrossAtThisSecond = true;
          nextDoorMode = 0;
        } else {
          nextDoorMode = 1;
        }
        break;
      case 0:
        if (personsEnteringQueue.length > 0) {
          const personIdEntering = personsEnteringQueue.shift();
          finalCrossingTimes[personIdEntering] = currentMoment;
          didSomeoneCrossAtThisSecond = true;
          nextDoorMode = 0;
        } else if (personsExitingQueue.length > 0) {
          const personIdExiting = personsExitingQueue.shift();
          finalCrossingTimes[personIdExiting] = currentMoment;
          didSomeoneCrossAtThisSecond = true;
          nextDoorMode = 1;
        } else {
          nextDoorMode = 1;
        }
        break;
    }

    priorDoorMode = nextDoorMode;

    if (
      !didSomeoneCrossAtThisSecond &&
      personsEnteringQueue.length === 0 &&
      personsExitingQueue.length === 0 &&
      personIndexCursor < totalPersonsCount
    ) {
      currentMoment = arrival[personIndexCursor];
      priorDoorMode = 1;
    } else {
      currentMoment++;
    }
  } while (
    personIndexCursor < totalPersonsCount ||
    personsEnteringQueue.length > 0 ||
    personsExitingQueue.length > 0
  );

  return finalCrossingTimes;
};
