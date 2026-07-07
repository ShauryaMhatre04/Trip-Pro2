import Link from 'next/link';

const variants = {
  primary: 'bg-ink text-paper hover:bg-teal-dark',
  amber: 'bg-amber text-ink hover:bg-amber-dark',
  outline: 'bg-transparent text-ink border border-ink/30 hover:border-ink',
  ghost: 'bg-transparent text-ink hover:bg-ink/5',
  danger: 'bg-coral text-paper hover:bg-coral/85',
};

const sizes = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-sm px-4 py-2.5',
  lg: 'text-base px-6 py-3',
};

export function Button({
  as,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}