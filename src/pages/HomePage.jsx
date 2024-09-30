import React from 'react'
import Hero from '../components/Hero';
import HomeCards from '../components/HomeCards';
import JobListings from '../components/JobListings';
import ViewJobsBtn from '../components/ViewJobsBtn';

const HomePage = () => {
  return (
    <>
    <Hero />
    <HomeCards /> 
    <JobListings isHome/>
    <ViewJobsBtn />  
    </>
  )    
}

export default HomePage