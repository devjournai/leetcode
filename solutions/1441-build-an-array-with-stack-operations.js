/**
 * Build An Array With Stack Operations
 * Intuition: The stream is 1,2,...,n. For each needed target value, Push/Pop the skipped stream numbers, then Push the needed one.
 * Approach: 1. streamTracker starts at 1. 2. For each requiredNumber in target, while streamTracker < requiredNumber, append Push then Pop. 3. Append Push and advance both pointers. 4. Return the operations list (n is unused once target is built).
 * Dry Run: target = [1,3], n = 3
 *   - need 1: Push, stream=2
 *   - need 3: stream 2 skipped via Push,Pop then Push 3
 *   - ["Push","Push","Pop","Push"]
 * Time Complexity: O(max(target))
 * Space Complexity: O(max(target))
 */
var buildArray = function (target, n) {
  const operationsList = [];
  let streamTracker = 1;
  let targetIndexPosition = 0;

  while (targetIndexPosition < target.length) {
    let requiredNumber = target[targetIndexPosition];

    while (streamTracker < requiredNumber) {
      operationsList.push("Push");
      operationsList.push("Pop");
      streamTracker++;
    }

    operationsList.push("Push");
    streamTracker++;
    targetIndexPosition++;
  }

  return operationsList;
};
