/**
 * Reorder Routes To Make All Paths Lead To The City Zero
 * Intuition: Treat the graph as undirected for traversal but tag original direction as cost 1 (needs reverse toward 0) vs 0. DFS from 0 sums how many outgoing original edges are walked.
 * Approach: 1. For each road a->b, store [b,1] from a and [a,0] from b. 2. DFS(present, previous) adds edgeCost for each unused neighbor then recurses. 3. Return the total from city 0.
 * Dry Run: n=6, connections [[0,1],[1,3],[2,3],[4,0],[4,5]]
 *   - walking 0->1 costs 1, 1->3 costs 1, 3->2 costs 0, 0->4 costs 0, 4->5 costs 1
 *   - total 3
 * Time Complexity: O(cityCount)
 * Space Complexity: O(cityCount)
 */
var minReorder = function (cityCount, roadConnections) {
  const adjacencyStructure = new Array(cityCount).fill(null).map(() => []);

  roadConnections.forEach(([startCity, endCity]) => {
    adjacencyStructure[startCity].push([endCity, 1]);
    adjacencyStructure[endCity].push([startCity, 0]);
  });

  function traverseGraph(presentCity, previousCity) {
    let reversalsRequired = 0;

    adjacencyStructure[presentCity].forEach(([connectedCity, edgeCost]) => {
      if (connectedCity !== previousCity) {
        reversalsRequired += edgeCost;
        reversalsRequired += traverseGraph(connectedCity, presentCity);
      }
    });

    return reversalsRequired;
  }

  return traverseGraph(0, -1);
};
