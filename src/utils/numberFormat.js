/**
 * Indonesian Number Formatting and Chemical Value Presentation
 */

/**
 * Format a number using Indonesian decimal comma (e.g., 0.25 -> "0,25")
 * @param {number} value
 * @param {number} [decimals] Optional fixed decimal places
 * @returns {string}
 */
export function formatIndoNumber(value, decimals) {
  if (value === null || value === undefined || isNaN(value)) return '-';
  
  if (typeof decimals === 'number') {
    return value.toFixed(decimals).replace('.', ',');
  }
  
  // Format with default precision without unnecessary trailing zeros
  const str = String(Math.round(value * 10000) / 10000);
  return str.replace('.', ',');
}

/**
 * Format number into Indonesian scientific notation (e.g., 2.5e-3 -> "2,5 × 10⁻³")
 * @param {number} value
 * @param {number} [sigFigs=3]
 * @returns {string}
 */
export function formatScientificNotation(value, sigFigs = 3) {
  if (value === 0) return '0';
  if (value === null || value === undefined || isNaN(value)) return '-';

  const absVal = Math.abs(value);
  if (absVal >= 0.01 && absVal < 1000) {
    return formatIndoNumber(Number(value.toPrecision(sigFigs)));
  }

  const expStr = value.toExponential(sigFigs - 1);
  const [mantissa, exponent] = expStr.split('e');
  
  const superScripts = {
    '-': '⁻',
    '0': '⁰',
    '1': '¹',
    '2': '²',
    '3': '³',
    '4': '⁴',
    '5': '⁵',
    '6': '⁶',
    '7': '⁷',
    '8': '⁸',
    '9': '⁹'
  };

  const expFormatted = exponent
    .replace('+', '')
    .split('')
    .map((char) => superScripts[char] || char)
    .join('');

  return `${formatIndoNumber(parseFloat(mantissa))} × 10${expFormatted}`;
}

/**
 * Parse input string which may use either '.' or ',' as decimal separator
 * @param {string} input
 * @returns {number}
 */
export function parseIndoInput(input) {
  if (typeof input !== 'string') return Number(input);
  const normalized = input.trim().replace(',', '.');
  return parseFloat(normalized);
}
