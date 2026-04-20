/**
 * Time Needed To Inform All Employees
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
      timeOfReception[currentManagerId] +
        notificationDuration[currentManagerId],
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
