import clsx from 'clsx';

type SpinLoaderProps = {
  className?: string;
};

export function SpinLoader({ className }: SpinLoaderProps) {
  const classes = clsx('items-center justify-items-center', className);
  return (
    <div className={classes}>
      <div
        className={clsx(
          'w-10 h-10',
          'border-4 border-slate-400 border-t-transparent rounded-full animate-spin',
        )}
      ></div>
    </div>
  );
}
