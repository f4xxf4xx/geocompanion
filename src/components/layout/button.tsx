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
        'text-primary bg-secondary',
        'items-center justify-center',
        'border border-gray rounded-md',
        'capitalize shadow',
        'p-1',
        isSelected && 'text-secondary bg-primary drop-shadow-xl',
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
  white: 'white',
  yellow: 'yellow-300',
  red: 'red-500',
  maroon: 'rose-900',
  blue: 'blue-500',
  green: 'green-500',
  black: 'black',
  orange: 'orange-500',
};

export function FlagButton({ isSelected, color, children, ...props }: FlagButtonProps) {
  const colorString = colors[color];
  return (
    <button
      className={cx(
        'flex min-w-[50px] h-10',
        `bg-${colorString}`,
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
