import { Link } from 'components/layout/button';

const Header = () => (
  <header
    className="relative p-4 flex items-center justify-between z-40
  "
  >
    <Link to="/">
      <h1 className="text-3xl">
        <span className="font-bold">Geo</span>Companion
      </h1>
    </Link>
    <div className="flex gap-2">
      {/* <Link to="/geoguessr">Geoguessr Solver</Link> */}
      <Link to="/practice-tool">Geoguessr Practice Tool</Link>
    </div>
  </header>
);

export default Header;
