export function ProgressBar({ percent = 0, className = '' }) {
  const clamped = Math.min(Math.max(percent, 0), 100);

  return (
    <div
      className={`progress-container ${className}`.trim()}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <div
        className="progress-bar-fill"
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
