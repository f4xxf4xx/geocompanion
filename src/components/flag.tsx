import cx from 'classnames';
import * as Flags from 'country-flag-icons/react/3x2';

const Flag = ({ code }: { code: string }) => {
  const upperCaseCode = code.toUpperCase();
  const Component = Flags[upperCaseCode];
  if (!Component) return <p>Error flag</p>;
  return <Component className={cx('w-8 rounded border border-primary shadow-md')} />;
};

export default Flag;
