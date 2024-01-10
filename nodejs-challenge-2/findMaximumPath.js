function findMaximumPath(triangle) {
  const n = triangle.length

  // Create a 2D array to store the maximum sum for each position
  const dp = new Array(n)
  for (let i = 0; i < n; i++) {
    dp[i] = new Array(triangle[i].length)
  }

  // Create a 2D array to store the chosen path for each position
  const path = new Array(n)
  for (let i = 0; i < n; i++) {
    path[i] = new Array(triangle[i].length)
  }

  // Initialize the bottom row of dp with the values from the bottom of the triangle
  for (let i = 0; i < triangle[n - 1].length; i++) {
    dp[n - 1][i] = triangle[n - 1][i]
    path[n - 1][i] = i // Initialize the path with the column index
  }

  // Iterate from the second-to-last row to the top
  for (let i = n - 2; i >= 0; i--) {
    for (let j = 0; j < triangle[i].length; j++) {
      // Update dp with the maximum sum for each position
      dp[i][j] = triangle[i][j] + Math.max(dp[i + 1][j], dp[i + 1][j + 1])

      // Update path with the chosen path for each position
      path[i][j] = dp[i + 1][j] > dp[i + 1][j + 1] ? j : j + 1
    }
  }

  // Build and return the maximum path
  const maxPath = []
  let columnIndex = path[0][0]
  for (let i = 0; i < n; i++) {
    maxPath.push(triangle[i][columnIndex])
    columnIndex = path[i][columnIndex]
  }

  return {
    sum: dp[0][0],
    path: maxPath.reverse(),
  }
}

module.exports = {
  findMaximumPath,
}
