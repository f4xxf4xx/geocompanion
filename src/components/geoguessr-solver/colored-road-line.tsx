import cx from 'classnames';

export const roadLineColorMapping = {
  'yellow-white': ['yellow', 'white', 'yellow'],
  'white-white': ['white', 'white', 'white'],
  'yellow-yellow': ['yellow', 'yellow', 'yellow'],
  'white-yellow': ['white', 'yellow', 'white'],
};

const colors: { [key: string]: string } = {
  white: 'white',
  yellow: 'yellow-300',
};

const ColoredRoadLine = ({ value }: { value: keyof typeof roadLineColorMapping }) => {
  return (
    <div className="flex gap-1">
      {roadLineColorMapping[value]?.map((color, index) => (
        <div key={index} className={cx('w-2 h-2 border-gray border', `bg-${colors[color]}`)} />
      ))}
    </div>
  );
};

export default ColoredRoadLine;
