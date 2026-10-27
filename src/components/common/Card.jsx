export function Card({
  children,
  className = '',
  interactive = false,
  onClick,
  ...props
}) {
  const interactiveClass = interactive ? 'card-interactive' : '';

  return (
    <div
      className={`card ${interactiveClass} ${className}`.trim()}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
}
