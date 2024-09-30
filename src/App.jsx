import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import JobsPage from './pages/JobsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import JobPage, {jobLoader} from './pages/JobPage';
import AddJobPage from './pages/AddJobPage';
import EditJobPage from './pages/EditJobPage';


// Main App component
const App = () => {
  //add new Job
  const addJob = async (newJob) => {
    const response = await fetch('/api/jobs', {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newJob),
    });

    return;
  }

  //edit existing job
  const updateJob = async (editedJob) => {
    const response = await fetch(`/api/jobs/${editedJob.id}`, {
      method: 'PUT', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(editedJob),
    });

    return;
  }
 

  //delete existing job
  const deleteJob = async (jobId) => {
    const response = await fetch(`/api/jobs/${jobId}`, {
      method: 'DELETE', 
    });

    return;
  }
  // Create the routes with MainLayout as the parent
  const router = createBrowserRouter([
    {
      path: '/', // Parent route for MainLayout
      element: <MainLayout />, // MainLayout wraps the child route
      children: [
        {
          path: '/', // Child route for HomePage
          element: <HomePage />, // HomePage inside MainLayout
        },
        {
          path: '/jobs', // Child route for HomePage
          element: <JobsPage />, // HomePage inside MainLayout
        },
        {
          path: '/jobs/:id', // Child route for HomePage
          element: <JobPage deleteJob = {deleteJob}/>, 
          loader: jobLoader
        },
        {
          path: '/add-job', // Child route for HomePage
          element: <AddJobPage addJobSubmit={addJob} />, 
        },
        {
          path: '/edit-job/:id', // Child route for HomePage
          element: <EditJobPage updateJob = {updateJob}/>, 
          loader: jobLoader
        },
        {
          path: '*', // Child route for HomePage
          element: <NotFoundPage />, // HomePage inside MainLayout
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
