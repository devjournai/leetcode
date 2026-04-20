/**
 * Web Crawler
 * Time Complexity: O(N * L + M * L)
 * Space Complexity: O(N * L)
 */
var crawl = function (startUrl, htmlParser) {
  function extractHostname(inputUrl) {
    return inputUrl.split("/")[2];
  }

  const initialHostname = extractHostname(startUrl);
  const visitedUrlsTracker = new Set();
  const traversalQueue = [startUrl];
  const collectedUrls = [];

  while (traversalQueue.length > 0) {
    const currentProcessedUrl = traversalQueue.shift();

    if (visitedUrlsTracker.has(currentProcessedUrl)) {
      continue;
    }

    visitedUrlsTracker.add(currentProcessedUrl);
    collectedUrls.push(currentProcessedUrl);

    const obtainedLinks = htmlParser.getUrls(currentProcessedUrl);

    for (const discoveredLink of obtainedLinks) {
      if (!visitedUrlsTracker.has(discoveredLink)) {
        const discoveredLinkHostname = extractHostname(discoveredLink);
        if (discoveredLinkHostname === initialHostname) {
          traversalQueue.push(discoveredLink);
        }
      }
    }
  }

  return collectedUrls;
};
