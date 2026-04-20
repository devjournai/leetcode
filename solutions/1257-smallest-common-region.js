/**
 * Smallest Common Region
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
