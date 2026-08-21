/**
 * Time Needed To Inform All Employees
 * Intuition: News flows down the manager tree. An employee receives news at managerReceive + informTime[manager]. The answer is the maximum time anyone finishes informing their reports.
 * Approach: 1. Build adjacency lists of subordinates. 2. BFS from the head with receive time 0. 3. For each manager, set each subordinate's receive time and track max(receive + informTime). 4. Return that maximum.
 * Dry Run: n = 6, headID = 2, manager = [2,2,-1,2,2,2], informTime = [0,0,1,0,0,0].
 *   - Head 2 informs five reports in 1 minute. Max = 1.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var numOfMinutes = function (n, headID, manager, informTime) {
  const totalEmployees = n;
  const companyHeadId = headID;
  const managerHierarchy = manager;
  const notificationDuration = informTime;

  const subordinateMap = Array.from({ length: totalEmployees }, () => []);

  for (let employeeIndex = 0; employeeIndex < totalEmployees; employeeIndex++) {
    if (managerHierarchy[employeeIndex] !== -1) {
      subordinateMap[managerHierarchy[employeeIndex]].push(employeeIndex);
    }
  }

  const timeOfReception = new Array(totalEmployees).fill(0);
  const employeeQueue = [];

  timeOfReception[companyHeadId] = 0;
  employeeQueue.push(companyHeadId);

  let maximumPropagationTime = 0;

  while (employeeQueue.length > 0) {
    const currentManagerId = employeeQueue.shift();

    maximumPropagationTime = Math.max(
      maximumPropagationTime,
      timeOfReception[currentManagerId] + notificationDuration[currentManagerId]
    );

    for (const subordinateIdentifier of subordinateMap[currentManagerId]) {
      const newsReceptionMoment =
        timeOfReception[currentManagerId] +
        notificationDuration[currentManagerId];
      timeOfReception[subordinateIdentifier] = newsReceptionMoment;
      employeeQueue.push(subordinateIdentifier);
    }
  }

  return maximumPropagationTime;
};
