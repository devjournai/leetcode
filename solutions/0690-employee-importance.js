/**
 * Employee Importance
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var GetImportance = function (employees, id) {
  const employeeRegistry = new Map();
  for (const currentEmployeeEntry of employees) {
    employeeRegistry.set(currentEmployeeEntry.id, currentEmployeeEntry);
  }

  let totalImportanceValue = 0;
  const processingQueue = [id];

  while (processingQueue.length > 0) {
    const currentProcessingId = processingQueue.pop();
    const employeeDetails = employeeRegistry.get(currentProcessingId);

    if (employeeDetails) {
      totalImportanceValue += employeeDetails.importance;

      for (const subordinateIdentifier of employeeDetails.subordinates) {
        processingQueue.push(subordinateIdentifier);
      }
    }
  }

  return totalImportanceValue;
};
