/**
 * Sort Items By Groups Respecting Dependencies
 * Intuition: Give each ungrouped item its own group, then topologically sort groups and items so both group-level and intra-group prerequisites hold.
 * Approach: 1. Assign unique ids to group=-1 items. 2. Edges across groups go on the group graph; same-group edges go on the item graph. 3. Kahn-sort both. 4. Emit items in group order, using the item topo order inside each group.
 * Dry Run: Two groups with item A before B in different groups: group topo puts A's group first, then B.
 * Time Complexity: O(N + M + sum(beforeItems[i].length))
 * Space Complexity: O(N + M + sum(beforeItems[i].length))
 */
var sortItems = function (n, m, group, beforeItems) {
  let currentNextGroupId = m;

  const assignMissingGroupIds = () => {
    for (let itemIdxA = 0; itemIdxA < n; itemIdxA++) {
      if (group[itemIdxA] === -1) {
        group[itemIdxA] = currentNextGroupId++;
      }
    }
  };

  assignMissingGroupIds();

  const groupGraphAdjacency = Array.from(
    { length: currentNextGroupId },
    () => []
  );
  const groupIncomingEdgeCount = new Array(currentNextGroupId).fill(0);

  const itemGraphAdjacency = Array.from({ length: n }, () => []);
  const itemIncomingEdgeCount = new Array(n).fill(0);

  const constructDependencyGraphs = () => {
    for (let itemIdxB = 0; itemIdxB < n; itemIdxB++) {
      const currentItemGrpId = group[itemIdxB];
      for (const prerequisiteItem of beforeItems[itemIdxB]) {
        const prerequisiteItemGrpId = group[prerequisiteItem];

        if (prerequisiteItemGrpId !== currentItemGrpId) {
          groupGraphAdjacency[prerequisiteItemGrpId].push(currentItemGrpId);
          groupIncomingEdgeCount[currentItemGrpId]++;
        } else {
          itemGraphAdjacency[prerequisiteItem].push(itemIdxB);
          itemIncomingEdgeCount[itemIdxB]++;
        }
      }
    }
  };

  constructDependencyGraphs();

  const performTopologicalSort = (
    dependencyGraph,
    incomingCounts,
    graphSize
  ) => {
    const processingQueue = [];
    const orderedElements = [];

    for (let elementIdx = 0; elementIdx < graphSize; elementIdx++) {
      if (incomingCounts[elementIdx] === 0) {
        processingQueue.push(elementIdx);
      }
    }

    while (processingQueue.length > 0) {
      const currentElement = processingQueue.shift();
      orderedElements.push(currentElement);

      for (const neighborElement of dependencyGraph[currentElement]) {
        incomingCounts[neighborElement]--;
        if (incomingCounts[neighborElement] === 0) {
          processingQueue.push(neighborElement);
        }
      }
    }

    return orderedElements.length === graphSize ? orderedElements : [];
  };

  const sortedGroupSequence = performTopologicalSort(
    groupGraphAdjacency,
    groupIncomingEdgeCount,
    currentNextGroupId
  );
  if (sortedGroupSequence.length === 0) {
    return [];
  }

  const sortedItemSequence = performTopologicalSort(
    itemGraphAdjacency,
    itemIncomingEdgeCount,
    n
  );
  if (sortedItemSequence.length === 0) {
    return [];
  }

  const itemsByGroupMapping = new Map();
  for (const individualItem of sortedItemSequence) {
    const itemGroupId = group[individualItem];
    if (!itemsByGroupMapping.has(itemGroupId)) {
      itemsByGroupMapping.set(itemGroupId, []);
    }
    itemsByGroupMapping.get(itemGroupId).push(individualItem);
  }

  const finalResultItems = [];
  for (const orderedGroupId of sortedGroupSequence) {
    if (itemsByGroupMapping.has(orderedGroupId)) {
      finalResultItems.push(...itemsByGroupMapping.get(orderedGroupId));
    }
  }

  return finalResultItems;
};
