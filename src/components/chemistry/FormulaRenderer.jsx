import React from 'react';

/**
 * FormulaRenderer
 * Renders chemical formulas with proper subscripts and superscripts
 * Examples: "Na2S2O3" -> Na₂S₂O₃, "Ea" -> Eₐ, "r = k[A]^m[B]^n"
 */
export function FormulaRenderer({ formula, className = '' }) {
  if (!formula) return null;

  // Split on symbols and tokens
  const renderFormulaContent = (str) => {
    // Replace arrows
    const parts = str.split(/(->|-->)/);
    if (parts.length > 1) {
      return (
        <span className="chem-equation">
          {parts.map((part, i) => {
            if (part === '->' || part === '-->') {
              return <span key={i} className="chem-arrow">→</span>;
            }
            return <FormulaRenderer key={i} formula={part.trim()} />;
          })}
        </span>
      );
    }

    // Process subscripts, superscripts, brackets
    const tokens = [];
    let buffer = '';
    let i = 0;

    while (i < str.length) {
      const char = str[i];

      // Handle superscripts: ^2 or ^+
      if (char === '^') {
        if (buffer) {
          tokens.push(<span key={tokens.length}>{buffer}</span>);
          buffer = '';
        }
        i++;
        let supContent = '';
        if (str[i] === '{') {
          i++;
          while (i < str.length && str[i] !== '}') {
            supContent += str[i];
            i++;
          }
          i++;
        } else {
          supContent = str[i] || '';
          i++;
        }
        tokens.push(<sup key={tokens.length}>{supContent}</sup>);
        continue;
      }

      // Check for Ea special case
      if (char === 'E' && str[i + 1] === 'a') {
        if (buffer) {
          tokens.push(<span key={tokens.length}>{buffer}</span>);
          buffer = '';
        }
        tokens.push(
          <span key={tokens.length} className="chem-formula">
            E<sub>a</sub>
          </span>
        );
        i += 2;
        continue;
      }

      // Digits after capital/lowercase letters indicate subscripts (e.g. H2O, NO2)
      if (/[0-9]/.test(char) && buffer.length > 0 && /[a-zA-Z]/.test(buffer[buffer.length - 1])) {
        // Collect consecutive digits
        let digits = char;
        while (i + 1 < str.length && /[0-9]/.test(str[i + 1])) {
          digits += str[i + 1];
          i++;
        }
        tokens.push(<span key={tokens.length}>{buffer}</span>);
        buffer = '';
        tokens.push(<sub key={tokens.length}>{digits}</sub>);
        i++;
        continue;
      }

      buffer += char;
      i++;
    }

    if (buffer) {
      tokens.push(<span key={tokens.length}>{buffer}</span>);
    }

    return tokens;
  };

  return <span className={`chem-formula ${className}`}>{renderFormulaContent(formula)}</span>;
}
