import Hero from '../components/Hero';
import HomeCards from '../components/HomeCards';
import JobListings from '../components/JobListings';
import ViewJobsBtn from '../components/ViewJobsBtn';
import Developers from './Developers';

const HomePage = () => {
  return (
    <>
    <Hero />
    <HomeCards /> 
    <JobListings isHome/>
    <ViewJobsBtn />  
    <Developers /> 
    </>
  )    
}

export default HomePage