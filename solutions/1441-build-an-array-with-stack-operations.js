/**
 * Build An Array With Stack Operations
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
