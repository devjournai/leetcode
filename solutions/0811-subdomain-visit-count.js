/**
 * Subdomain Visit Count
 * Time Complexity: O(N * L^2)
 * Space Complexity: O(N * L^2)
 */
var subdomainVisits = function (cpdomains) {
  const domainCounterStorage = new Map();

  for (
    let currentDomainEntryIndex = 0;
    currentDomainEntryIndex < cpdomains.length;
    currentDomainEntryIndex++
  ) {
    const currentDomainInput = cpdomains[currentDomainEntryIndex];

    const firstSpacePosition = currentDomainInput.indexOf(" ");
    const visitNumberString = currentDomainInput.substring(
      0,
      firstSpacePosition,
    );
    const actualDomainName = currentDomainInput.substring(
      firstSpacePosition + 1,
    );
    const parsedVisitNumber = parseInt(visitNumberString);

    let nextDotSearchIndex = 0;
    while (nextDotSearchIndex !== -1) {
      const currentSubdomainKey =
        actualDomainName.substring(nextDotSearchIndex);
      const existingVisitsCount =
        domainCounterStorage.get(currentSubdomainKey) || 0;
      domainCounterStorage.set(
        currentSubdomainKey,
        existingVisitsCount + parsedVisitNumber,
      );

      nextDotSearchIndex = actualDomainName.indexOf(".", nextDotSearchIndex);
      if (nextDotSearchIndex !== -1) {
        nextDotSearchIndex++;
      }
    }
  }

  const finalOutputList = [];
  for (const [
    processedDomainKey,
    totalAccumulatedVisits,
  ] of domainCounterStorage.entries()) {
    const resultStringElement = `${totalAccumulatedVisits} ${processedDomainKey}`;
    finalOutputList.push(resultStringElement);
  }

  return finalOutputList;
};
