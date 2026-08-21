/**
 * Design Linked List
 * Intuition: Singly linked list with `listHead` and `listSize`. Index ops walk from the head; head insert is O(1), tail walks to the last node.
 * Approach: 1. `get` walks `indexQuery` nodes or -1. 2. `addAtHead` prepends. 3. `addAtTail` walks to null next. 4. `addAtIndex` delegates 0/size to head/tail else splice after index-1. 5. `deleteAtIndex` relinks around the node.
 * Dry Run: addAtHead(1) → [1]; addAtTail(3) → [1,3]; addAtIndex(1,2) → [1,2,3]; get(1)=2; deleteAtIndex(1) → [1,3]; get(1)=3.
 * Time Complexity: MyLinkedList(): O(1), get(): O(N), addAtHead(): O(1), addAtTail(): O(N), addAtIndex(): O(N), deleteAtIndex(): O(N)
 * Space Complexity: MyLinkedList(): O(1), get(): O(1), addAtHead(): O(1), addAtTail(): O(1), addAtIndex(): O(1), deleteAtIndex(): O(1)
 */

class LinkedListNode {
  constructor(valueData) {
    this.valueData = valueData;
    this.nextNode = null;
  }
}

var MyLinkedList = function () {
  this.listHead = null;
  this.listSize = 0;
};

MyLinkedList.prototype.get = function (indexQuery) {
  if (indexQuery < 0 || indexQuery >= this.listSize) {
    return -1;
  }
  let currentTraversalNode = this.listHead;
  let counterForTraversal = 0;
  while (counterForTraversal < indexQuery) {
    currentTraversalNode = currentTraversalNode.nextNode;
    counterForTraversal++;
  }
  return currentTraversalNode.valueData;
};

MyLinkedList.prototype.addAtHead = function (newValue) {
  const newNodeAtHead = new LinkedListNode(newValue);
  newNodeAtHead.nextNode = this.listHead;
  this.listHead = newNodeAtHead;
  this.listSize++;
};

MyLinkedList.prototype.addAtTail = function (appendValue) {
  const newNodeAtTail = new LinkedListNode(appendValue);
  if (this.listHead === null) {
    this.listHead = newNodeAtTail;
  } else {
    let lastNodeFinder = this.listHead;
    while (lastNodeFinder.nextNode !== null) {
      lastNodeFinder = lastNodeFinder.nextNode;
    }
    lastNodeFinder.nextNode = newNodeAtTail;
  }
  this.listSize++;
};

MyLinkedList.prototype.addAtIndex = function (insertIndex, insertValue) {
  if (insertIndex < 0 || insertIndex > this.listSize) {
    return;
  }
  if (insertIndex === 0) {
    this.addAtHead(insertValue);
    return;
  }
  if (insertIndex === this.listSize) {
    this.addAtTail(insertValue);
    return;
  }

  const newNodeForInsertion = new LinkedListNode(insertValue);
  let previousNodeSeeker = this.listHead;
  let countToIndex = 0;
  while (countToIndex < insertIndex - 1) {
    previousNodeSeeker = previousNodeSeeker.nextNode;
    countToIndex++;
  }
  newNodeForInsertion.nextNode = previousNodeSeeker.nextNode;
  previousNodeSeeker.nextNode = newNodeForInsertion;
  this.listSize++;
};

MyLinkedList.prototype.deleteAtIndex = function (deletePosition) {
  if (deletePosition < 0 || deletePosition >= this.listSize) {
    return;
  }
  if (deletePosition === 0) {
    this.listHead = this.listHead.nextNode;
    this.listSize--;
    return;
  }

  let nodeBeforeDeletion = this.listHead;
  let deletionCounter = 0;
  while (deletionCounter < deletePosition - 1) {
    nodeBeforeDeletion = nodeBeforeDeletion.nextNode;
    deletionCounter++;
  }
  nodeBeforeDeletion.nextNode = nodeBeforeDeletion.nextNode.nextNode;
  this.listSize--;
};
