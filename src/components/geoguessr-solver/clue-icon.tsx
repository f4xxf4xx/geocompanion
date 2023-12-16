import {
  faArrowLeft,
  faArrowRight,
  faCircle,
  faDroplet,
  faGripLines,
  faGripLinesVertical,
  faMinus,
  faMountain,
  faPlay,
  faPlus,
  faStar,
  faStarAndCrescent,
  faSun,
  faTree,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SelectedClue } from 'types/clue';

const iconMapping = {
  scenery: {
    desert: faSun,
    mountains: faMountain,
    woods: faTree,
    flat: faMinus,
    tropical: faDroplet,
  },
  driving: {
    left: faArrowLeft,
    right: faArrowRight,
  },
  flagPattern: {
    circle: faCircle,
    'crescent-star': faStarAndCrescent,
    cross: faPlus,
    star: faStar,
    sun: faSun,
    triangle: faPlay, //triangle is pro
    stripes: faGripLines,
    'vertical-stripes': faGripLinesVertical,
  },
};

const ClueIcon = ({ clue }: { clue: SelectedClue }) => {
  const iconCategory = iconMapping[clue.type as keyof typeof iconMapping];
  const matchingIcon = iconCategory?.[clue.value as keyof typeof iconCategory];
  if (!matchingIcon) {
    return null;
  }
  return <FontAwesomeIcon icon={matchingIcon} />;
};

export default ClueIcon;
