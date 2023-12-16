import { Button } from 'components/layout/button';
import useCountries from 'hooks/useCountry';
import { Country } from 'types/country';

const MetricList = () => {
  const { selectedAttribute, setSelectedAttribute, attributes } = useCountries();
  return (
    <div className="flex flex-col max-w-[224px] text-ellipsis overflow-hidden gap-2">
      {attributes.map((attribute) => (
        <Button
          isSelected={attribute === selectedAttribute}
          key={attribute}
          onClick={() => setSelectedAttribute(attribute as keyof Country)}
        >
          {attribute.replace(/_/g, ' ')}
        </Button>
      ))}
    </div>
  );
};

export default MetricList;
