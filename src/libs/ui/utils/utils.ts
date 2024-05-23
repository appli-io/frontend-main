import { twMerge } from 'tailwind-merge';
import { clsx }    from 'clsx';

export function hlm(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
