// LRU
// key value
// hash table
// LIFO
// get, set, remove

class LRU {
  constructor(n) {
    this.n = n;
    this.keys = new Array(n);
    this.values = new Array(n);
  }

  put(key, value) {
    if (this.keys.length === this.n) {
      this.keys.shift();
      this.value.shift();
    }
    this.keys.push(key);
    this.value.push(value);
  }
  get(key) {
    const index = this.keys.indexOf(key);
    const value = this.values.splice(index, 1)[0];
    keys.push(keys.splice(index, 1)[0]);
    values.push(value);
    return value;
  }
  remove(key) {
    const index = this.keys.indexOf(key);
    const value = this.values.splice(index, 1)[0];
    keys.splice(index, 1)[0];
  }
}
