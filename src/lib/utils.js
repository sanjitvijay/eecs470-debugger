import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getStringForValue(arr, x) {
  let low = 0
  let high = arr.length - 1
  let result = undefined

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const [n, s] = arr[mid]
    if (n <= x) {
      result = s
      low = mid + 1
    } else {
      high = mid - 1
    }
  }
  return result
}

export function convertSingleSignal(name, signal){
  return [{[name]: signal}]
}

export function oneHotEncoder(bitstring){
  const oneHotNum = parseInt(bitstring, 2)
  const number = Math.log2(oneHotNum)

  return isFinite(number) ? (number + 1).toString() : 'inv' 
}