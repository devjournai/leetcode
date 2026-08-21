/**
 * Employee Importance
 * Intuition: Importance of an employee is their own value plus every subordinate in the org tree. A map from id to record plus a stack/queue DFS/BFS walk sums them.
 * Approach: 1. Fill `employeeRegistry` keyed by id. 2. Start `processingQueue` with `id`. 3. Pop, add `importance`, push all `subordinates`. 4. Return `totalImportanceValue`.
 * Dry Run: employees=[[1,5,[2,3]],[2,3,[]],[3,3,[]]], id=1. Queue 1→ add 5, push 2,3 → add 3+3. total=11.
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
