import App from 'App';
import Comparator from 'containers/compare-tool';
import Country from 'containers/country';
import GeoguessrSolver from 'containers/geoguessr-solver';
//import Home from 'containers/home';
import PracticeTool from 'containers/practice-tool';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <GeoguessrSolver />,
  },
  {
    path: '/geoguessr',
    element: <GeoguessrSolver />,
  },
  {
    path: '/compare',
    element: <Comparator />,
  },
  {
    path: '/practice-tool',
    element: <PracticeTool />,
  },
  {
    path: '/:countryCode',
    element: <Country />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') || document.createElement('div'));
root.render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>,
);
