import clsx from 'clsx';

export function SpinLoader() {
  const classes = clsx('flex', 'items-center');
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
