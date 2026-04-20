/**
 * Reorder Routes To Make All Paths Lead To The City Zero
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
