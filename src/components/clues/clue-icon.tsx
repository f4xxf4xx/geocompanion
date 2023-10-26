import {
  faTree,
  faSun,
  faMountain,
  faMinus,
  faDroplet,
  faArrowLeft,
  faArrowRight,
  faCircle,
  faStarAndCrescent,
  faPlus,
  faStar,
  faPlay,
  faGripLinesVertical,
  faGripLines,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SelectedClue } from "types/types";

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
    "crescent-star": faStarAndCrescent,
    cross: faPlus,
    star: faStar,
    sun: faSun,
    triangle: faPlay, //triangle is pro
    stripes: faGripLines,
    "vertical-stripes": faGripLinesVertical,
  },
};

const ClueIcon = ({ clue }: { clue: SelectedClue }) => {
  const matchingIcon = iconMapping?.[clue.type]?.[clue.value];
  if (!matchingIcon) {
    return null;
  }
  return <FontAwesomeIcon icon={iconMapping[clue.type][clue.value]} />;
};

export default ClueIcon;
