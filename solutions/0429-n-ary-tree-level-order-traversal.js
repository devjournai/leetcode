/**
 * N Ary Tree Level Order Traversal
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var levelOrder = function (root) {
    const traversalOutputList = [];

    if (!root) {
        return traversalOutputList;
    }

    const processingQueue = [root];

    while (processingQueue.length > 0) {
        const currentLevelCount = processingQueue.length;
        const valuesForThisLevel = [];

        for (let nodeIterator = 0; nodeIterator < currentLevelCount; nodeIterator++) {
            const elementDequeued = processingQueue.shift();
            valuesForThisLevel.push(elementDequeued.val);

            const childNodesList = elementDequeued.children;
            for (let childIterator = 0; childIterator < childNodesList.length; childIterator++) {
                const singleChildNode = childNodesList[childIterator];
                processingQueue.push(singleChildNode);
            }
        }
        traversalOutputList.push(valuesForThisLevel);
    }

    return traversalOutputList;
};