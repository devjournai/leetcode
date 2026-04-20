/**
 * People Whose List Of Favorite Companies Is Not A Subset Of Another List
 * Time Complexity: O(N^2 * M)
 * Space Complexity: O(N * M)
 */
var peopleIndexes = function (favoriteCompanies) {
  const totalPeople = favoriteCompanies.length;

  const companySetRepository = favoriteCompanies.map(
    (individualCompanies) => new Set(individualCompanies),
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
