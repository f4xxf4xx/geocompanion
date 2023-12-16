import ColoredRoadLine from 'components/geoguessr-solver/colored-road-line';
import { ClueType } from 'types/clue';

const CompareCell = ({
  title,
  items,
  clueType,
}: {
  title: string;
  items: string[];
  clueType: ClueType;
}) => {
  const renderItem = (item: string) => {
    if (clueType === ClueType.RoadLine) {
      return (
        <div className="flex items-center gap-2">
          <ColoredRoadLine value={item as any} />
        </div>
      );
    }
    return item;
  };

  return (
    <div className="bg-secondary p-2">
      {items?.length > 0 && (
        <>
          <h4>{title}</h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {items.map((item) => (
              <div className="bg-secondary flex min-w-[50px] p-2 items-center rounded shadow">
                {renderItem(item)}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CompareCell;
