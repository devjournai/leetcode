/**
 * Find And Replace In String
 * Intuition: Only apply replacements whose `sources[i]` matches `s` at `indices[i]`. Apply them from right to left so earlier indices stay valid after later splices.
 * Approach: 1. For each op, if `s.substring(index, index+source.length) === source`, push `{index, source, target}`. 2. Sort ops by `index` descending. 3. Rebuild `finalString` as prefix + target + suffix after the source. 4. Return `finalString`.
 * Dry Run: s="abcd", indices=[0,2], sources=["a","cd"], targets=["eee","ffff"].
 *   Both match. Sort: index 2 then 0. "abcd" → "abffff" → "eeebffff".
 * Time Complexity: O(K * (N + K * L_t_max))
 * Space Complexity: O(N + K * (L_s_max + L_t_max))
 */
var findReplaceString = function (s, indices, sources, targets) {
  const replacementOperations = [];

  const numOperations = indices.length;
  for (
    let operationIterator = 0;
    operationIterator < numOperations;
    operationIterator++
  ) {
    const currentReplacementIndex = indices[operationIterator];
    const currentSourceString = sources[operationIterator];
    const currentTargetString = targets[operationIterator];

    const currentSourceLength = currentSourceString.length;
    const subStringToCheck = s.substring(
      currentReplacementIndex,
      currentReplacementIndex + currentSourceLength
    );

    if (subStringToCheck === currentSourceString) {
      replacementOperations.push({
        index: currentReplacementIndex,
        source: currentSourceString,
        target: currentTargetString,
      });
    }
  }

  replacementOperations.sort((a, b) => b.index - a.index);

  let finalString = s;
  for (const opDetail of replacementOperations) {
    const opIdx = opDetail.index;
    const opSrcLen = opDetail.source.length;
    const opTgtVal = opDetail.target;

    const stringPartBefore = finalString.substring(0, opIdx);
    const stringPartAfter = finalString.substring(opIdx + opSrcLen);

    finalString = stringPartBefore + opTgtVal + stringPartAfter;
  }

  return finalString;
};
