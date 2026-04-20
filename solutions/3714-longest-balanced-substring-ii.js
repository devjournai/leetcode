/**
 * Longest Balanced Substring II
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var longestBalanced = function (s) {
  const n = s.length;

  const pa = new Array(n + 1).fill(0);
  const pb = new Array(n + 1).fill(0);
  const pc = new Array(n + 1).fill(0);

  for (let k = 0; k < n; k++) {
    pa[k + 1] = pa[k] + (s[k] === "a" ? 1 : 0);
    pb[k + 1] = pb[k] + (s[k] === "b" ? 1 : 0);
    pc[k + 1] = pc[k] + (s[k] === "c" ? 1 : 0);
  }

  let maxLen = 0;

  const getOrCreateMap = (map, key) => {
    if (!map.has(key)) map.set(key, new Map());
    return map.get(key);
  };

  const maps = {
    A_ONLY: new Map([[0, new Map([[0, 0]])]]),
    B_ONLY: new Map([[0, new Map([[0, 0]])]]),
    C_ONLY: new Map([[0, new Map([[0, 0]])]]),
    AB_ONLY: new Map([[0, new Map([[0, 0]])]]),
    AC_ONLY: new Map([[0, new Map([[0, 0]])]]),
    BC_ONLY: new Map([[0, new Map([[0, 0]])]]),
    ABC_ONLY: new Map([[0, new Map([[0, 0]])]]),
  };

  for (let k = 1; k <= n; k++) {
    const currentPa = pa[k];
    const currentPb = pb[k];
    const currentPc = pc[k];

    let innerMap = getOrCreateMap(maps.A_ONLY, currentPb);
    if (innerMap.has(currentPc)) {
      const i = innerMap.get(currentPc);
      if (currentPa - pa[i] > 0) {
        maxLen = Math.max(maxLen, k - i);
      }
    } else {
      innerMap.set(currentPc, k);
    }

    innerMap = getOrCreateMap(maps.B_ONLY, currentPa);
    if (innerMap.has(currentPc)) {
      const i = innerMap.get(currentPc);
      if (currentPb - pb[i] > 0) {
        maxLen = Math.max(maxLen, k - i);
      }
    } else {
      innerMap.set(currentPc, k);
    }

    innerMap = getOrCreateMap(maps.C_ONLY, currentPa);
    if (innerMap.has(currentPb)) {
      const i = innerMap.get(currentPb);
      if (currentPc - pc[i] > 0) {
        maxLen = Math.max(maxLen, k - i);
      }
    } else {
      innerMap.set(currentPb, k);
    }

    const diffAB = currentPa - currentPb;
    innerMap = getOrCreateMap(maps.AB_ONLY, diffAB);
    if (innerMap.has(currentPc)) {
      const i = innerMap.get(currentPc);
      if (currentPa - pa[i] > 0) {
        maxLen = Math.max(maxLen, k - i);
      }
    } else {
      innerMap.set(currentPc, k);
    }

    const diffAC = currentPa - currentPc;
    innerMap = getOrCreateMap(maps.AC_ONLY, diffAC);
    if (innerMap.has(currentPb)) {
      const i = innerMap.get(currentPb);
      if (currentPa - pa[i] > 0) {
        maxLen = Math.max(maxLen, k - i);
      }
    } else {
      innerMap.set(currentPb, k);
    }

    const diffBC = currentPb - currentPc;
    innerMap = getOrCreateMap(maps.BC_ONLY, diffBC);
    if (innerMap.has(currentPa)) {
      const i = innerMap.get(currentPa);
      if (currentPb - pb[i] > 0) {
        maxLen = Math.max(maxLen, k - i);
      }
    } else {
      innerMap.set(currentPa, k);
    }

    innerMap = getOrCreateMap(maps.ABC_ONLY, diffAB);
    if (innerMap.has(diffAC)) {
      const i = innerMap.get(diffAC);
      if (currentPa - pa[i] > 0) {
        maxLen = Math.max(maxLen, k - i);
      }
    } else {
      innerMap.set(diffAC, k);
    }
  }

  return maxLen;
};
