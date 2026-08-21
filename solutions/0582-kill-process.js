/**
 * Kill Process
 * Intuition: Killing a process also kills every descendant. Build a parent→children map from `pid`/`ppid`, then BFS from `kill` and collect every reachable id.
 * Approach: 1. For each `childIdValue` at `iterationIndex`, push it onto `childrenMap.get(ppid[iterationIndex])`. 2. Start `processIdsToVisit` and `killedProcessesList` with `kill`. 3. While `queuePointer` walks the queue, enqueue each `singleChildId` from `childrenMap.get(currentKillingNode)` and append it to the result. 4. Return `killedProcessesList`.
 * Dry Run: pid=[1,3,10,5], ppid=[3,0,5,3], kill=5.
 *   - Map: 3→[1,5], 0→[3], 5→[10]. Queue [5] → add 10 → [5,10]. No further children. Return [5,10].
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
