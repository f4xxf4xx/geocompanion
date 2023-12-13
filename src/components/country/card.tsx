import cx from 'classnames';
import { Spinner } from 'components/layout/spinner';

export function Header({ title }: { title: string }) {
  return (
    <header className="flex items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2 shrink-0 w-6 h-6 text-gray-500"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M4 19l16 0"></path>
        <path d="M4 15l4 -6l4 2l4 -5l4 4"></path>
      </svg>
      <h3 className="font-medium text-lg">{title}</h3>
    </header>
  );
}

export function Item({
  title,
  rank,
  value,
}: {
  title: string;
  rank?: number;
  value?: string | number;
}) {
  return (
    <div className="flex items-center py-3">
      <div className="flex-1">
        <div className="flex items-center">
          <h4 className="font-bold text-sm mr-auto text-gray-700 flex items-center">{title}</h4>
          {rank && (
            <span className="px-2 py-1 rounded-lg bg-red-50 text-green-500 text-xs">{rank}</span>
          )}
        </div>
        {value ? <p className="">{value}</p> : <Spinner />}
      </div>
    </div>
  );
}

export function Card({
  title,
  variant = 'primary',
  children,
}: React.PropsWithChildren<{ title: string; variant?: string }>) {
  return (
    <section
      className={cx(
        'w-full p-6 rounded-lg max-w-md shadow-lg',
        variant === 'primary' ? 'bg-white' : 'bg-primary text-white',
      )}
    >
      <Header title={title} />
      <section className="grid grid-cols-2 gap-x-6">{children}</section>
    </section>
  );
}
