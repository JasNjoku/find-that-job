import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import JobCard from './Components/JobCard';


function App() {
  const [jobs, setJobs] = useState([])

  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  // const [loaded, setLoaded] = useState(true)

  useEffect(() => {
    axios.get(`http://localhost:4000/jobs/${jobTitle}/${jobLocation}`)
      .then((res => {
        if (res.data === 'You reached me O_O?') {
          // setLoaded(false)
          return;
        }

        setJobs(res.data)
        // setLoaded(true)

      }))
  }, [jobTitle, jobLocation])

  const search = (e) => {
    e.preventDefault();
    // setLoaded(false);

    setJobTitle(document.getElementById('job_Title').value);
    setJobLocation(document.getElementById('job_Location').value);

  }

  return (
    <div className="App">
      <form onSubmit={search} className='queryForm'>
        <div>
          <label>Job Title</label>
          <input required placeholder='Enter Job Title' id="job_Title" />
        </div>
        <div>
          <label>Job Location</label>
          <input required placeholder='Enter Location' id="job_Location" />
        </div>
        <button type={'submit'}>Search</button>
      </form>

      <div className='content_left'>
        <div className='wrapper'>
          <h1>Jobs</h1>
          {jobs.map((job, index) =>
            <JobCard
              jobTitle={job.jobTitle}
              jobCompany={job.jobCompany}
              jobLocation={job.jobLocation}
              index={index}
            />
          )}
        </div>
      </div>

      <div className='content_right'>
      </div>
    </div>
  );
}

export default App;
