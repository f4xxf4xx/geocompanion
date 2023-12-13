import { Link } from 'components/layout/button';

const Header = () => (
  <header className="flex items-center justify-between">
    <h1 className="text-3xl">
      <span className="font-bold">Geo</span>Companion
    </h1>
    <div>
      <Link to="/practice-tool">Practice Tool</Link>
    </div>
  </header>
);

export default Header;
