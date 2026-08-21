/**
 * People Whose List Of Favorite Companies Is Not A Subset Of Another List
 * Intuition: Convert each list to a Set. A person is kept if their set is not a subset of any other person's set.
 * Approach: 1. Map each favorite list to a Set. 2. For person i, scan j != i and test subset. 3. If no superset is found, push i. 4. Return those indexes.
 * Dry Run: favoriteCompanies = [["leetcode","google","facebook"],["google","microsoft"],["google","facebook"]]
 *   - person 2 is a subset of person 0, so drop 2
 *   - persons 0 and 1 are not subsets of any other list
 *   - return [0, 1]
 * Time Complexity: O(N^2 * M)
 * Space Complexity: O(N * M)
 */
var peopleIndexes = function (favoriteCompanies) {
  const totalPeople = favoriteCompanies.length;

  const companySetRepository = favoriteCompanies.map(
    (individualCompanies) => new Set(individualCompanies)
  );

  const resultList = [];

  const checkSubsetFunction = (candidateSubset, candidateSuperset) => {
    if (candidateSubset.size > candidateSuperset.size) {
      return false;
    }
    for (const singleCompany of candidateSubset) {
      if (!candidateSuperset.has(singleCompany)) {
        return false;
      }
    }
    return true;
  };

  for (let personOneIndex = 0; personOneIndex < totalPeople; personOneIndex++) {
    let personOneIsSubset = false;
    let personTwoIndex = 0;

    while (personTwoIndex < totalPeople) {
      if (personOneIndex === personTwoIndex) {
        personTwoIndex++;
        continue;
      }

      const personOneCompanySet = companySetRepository[personOneIndex];
      const personTwoCompanySet = companySetRepository[personTwoIndex];

      if (checkSubsetFunction(personOneCompanySet, personTwoCompanySet)) {
        personOneIsSubset = true;
        break;
      }
      personTwoIndex++;
    }

    if (!personOneIsSubset) {
      resultList.push(personOneIndex);
    }
  }

  return resultList;
};
