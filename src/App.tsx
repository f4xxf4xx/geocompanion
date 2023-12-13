import 'App.css';
import { Tooltip } from 'react-tooltip';

function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Tooltip id="tooltip-country" place="bottom" />
      {children}
    </>
  );
}

export default App;
