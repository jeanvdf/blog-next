'use client';

import { formatDateTime, formatRelativeDateTime } from '@/utils/date-util';

type PostDateProps = {
  date: string;
  relative?: boolean;
};

export function PostDate({ date, relative }: PostDateProps) {
  return (
    <time className="text-slate-400 " dateTime={date} title={formatDateTime(date)}>
      {relative ? formatRelativeDateTime(date) : formatDateTime(date)}
    </time>
  );
}
