import cx from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import { LinkProps, Link as RouterLink } from 'react-router-dom';

export function Link({ children, ...props }: LinkProps) {
  return (
    <RouterLink
      className={cx(
        'text-primary bg-secondary',
        'items-center justify-center',
        'border border-gray rounded-md',
        'capitalize shadow',
        'p-2',
      )}
      {...props}
    >
      {children}
    </RouterLink>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { isSelected?: boolean };
export function Button({ isSelected, children, ...props }: ButtonProps) {
  return (
    <button
      className={cx(
        'min-w-[50px] h-10',
        'flex gap-1 items-center',
        'items-center justify-center',
        'border border-gray rounded-md',
        'capitalize shadow',
        'p-1 font-bold',
        'hover:animate-pulse',
        isSelected ? 'text-secondary bg-primary drop-shadow-xl' : 'text-primary bg-secondary',
      )}
      {...props}
    >
      {children}
    </button>
  );
}

type FlagButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isSelected?: boolean;
  color: string;
};

const colors: { [key: string]: string } = {
  white: 'bg-white',
  yellow: 'bg-yellow-300',
  red: 'bg-red-500',
  maroon: 'bg-rose-900',
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  black: 'bg-black',
  orange: 'bg-orange-500',
};

export function FlagButton({ isSelected, color, children, ...props }: FlagButtonProps) {
  const colorString = colors[color];
  return (
    <button
      className={cx(
        'flex min-w-[50px] h-10',
        `${colorString}`,
        'items-center justify-center',
        'border border-gray rounded-md',
        'capitalize shadow',
        'p-1',
        isSelected && `border-2 border-primary shadow-xl`,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
