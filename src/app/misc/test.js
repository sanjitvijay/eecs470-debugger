function getStringForValue(arr, x) {
    let low = 0;
    let high = arr.length - 1;
    let result = undefined;
    
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const [n, s] = arr[mid];
      if (n <= x) {
        result = s; // candidate answer
        low = mid + 1; // try to find a larger n that is still <= x
      } else {
        high = mid - 1;
      }
    }
    
    return result;
  }
  
  // Example usage:
  const data = [
    [10, "a"],
    [20, "b"],
    [30, "c"],
    [40, "d"]
  ];
  
  console.log(getStringForValue(data, 25)); // "b"
  console.log(getStringForValue(data, 10)); // "a"
  console.log(getStringForValue(data, 50)); // "d"
  console.log(getStringForValue(data, 5));  // undefined