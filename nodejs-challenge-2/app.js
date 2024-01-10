const { findMaximumPath } = require("./findMaximumPath")
const getTriangleFromApi = require("./getTriangleFromApi")

const triangle = [[59], [73, 41], [52, 40, 53], [26, 53, 6, 34]]

async function runProcess1() {
  const res = await getTriangleFromApi()

  const result = findMaximumPath(triangle)
  const result2 = findMaximumPath(res)

  console.log(result.sum) // Output: 59 + 73 + 52 + 53 = 237
  console.log(result.path) // Output: [59, 73, 52, 53]

  console.log(result2.sum)
  console.log(result2.path)
}

function decodeSymbolsToMinNumber(inputSymbols) {
  function calculateDigitSum(number) {
    return number
      .toString()
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit, 10), 0)
  }

  let currentNumber = ""
  let minNumber = ""
  let minDigitSum = Infinity

  for (let symbol of inputSymbols) {
    if (symbol === "L") {
      currentNumber += "13"
    } else if (symbol === "R") {
      currentNumber += "0"
    } else if (symbol === "=") {
      const digitSum = calculateDigitSum(currentNumber)
      if (digitSum < minDigitSum || (digitSum === minDigitSum && currentNumber < minNumber)) {
        minNumber = currentNumber
        minDigitSum = digitSum
      }
      currentNumber = ""
    }
  }

  return minNumber
}

// Example usage:
const inputSymbols = "LLRR="
const outputMinNumber = decodeSymbolsToMinNumber(inputSymbols)
console.log("Output Min Number:", outputMinNumber)
