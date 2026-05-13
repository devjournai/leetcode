/**
 * Operations On Tree
 * Intuition: The problem requires maintaining tree structure, lock status for nodes by users, and efficiently checking ancestors/descendants. An adjacency list for children helps with descendant checks, and a map stores current lock status.
 * Approach: 1. Initialize with parent array, a map for locked nodes (node -> user), and an adjacency list for children. 2. Lock: Check if node is unlocked; if so, lock it. 3. Unlock: Check if node is locked by the requesting user; if so, unlock it. 4. Upgrade: Verify three conditions: node is unlocked (O(1)), no locked ancestors (O(H) where H is tree height), and at least one locked descendant (O(N) for N nodes in subtree, using BFS). If all pass, unlock all found locked descendants and lock the node for the upgrading user.
 * Dry Run:
 * parent = [-1, 0, 0, 1, 1, 2, 2] (N=7 nodes)
 *
 * LockingTree(parent)
 *   this.initialParentsArray = [-1, 0, 0, 1, 1, 2, 2]
 *   this.lockedNodesRecord = Map{}
 *   this.childAdjacencyList = [[1,2], [3,4], [5,6], [], [], [], []]
 *
 * lock(3, 10)
 *   targetNodeIdentifier = 3, lockingUserIdentifier = 10
 *   this.lockedNodesRecord.has(3) is false.
 *   this.lockedNodesRecord.set(3, 10) -> {3:10}
 *   Returns true.
 *
 * lock(5, 12)
 *   targetNodeIdentifier = 5, lockingUserIdentifier = 12
 *   this.lockedNodesRecord.has(5) is false.
 *   this.lockedNodesRecord.set(5, 12) -> {3:10, 5:12}
 *   Returns true.
 *
 * upgrade(0, 100)
 *   upgradeCandidateNode = 0, upgradingUserIdentifier = 100
 *   1. Check unlocked: this.lockedNodesRecord.has(0) is false. (OK)
 *   2. Check no locked ancestors:
 *      currentAncestorWalker = 0
 *      While (0 !== -1):
 *        this.lockedNodesRecord.has(0) is false.
 *        currentAncestorWalker = this.initialParentsArray[0] = -1
 *      Loop ends. hasAncestorLocked is false. (OK)
 *   3. Check at least one locked descendant:
 *      bfsQueue = [0]
 *      queuePointer = 0
 *      hasAnyDescendantLocked = false
 *      descendantsToUnlock = []
 *      While (0 < 1): // Loop continues as long as queue has elements
 *        processingNodeInBfs = bfsQueue[0] (which is 0)
 *        queuePointer becomes 1
 *        this.lockedNodesRecord.has(0) is false.
 *        childrenOfCurrentNode = this.childAdjacencyList[0] = [1, 2]
 *        bfsQueue.push(1), bfsQueue.push(2) -> [0, 1, 2]
 *      While (1 < 3):
 *        processingNodeInBfs = bfsQueue[1] (which is 1)
 *        queuePointer becomes 2
 *        this.lockedNodesRecord.has(1) is false.
 *        childrenOfCurrentNode = this.childAdjacencyList[1] = [3, 4]
 *        bfsQueue.push(3), bfsQueue.push(4) -> [0, 1, 2, 3, 4]
 *      While (2 < 5):
 *        processingNodeInBfs = bfsQueue[2] (which is 2)
 *        queuePointer becomes 3
 *        this.lockedNodesRecord.has(2) is false.
 *        childrenOfCurrentNode = this.childAdjacencyList[2] = [5, 6]
 *        bfsQueue.push(5), bfsQueue.push(6) -> [0, 1, 2, 3, 4, 5, 6]
 *      While (3 < 7):
 *        processingNodeInBfs = bfsQueue[3] (which is 3)
 *        queuePointer becomes 4
 *        this.lockedNodesRecord.has(3) is true.
 *        hasAnyDescendantLocked = true.
 *        descendantsToUnlock.push(3) -> [3]
 *        childrenOfCurrentNode = this.childAdjacencyList[3] = []
 *      While (4 < 7):
 *        processingNodeInBfs = bfsQueue[4] (which is 4)
 *        queuePointer becomes 5
 *        this.lockedNodesRecord.has(4) is false.
 *        childrenOfCurrentNode = this.childAdjacencyList[4] = []
 *      While (5 < 7):
 *        processingNodeInBfs = bfsQueue[5] (which is 5)
 *        queuePointer becomes 6
 *        this.lockedNodesRecord.has(5) is true.
 *        hasAnyDescendantLocked = true.
 *        descendantsToUnlock.push(5) -> [3, 5]
 *        childrenOfCurrentNode = this.childAdjacencyList[5] = []
 *      While (6 < 7):
 *        processingNodeInBfs = bfsQueue[6] (which is 6)
 *        queuePointer becomes 7
 *        this.lockedNodesRecord.has(6) is false.
 *        childrenOfCurrentNode = this.childAdjacencyList[6] = []
 *      Loop ends.
 *      hasAnyDescendantLocked is true. (OK)
 *
 *   All conditions met. Perform upgrade actions:
 *   For nodeToClearLock in descendantsToUnlock:
 *     nodeToClearLock = 3: this.lockedNodesRecord.delete(3) -> {5:12}
 *     nodeToClearLock = 5: this.lockedNodesRecord.delete(5) -> {}
 *   this.lockedNodesRecord.set(0, 100) -> {0:100}
 *   Returns true.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var LockingTree = function (parent) {
  this.initialParentsArray = parent;
  this.lockedNodesRecord = new Map();
  this.childAdjacencyList = new Array(parent.length).fill().map(() => []);

  let nodeIndex = 0;
  let arrayLength = parent.length;
  for (nodeIndex = 1; nodeIndex < arrayLength; nodeIndex++) {
    let currentNodeParent = parent[nodeIndex];
    this.childAdjacencyList[currentNodeParent].push(nodeIndex);
  }
};

LockingTree.prototype.lock = function (num, user) {
  let targetNodeIdentifier = num;
  let lockingUserIdentifier = user;

  let isTargetNodeLocked = this.lockedNodesRecord.has(targetNodeIdentifier);
  if (isTargetNodeLocked) {
    return false;
  }

  this.lockedNodesRecord.set(targetNodeIdentifier, lockingUserIdentifier);
  return true;
};

LockingTree.prototype.unlock = function (num, user) {
  let nodeToRelease = num;
  let userReleasingLock = user;

  let isNodeCurrentlyLocked = this.lockedNodesRecord.has(nodeToRelease);
  if (!isNodeCurrentlyLocked) {
    return false;
  }

  let lockingUserForNode = this.lockedNodesRecord.get(nodeToRelease);
  if (lockingUserForNode !== userReleasingLock) {
    return false;
  }

  this.lockedNodesRecord.delete(nodeToRelease);
  return true;
};

LockingTree.prototype.upgrade = function (num, user) {
  let upgradeCandidateNode = num;
  let upgradingUserIdentifier = user;

  let isCandidateLockedCheck = this.lockedNodesRecord.has(upgradeCandidateNode);
  if (isCandidateLockedCheck) {
    return false;
  }

  let currentAncestorWalker = upgradeCandidateNode;
  let hasAncestorLocked = false;
  while (currentAncestorWalker !== -1) {
    if (this.lockedNodesRecord.has(currentAncestorWalker)) {
      hasAncestorLocked = true;
      break;
    }
    currentAncestorWalker = this.initialParentsArray[currentAncestorWalker];
  }
  if (hasAncestorLocked) {
    return false;
  }

  const bfsQueue = [upgradeCandidateNode];
  let queuePointer = 0;
  let hasAnyDescendantLocked = false;
  const descendantsToUnlock = [];

  while (queuePointer < bfsQueue.length) {
    const processingNodeInBfs = bfsQueue[queuePointer];
    queuePointer++;

    if (
      processingNodeInBfs !== upgradeCandidateNode &&
      this.lockedNodesRecord.has(processingNodeInBfs)
    ) {
      hasAnyDescendantLocked = true;
      descendantsToUnlock.push(processingNodeInBfs);
    }

    const childrenOfCurrentNode = this.childAdjacencyList[processingNodeInBfs];
    let childIndex = 0;
    let childrenCount = childrenOfCurrentNode.length;
    for (childIndex = 0; childIndex < childrenCount; childIndex++) {
      let childNodeEntry = childrenOfCurrentNode[childIndex];
      bfsQueue.push(childNodeEntry);
    }
  }

  if (!hasAnyDescendantLocked) {
    return false;
  }

  let unlockIterator = 0;
  let unlockCount = descendantsToUnlock.length;
  for (unlockIterator = 0; unlockIterator < unlockCount; unlockIterator++) {
    let nodeToClearLock = descendantsToUnlock[unlockIterator];
    this.lockedNodesRecord.delete(nodeToClearLock);
  }

  this.lockedNodesRecord.set(upgradeCandidateNode, upgradingUserIdentifier);
  return true;
};
