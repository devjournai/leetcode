/**
 * Alien Dictionary
 * Time Complexity: O(N + V + E)
 * Space Complexity: O(V + E)
 */
var alienOrder = function (words) {
  const letterDependencies = new Map();
  const entryDegrees = new Map();

  for (const aWord of words) {
    for (const aChar of aWord) {
      if (!letterDependencies.has(aChar)) {
        letterDependencies.set(aChar, new Set());
        entryDegrees.set(aChar, 0);
      }
    }
  }

  for (
    let outerLoopIndex = 1;
    outerLoopIndex < words.length;
    outerLoopIndex++
  ) {
    const previousWord = words[outerLoopIndex - 1];
    const currentWord = words[outerLoopIndex];
    const minimumLength = Math.min(previousWord.length, currentWord.length);

    if (
      previousWord.length > currentWord.length &&
      previousWord.startsWith(currentWord)
    ) {
      return "";
    }

    for (
      let innerLoopIndex = 0;
      innerLoopIndex < minimumLength;
      innerLoopIndex++
    ) {
      const charFromPrevious = previousWord[innerLoopIndex];
      const charFromCurrent = currentWord[innerLoopIndex];

      if (charFromPrevious !== charFromCurrent) {
        if (!letterDependencies.get(charFromPrevious).has(charFromCurrent)) {
          letterDependencies.get(charFromPrevious).add(charFromCurrent);
          entryDegrees.set(
            charFromCurrent,
            entryDegrees.get(charFromCurrent) + 1,
          );
        }
        break;
      }
    }
  }

  const processQueue = [];
  for (const [charKey, initialDegree] of entryDegrees) {
    if (initialDegree === 0) {
      processQueue.push(charKey);
    }
  }

  let resultOrder = "";
  while (processQueue.length > 0) {
    const dequeuedCharacter = processQueue.shift();
    resultOrder += dequeuedCharacter;

    for (const dependentCharacter of letterDependencies.get(
      dequeuedCharacter,
    )) {
      const updatedDegree = entryDegrees.get(dependentCharacter) - 1;
      entryDegrees.set(dependentCharacter, updatedDegree);
      if (updatedDegree === 0) {
        processQueue.push(dependentCharacter);
      }
    }
  }

  return resultOrder.length === letterDependencies.size ? resultOrder : "";
};
