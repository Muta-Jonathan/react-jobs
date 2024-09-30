import JobListing from './JobListing';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

const JobListings = ({isHome = false}) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async() => {
      try {
        const apiUrl = isHome ? '/api/jobs?_limit=3' : '/api/jobs';
        const response = await fetch(apiUrl);
        const data = await response.json();
  
        setJobs(data);
        } catch (error) {
        return error.message
      } finally {
        setLoading(false);
      }
     
    };

    fetchJobs();
  },[])

  return (
    <section className="bg-blue-50 px-4 py-10">
      <div className="container-xl lg:container m-auto">
        <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
          {isHome ? 'Recent Jobs' :'Browse Jobs'}
        </h2>
       
          {isLoading ? <Spinner loading={isLoading}/> : 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {jobs.map(job =>(
            <JobListing job={job} key= {job.id}/>
         ))}
          </div>}
      </div>
    </section>
  )
}

export default JobListings