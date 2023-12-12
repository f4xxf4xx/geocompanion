import { Link } from 'react-router-dom';

const Header = () => (
  <header className="flex items-center justify-between">
    <h1 className="text-3xl">
      <span className="font-bold">Geo</span>Companion
    </h1>
    <div>
      <Link
        className="border-solid border p-2 rounded-lg shadow border-gray hover:bg-primary hover:text-secondary"
        to="/practice-tool"
      >
        Practice Tool
      </Link>
    </div>
  </header>
);

export default Header;
