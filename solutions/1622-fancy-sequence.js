/**
 * Fancy Sequence
 * Intuition: Lazy affine updates: stored[i] maps to stored[i]*mul+add. Append inverts the current transform so later mul/add still apply uniformly.
 * Approach: 1. Keep sequenceData, currentMultiplier, currentAddend (mod 1e9+7, BigInt). 2. append(v): store (v-add)*inv(mul). 3. addAll(inc): add += inc. 4. multAll(m): mul *= m and add *= m. 5. getIndex(i): return stored[i]*mul+add, or -1 if OOB. Inverse uses extended Euclid.
 * Dry Run: append(2), addAll(3), append(7), getIndex(0) → (2+3)=5.
 * Time Complexity: O(log(MOD))
 * Space Complexity: O(N)
 */
var Fancy = function () {
  this.sequenceData = [];
  this.currentAddend = 0n;
  this.currentMultiplier = 1n;
  this.moduloValue = 1000000007n;
};

Fancy.prototype.append = function (valueToAppend) {
  const bigIntValue = BigInt(valueToAppend);
  const currentMultiplicativeInverse = this.computeModInverse(
    this.currentMultiplier
  );

  const intermediateResult =
    bigIntValue - this.currentAddend + this.moduloValue;
  const normalizedValue =
    (intermediateResult * currentMultiplicativeInverse) % this.moduloValue;
  this.sequenceData.push(normalizedValue);
};

Fancy.prototype.addAll = function (incrementValue) {
  this.currentAddend =
    (this.currentAddend + BigInt(incrementValue)) % this.moduloValue;
};

Fancy.prototype.multAll = function (factorValue) {
  const bigIntFactor = BigInt(factorValue);
  this.currentAddend = (this.currentAddend * bigIntFactor) % this.moduloValue;
  this.currentMultiplier =
    (this.currentMultiplier * bigIntFactor) % this.moduloValue;
};

Fancy.prototype.getIndex = function (sequenceIndex) {
  if (sequenceIndex >= this.sequenceData.length) {
    return -1;
  }
  const baseStoredValue = this.sequenceData[sequenceIndex];
  const finalResult =
    (baseStoredValue * this.currentMultiplier + this.currentAddend) %
    this.moduloValue;
  return Number(finalResult);
};

Fancy.prototype.computeModInverse = function (baseNumber) {
  let euclideanA = baseNumber;
  let euclideanM = this.moduloValue;
  const originalModulo = euclideanM;
  let firstCoefficient = 1n;
  let secondCoefficient = 0n;

  euclideanA = euclideanA % euclideanM;
  while (euclideanA > 1n) {
    const quotientVal = euclideanA / euclideanM;
    [euclideanA, euclideanM] = [euclideanM, euclideanA % euclideanM];
    [firstCoefficient, secondCoefficient] = [
      secondCoefficient,
      firstCoefficient - quotientVal * secondCoefficient,
    ];
  }

  return firstCoefficient < 0n
    ? firstCoefficient + originalModulo
    : firstCoefficient;
};
