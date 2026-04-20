/**
 * Clone Graph
 * Time Complexity: O(V + E)
 * Space Complexity: O(V)
*/
var cloneGraph = function (node) {
    if (!node) {
        return null;
    }

    const nodeMapping = new Map();
    const traversalQueue = [];

    const initialClone = new Node(node.val);
    nodeMapping.set(node.val, initialClone);
    traversalQueue.push(node);

    while (traversalQueue.length > 0) {
        const originalNodeReference = traversalQueue.shift();
        const clonedNodeReference = nodeMapping.get(originalNodeReference.val);

        for (const originalNeighbor of originalNodeReference.neighbors) {
            let clonedNeighborReference;
            if (!nodeMapping.has(originalNeighbor.val)) {
                clonedNeighborReference = new Node(originalNeighbor.val);
                nodeMapping.set(originalNeighbor.val, clonedNeighborReference);
                traversalQueue.push(originalNeighbor);
            } else {
                clonedNeighborReference = nodeMapping.get(originalNeighbor.val);
            }
            clonedNodeReference.neighbors.push(clonedNeighborReference);
        }
    }

    return initialClone;
};