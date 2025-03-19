/**
 * Formats a number in milliunits to a currency string
 * @param amount Amount in milliunits (e.g., 1000 = $1.00)
 * @returns Formatted currency string (e.g., "$1.00")
 */
export const formatCurrency = (amount: number): string => {
  const value = amount / 1000 // Convert milliunits to standard currency units
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

/**
 * Formats a number as a percentage
 * @param value Number to format as percentage (e.g., 0.75 = 75%)
 * @returns Formatted percentage string (e.g., "75%")
 */
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(value)
} 