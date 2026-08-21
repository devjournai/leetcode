/**
 * Smallest Common Region
 * Intuition: Regions form a tree via parent pointers. The smallest common region is the first ancestor of region2 that also lies on region1’s path to the root.
 * Approach: 1. Map each child to its parent from the regions lists. 2. Walk region1 to the root into pathForRegionA. 3. Walk region2 toward the root and return the first node in pathASet.
 * Dry Run: Earth contains NorthAmerica; NorthAmerica contains US; US contains NY and KY. region1=NY, region2=KY
 *   path NY->US->NA->Earth. Walk KY->US: US is in the set. Return "US".
 * Time Complexity: O(E + D)
 * Space Complexity: O(V + D)
 */
var findSmallestRegion = function (regions, region1, region2) {
  const parentChildMap = new Map();

  for (
    let listGroupIndex = 0;
    listGroupIndex < regions.length;
    listGroupIndex++
  ) {
    const currentRegionList = regions[listGroupIndex];
    const directSuperior = currentRegionList[0];
    for (
      let subordinateIndex = 1;
      subordinateIndex < currentRegionList.length;
      subordinateIndex++
    ) {
      const currentSubordinate = currentRegionList[subordinateIndex];
      parentChildMap.set(currentSubordinate, directSuperior);
    }
  }

  const getRegionAncestry = (startingRegion) => {
    const ancestryTrail = [];
    let currentHierarchyMember = startingRegion;
    while (currentHierarchyMember) {
      ancestryTrail.push(currentHierarchyMember);
      currentHierarchyMember = parentChildMap.get(currentHierarchyMember);
    }
    return ancestryTrail;
  };

  const pathForRegionA = getRegionAncestry(region1);
  const pathForRegionB = getRegionAncestry(region2);

  const pathASet = new Set(pathForRegionA);
  for (let pathBIndex = 0; pathBIndex < pathForRegionB.length; pathBIndex++) {
    const candidateAncestor = pathForRegionB[pathBIndex];
    if (pathASet.has(candidateAncestor)) {
      return candidateAncestor;
    }
  }

  return "";
};
