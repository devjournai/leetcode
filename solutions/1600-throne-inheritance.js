/**
 * Throne Inheritance
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var ThroneInheritance = function (kingName) {
  this.monarchName = kingName;
  this.lineageGraph = new Map();
  this.deadRegistry = new Set();
};

ThroneInheritance.prototype.birth = function (birthParent, newBorn) {
  let childCollection = this.lineageGraph.get(birthParent);
  if (childCollection === undefined) {
    childCollection = [];
    this.lineageGraph.set(birthParent, childCollection);
  }
  childCollection.push(newBorn);
};

ThroneInheritance.prototype.death = function (personToMarkDead) {
  this.deadRegistry.add(personToMarkDead);
};

ThroneInheritance.prototype.getInheritanceOrder = function () {
  const successionList = [];
  const collectHeirs = (currentPerson) => {
    if (!this.deadRegistry.has(currentPerson)) {
      successionList.push(currentPerson);
    }
    const descendants = this.lineageGraph.get(currentPerson);
    if (descendants) {
      for (let idx = 0; idx < descendants.length; idx++) {
        collectHeirs(descendants[idx]);
      }
    }
  };
  collectHeirs(this.monarchName);
  return successionList;
};
