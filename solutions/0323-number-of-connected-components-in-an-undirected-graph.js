/**
    * Number Of Connected Components In An Undirected Graph
    * Time Complexity: O(N + M * α(N))
    * Space Complexity: O(N)
*/
var countComponents = function (n, edges) {
    const parentCollection = new Array(n);
    let numberOfComponents = n;
    const totalNodes = n;

    for (let currentIdx = 0; currentIdx < totalNodes; ++currentIdx) {
        parentCollection[currentIdx] = currentIdx;
    }

    function findRoot(seekingNode) {
        if (parentCollection[seekingNode] === seekingNode) {
            return seekingNode;
        }
        parentCollection[seekingNode] = findRoot(parentCollection[seekingNode]);
        return parentCollection[seekingNode];
    }

    function uniteSets(nodeOne, nodeTwo) {
        const rootOfA = findRoot(nodeOne);
        const rootOfB = findRoot(nodeTwo);

        if (rootOfA !== rootOfB) {
            parentCollection[rootOfA] = rootOfB;
            numberOfComponents--;
        }
    }

    const graphConnections = edges;

    for (const [vertexA, vertexB] of graphConnections) {
        uniteSets(vertexA, vertexB);
    }

    return numberOfComponents;
};