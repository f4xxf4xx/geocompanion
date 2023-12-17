import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cx from 'classnames';
import { getCountries } from 'data';
import { getCountryAttributeRank, getCountryDisplayValue } from 'helpers/countryHelper';
import { Country } from 'types/country';

export function Header({ title, icon }: { title: string; icon?: IconDefinition }) {
  return (
    <header className="flex items-center">
      {icon && <FontAwesomeIcon icon={icon} className="mr-2 shrink-0" />}
      <h3 className="font-medium text-lg">{title}</h3>
    </header>
  );
}

interface ItemProps {
  title: string;
  countryCode: string;
  attribute: keyof Country;
  showRank?: boolean;
  reversed?: boolean;
}
export function Item({ title, countryCode, attribute, showRank, reversed }: ItemProps) {
  const rank = getCountryAttributeRank(countryCode, attribute, reversed);
  const country = getCountries()[countryCode.toUpperCase()];
  const displayValue = getCountryDisplayValue(country, attribute);

  return (
    <div className="flex items-center py-3">
      <div className="flex-1">
        <div className="flex items-center">
          <h4 className="font-bold text-sm mr-auto text-gray-700 flex items-center">{title}</h4>
          {rank && showRank && (
            <span
              style={{
                color: rank.indexColor,
              }}
              className={cx('px-2 py-1 rounded-lg text-sm bg-slate-100')}
            >
              {rank.index}
            </span>
          )}
        </div>
        <p className="">{displayValue}</p>
      </div>
    </div>
  );
}

export function SecondaryCard({
  title,
  icon,
  children,
}: React.PropsWithChildren<{ title: string; icon?: IconDefinition }>) {
  return (
    <section className="w-full p-6 rounded-lg max-w-md shadow-lg bg-primary text-white">
      <Header title={title} icon={icon} />
      <section className="grid grid-cols-2 gap-x-6">{children}</section>
    </section>
  );
}

export function Card({
  title,
  icon,
  children,
}: React.PropsWithChildren<{ title: string; icon?: IconDefinition }>) {
  return (
    <section className="w-full p-6 rounded-lg max-w-md shadow-lg bg-white">
      <Header title={title} icon={icon} />
      <section className="grid grid-cols-2 gap-x-6">{children}</section>
    </section>
  );
}
