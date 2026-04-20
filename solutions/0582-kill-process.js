/**
 * Kill Process
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var killProcess = function (pid, ppid, kill) {
  const childrenMap = new Map();

  pid.forEach((childIdValue, iterationIndex) => {
    const parentIdValue = ppid[iterationIndex];
    if (!childrenMap.has(parentIdValue)) {
      childrenMap.set(parentIdValue, []);
    }
    childrenMap.get(parentIdValue).push(childIdValue);
  });

  const killedProcessesList = [];
  const processIdsToVisit = [kill];
  killedProcessesList.push(kill);

  let queuePointer = 0;

  while (queuePointer < processIdsToVisit.length) {
    const currentKillingNode = processIdsToVisit[queuePointer];
    queuePointer++;

    const immediateChildren = childrenMap.get(currentKillingNode);

    if (immediateChildren) {
      immediateChildren.forEach((singleChildId) => {
        killedProcessesList.push(singleChildId);
        processIdsToVisit.push(singleChildId);
      });
    }
  }

  return killedProcessesList;
};
