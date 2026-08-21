/**
 * Design A Todo List
 * Intuition: Manage tasks across multiple users, tracking completion status, due dates, and tags efficiently. Rapid retrieval and filtering are key.
 * Approach: 1. Use a central map to store all tasks by their unique ID for O(1) lookup. 2. Maintain another map to store tasks grouped by user ID, enabling quick access to a user's task list. 3. Task objects will contain all relevant properties including ownership, status, and tags. 4. Filter and sort operations will be applied to user-specific task lists as needed.
 * Dry Run:
 * TodoList Initialization:
 *   - this.taskSequenceNumber = 1
 *   - this.userTaskRegistry = new Map()
 *   - this.globalTaskCollection = new Map()
 *
 * addTask(101, "Review PR", 5, ["work", "urgent"]):
 *   - currentGeneratedId = 1
 *   - newCreatedTask = { identification: 1, summary: "Review PR", deadlineDate: 5, taskCategories: new Set(["work", "urgent"]), isFinished: false, ownerIdentifier: 101 }
 *   - userTaskRegistry.set(101, []).push(newCreatedTask)
 *   - globalTaskCollection.set(1, newCreatedTask)
 *   - taskSequenceNumber becomes 2. Returns 1.
 *
 * addTask(101, "Schedule meeting", 10, ["work"]):
 *   - currentGeneratedId = 2
 *   - newCreatedTask = { identification: 2, summary: "Schedule meeting", deadlineDate: 10, taskCategories: new Set(["work"]), isFinished: false, ownerIdentifier: 101 }
 *   - userTaskRegistry.get(101).push(newCreatedTask)
 *   - globalTaskCollection.set(2, newCreatedTask)
 *   - taskSequenceNumber becomes 3. Returns 2.
 *
 * completeTask(101, 1):
 *   - taskObjectReference = globalTaskCollection.get(1) (which is task {id:1})
 *   - First if (taskObjectReference) is true.
 *   - Second if (taskObjectReference.ownerIdentifier === 101) (101 === 101) is true.
 *   - Third if (!taskObjectReference.isFinished) (!false) is true.
 *   - taskObjectReference.isFinished becomes true. Task {id:1} is now completed.
 *
 * getAllTasks(101):
 *   - userTaskListing = userTaskRegistry.get(101) -> [{id:1, summary:"Review PR", isFinished:true, ...}, {id:2, summary:"Schedule meeting", isFinished:false, ...}]
 *   - accumulatedPendingTasks = []
 *   - Loop:
 *     - For task {id:1}: isFinished is true, skip.
 *     - For task {id:2}: isFinished is false, add to accumulatedPendingTasks. accumulatedPendingTasks = [{id:2, ...}]
 *   - Sort accumulatedPendingTasks by deadlineDate. (Only one task, so effectively sorted).
 *   - Map accumulatedPendingTasks to summary: ["Schedule meeting"]
 *   - Returns ["Schedule meeting"].
 *
 * getTasksForTag(101, "work"):
 *   - userTaskListing = userTaskRegistry.get(101) -> [{id:1, summary:"Review PR", isFinished:true, ...}, {id:2, summary:"Schedule meeting", isFinished:false, ...}]
 *   - filteredTaggedTasks = []
 *   - Loop:
 *     - For task {id:1}: isFinished is true, skip.
 *     - For task {id:2}: isFinished is false AND taskCategories.has("work") is true. Add to filteredTaggedTasks. filteredTaggedTasks = [{id:2, ...}]
 *   - Sort filteredTaggedTasks by deadlineDate. (Only one task, so effectively sorted).
 *   - Map filteredTaggedTasks to summary: ["Schedule meeting"]
 *   - Returns ["Schedule meeting"].
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var TodoList = function () {
  this.taskSequenceNumber = 1;
  this.userTaskRegistry = new Map();
  this.globalTaskCollection = new Map();
};

TodoList.prototype.addTask = function (
  userIdentifier,
  taskSummaryInput,
  deadlineValue,
  categoryTags
) {
  const currentGeneratedId = this.taskSequenceNumber++;
  const newCreatedTask = {
    identification: currentGeneratedId,
    summary: taskSummaryInput,
    deadlineDate: deadlineValue,
    taskCategories: new Set(categoryTags),
    isFinished: false,
    ownerIdentifier: userIdentifier,
  };

  const userTaskListing = this.userTaskRegistry.get(userIdentifier);
  if (!userTaskListing) {
    this.userTaskRegistry.set(userIdentifier, [newCreatedTask]);
  } else {
    userTaskListing.push(newCreatedTask);
  }

  this.globalTaskCollection.set(currentGeneratedId, newCreatedTask);

  return currentGeneratedId;
};

TodoList.prototype.getAllTasks = function (userIdentifier) {
  const userTaskListing = this.userTaskRegistry.get(userIdentifier);
  if (!userTaskListing) {
    return [];
  }

  const accumulatedPendingTasks = [];
  for (const singleTaskItem of userTaskListing) {
    if (!singleTaskItem.isFinished) {
      accumulatedPendingTasks.push(singleTaskItem);
    }
  }

  accumulatedPendingTasks.sort(
    (firstTask, secondTask) => firstTask.deadlineDate - secondTask.deadlineDate
  );

  const taskDescriptionResults = accumulatedPendingTasks.map(
    (item) => item.summary
  );
  return taskDescriptionResults;
};

TodoList.prototype.getTasksForTag = function (userIdentifier, specificTag) {
  const userTaskListing = this.userTaskRegistry.get(userIdentifier);
  if (!userTaskListing) {
    return [];
  }

  const filteredTaggedTasks = [];
  for (const currentElement of userTaskListing) {
    if (
      !currentElement.isFinished &&
      currentElement.taskCategories.has(specificTag)
    ) {
      filteredTaggedTasks.push(currentElement);
    }
  }

  filteredTaggedTasks.sort(
    (firstItem, secondItem) => firstItem.deadlineDate - secondItem.deadlineDate
  );

  const tagDescriptionResults = filteredTaggedTasks.map((item) => item.summary);
  return tagDescriptionResults;
};

TodoList.prototype.completeTask = function (
  userIdentifier,
  taskIdentifierToComplete
) {
  const taskObjectReference = this.globalTaskCollection.get(
    taskIdentifierToComplete
  );
  if (taskObjectReference) {
    if (taskObjectReference.ownerIdentifier === userIdentifier) {
      if (!taskObjectReference.isFinished) {
        taskObjectReference.isFinished = true;
      }
    }
  }
};
