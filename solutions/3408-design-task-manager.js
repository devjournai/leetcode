/**
 * Design Task Manager
 * Intuition: execTop always needs the live task with highest priority, breaking ties by larger taskId. Keep a record per taskId and a lazy max-heap of (priority, taskId, version) so edits/removals do not require an ordered set.
 * Approach: 1. taskRecords maps taskId -> {userId, priority, version}. 2. add/edit push a new heap entry and bump version. 3. rmv bumps version so old heap nodes are stale. 4. execTop pops until the top matches the current version, then deletes that task.
 * Dry Run: add(1,101,10), add(2,102,20), execTop → user 2. edit(101, 25), execTop → user 1.
 * Time Complexity: Constructor O(N log N); add/edit/rmv/execTop amortized O(log N)
 * Space Complexity: O(N)
 */

var TaskManager = function (tasks) {
  this.taskRecords = new Map();
  this.taskVersions = new Map();
  this.priorityHeap = [];

  for (const [userId, taskId, priority] of tasks) {
    this.add(userId, taskId, priority);
  }
};

TaskManager.prototype.siftUp = function (index) {
  const heap = this.priorityHeap;
  while (index > 0) {
    const parentIndex = (index - 1) >> 1;
    if (!this.isBetter(heap[index], heap[parentIndex])) {
      break;
    }
    const swap = heap[index];
    heap[index] = heap[parentIndex];
    heap[parentIndex] = swap;
    index = parentIndex;
  }
};

TaskManager.prototype.siftDown = function (index) {
  const heap = this.priorityHeap;
  while (true) {
    let bestIndex = index;
    const leftIndex = index * 2 + 1;
    const rightIndex = leftIndex + 1;
    if (
      leftIndex < heap.length &&
      this.isBetter(heap[leftIndex], heap[bestIndex])
    ) {
      bestIndex = leftIndex;
    }
    if (
      rightIndex < heap.length &&
      this.isBetter(heap[rightIndex], heap[bestIndex])
    ) {
      bestIndex = rightIndex;
    }
    if (bestIndex === index) {
      break;
    }
    const swap = heap[index];
    heap[index] = heap[bestIndex];
    heap[bestIndex] = swap;
    index = bestIndex;
  }
};

TaskManager.prototype.isBetter = function (firstEntry, secondEntry) {
  if (firstEntry.priority !== secondEntry.priority) {
    return firstEntry.priority > secondEntry.priority;
  }
  return firstEntry.taskId > secondEntry.taskId;
};

TaskManager.prototype.pushHeap = function (userId, taskId, priority, version) {
  this.priorityHeap.push({ userId, taskId, priority, version });
  this.siftUp(this.priorityHeap.length - 1);
};

TaskManager.prototype.nextVersion = function (taskId) {
  const version = (this.taskVersions.get(taskId) || 0) + 1;
  this.taskVersions.set(taskId, version);
  return version;
};

TaskManager.prototype.add = function (userId, taskId, priority) {
  const version = this.nextVersion(taskId);
  this.taskRecords.set(taskId, { userId, priority, version });
  this.pushHeap(userId, taskId, priority, version);
};

TaskManager.prototype.edit = function (taskId, newPriority) {
  const record = this.taskRecords.get(taskId);
  const version = this.nextVersion(taskId);
  this.taskRecords.set(taskId, {
    userId: record.userId,
    priority: newPriority,
    version,
  });
  this.pushHeap(record.userId, taskId, newPriority, version);
};

TaskManager.prototype.rmv = function (taskId) {
  this.nextVersion(taskId);
  this.taskRecords.delete(taskId);
};

TaskManager.prototype.execTop = function () {
  while (this.priorityHeap.length > 0) {
    const topEntry = this.priorityHeap[0];
    const lastEntry = this.priorityHeap.pop();
    if (this.priorityHeap.length > 0) {
      this.priorityHeap[0] = lastEntry;
      this.siftDown(0);
    }
    const currentRecord = this.taskRecords.get(topEntry.taskId);
    if (!currentRecord || currentRecord.version !== topEntry.version) {
      continue;
    }
    this.taskRecords.delete(topEntry.taskId);
    return topEntry.userId;
  }
  return -1;
};
