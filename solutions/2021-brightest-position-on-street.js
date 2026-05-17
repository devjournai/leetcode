/**
 * Brightest Position On Street
 * Intuition: The brightness of the street only changes at specific points defined by the lamps' ranges. We can represent these changes as "events" (a lamp starting or ending its illumination) and process them in order along the number line. By sweeping a virtual line across these event points, we can track the current brightness and determine the maximum brightness achieved, along with its corresponding position.
 * Approach: 1. Convert each street lamp's illumination range `[position - range, position + range]` into two events: a start event at `position - range` with a brightness increase of +1, and an end event at `position + range + 1` with a brightness decrease of -1. 2. Collect all these events into a single list. 3. Sort the events primarily by their coordinate in ascending order. If two events share the same coordinate, prioritize events that decrease brightness (-1 delta) before events that increase brightness (+1 delta). This ensures that when we evaluate a position `P`, any lamps whose illumination *ended* at `P-1` (represented by a `-1` delta event at `P`) are accounted for before lamps whose illumination *starts* at `P` (represented by a `+1` delta event at `P`). This ordering correctly captures the brightness level at `P` itself. 4. Iterate through the sorted events, maintaining a `currentBrightnessLevel`. For each event, update `currentBrightnessLevel` by adding the event's delta. If `currentBrightnessLevel` becomes strictly greater than the `maximumBrightness` found so far, update `maximumBrightness` and record the current event's coordinate as the `brightestPositionResult`. The strict `>` comparison ensures that if multiple positions have the same maximum brightness, the smallest coordinate is retained. 5. Return `brightestPositionResult`.
 * Dry Run: Input: lights = [[-3, 2], [1, 2]]
 * 1. Create Events:
 *    Lamp 1: [-3, 2] -> Lights up [-5, -1]. Events: [-5, +1] (start), [0, -1] (end at -1, so decrement at 0)
 *    Lamp 2: [1, 2] -> Lights up [-1, 3]. Events: [-1, +1] (start), [4, -1] (end at 3, so decrement at 4)
 *    All events: [[-5, 1], [0, -1], [-1, 1], [4, -1]]
 * 2. Sort Events (by coordinate then by delta ascending, -1 before +1):
 *    events = [[-5, 1], [-1, 1], [0, -1], [4, -1]]
 * 3. Sweep Line:
 *    maximumBrightness = 0, brightestPositionResult = 0, currentBrightnessLevel = 0
 *    - Process [-5, 1]:
 *      currentBrightnessLevel = 0 + 1 = 1
 *      (1 > 0) -> maximumBrightness = 1, brightestPositionResult = -5
 *    - Process [-1, 1]:
 *      currentBrightnessLevel = 1 + 1 = 2
 *      (2 > 1) -> maximumBrightness = 2, brightestPositionResult = -1
 *    - Process [0, -1]:
 *      currentBrightnessLevel = 2 - 1 = 1
 *      (1 is not > 2) -> no update
 *    - Process [4, -1]:
 *      currentBrightnessLevel = 1 - 1 = 0
 *      (0 is not > 2) -> no update
 * 4. Return brightestPositionResult = -1.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var brightestPosition = function (lights) {
  const eventList = [];

  for (const lampInfo of lights) {
    const lampPosition = lampInfo[0];
    const lampRange = lampInfo[1];

    const startCoverage = lampPosition - lampRange;
    const endCoveragePlusOne = lampPosition + lampRange + 1;

    eventList.push([startCoverage, 1]);
    eventList.push([endCoveragePlusOne, -1]);
  }

  eventList.sort((eventA, eventB) => {
    if (eventA[0] !== eventB[0]) {
      return eventA[0] - eventB[0];
    }
    return eventA[1] - eventB[1];
  });

  let maximumBrightness = 0;
  let brightestPositionResult = 0;
  let currentBrightnessLevel = 0;

  for (const eventEntry of eventList) {
    const currentCoordinate = eventEntry[0];
    const brightnessDelta = eventEntry[1];

    currentBrightnessLevel += brightnessDelta;

    if (currentBrightnessLevel > maximumBrightness) {
      maximumBrightness = currentBrightnessLevel;
      brightestPositionResult = currentCoordinate;
    }
  }

  return brightestPositionResult;
};
