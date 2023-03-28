import './App.css';
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider
} from 'react-router-dom';
import Search from './Routes/Search';
import JobsRoute from './Routes/JobsRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Search />,
  },
  {
    path: 'jobs/:query/:location',
    element: <JobsRoute />
  }
])


function App() {

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
