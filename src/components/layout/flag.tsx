import * as Flags from 'country-flag-icons/react/3x2';

const Flag = ({ code, className }: { code: string; className?: string }) => {
  const upperCaseCode = code.toUpperCase();
  // @ts-ignore
  const Component = Flags[upperCaseCode];
  if (!Component) return <p>Error flag</p>;
  return <Component className={className} />;
};

export default Flag;
