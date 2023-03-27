import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import JobCard from "../Components/JobCard";
import axios from "axios";
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from "react-icons/md";



function JobsRoute() {
    const [jobs, setJobs] = useState([])

    const [jobTitle, setJobTitle] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [index, setIndex] = useState(0);

    const { query, location } = useParams();

    useEffect(() => {
        setJobTitle(query)
        setJobLocation(location)
    }, [query, location])

    useEffect(() => {
        axios.get(`https://find-that-job.herokuapp.com/jobs/${jobTitle}/${jobLocation}`)
            .then((res => {
                if (res.data === 'You reached me O_O?') {
                    setLoaded(false)
                    return;
                }
                else {
                    setJobs(res.data)
                }
            }))
            .catch((err) => {
                console.log(err);
            })

    }, [jobTitle, jobLocation])

    useEffect(() => {
        if (jobs.length < 1) {
            setLoaded(false)
            return
        }
        setLoaded(true)
    }, [jobs])

    const increment = () => {
        setIndex((index + jobs.length + 1) % jobs.length)
    }

    const decrement = () => {
        setIndex((index + jobs.length - 1) % jobs.length)
    }

    return (
        <div className="job-results">
            <nav>
                <form action={`http://localhost:3000/jobs/${jobTitle}/${jobLocation}`} method="GET" className='queryForm'>
                    <div>
                        <input defaultValue={jobTitle} required placeholder='Search Job Title' id="job_Title" onChange={(e) => setJobTitle(e.target.value)} />
                    </div>
                    <div>
                        <input required defaultValue={jobLocation} placeholder='Search Location' id="job_Location"  onChange={(e) => setJobLocation(e.target.value)} />
                    </div>
                    <button type={'submit'}>Search</button>
                </form>
                <h1>Searching for {query} in {location}. Results: ({jobs.length})</h1>
            </nav>
            <div className="job-results__jobs">
                {loaded ? <div className='jobs-wrapper'>
                    {
                        <div className='jobs-wrapper__box'>
                            <button className="slider-btn" onClick={decrement}>
                                <MdOutlineNavigateBefore />
                            </button>
                            <JobCard
                                titleHref={jobs[index].titleHref}
                                website={jobs[index].website}
                                jobTitle={jobs[index].jobTitle}
                                jobCompany={jobs[index].jobCompany}
                                jobLocation={jobs[index].jobLocation}
                            />

                            {index + 1 < jobs.length &&
                                <JobCard
                                    titleHref={jobs[index + 1].titleHref}
                                    website={jobs[index + 1].website}
                                    jobTitle={jobs[index + 1].jobTitle}
                                    jobCompany={jobs[index + 1].jobCompany}
                                    jobLocation={jobs[index + 1].jobLocation}
                                />
                            }
                            {index + 2 < jobs.length &&
                                <JobCard
                                    titleHref={jobs[index + 2].titleHref}  
                                    website={jobs[index + 2].website}
                                    jobTitle={jobs[index + 2].jobTitle}
                                    jobCompany={jobs[index + 2].jobCompany}
                                    jobLocation={jobs[index + 2].jobLocation}
                                />
                            }
                            <button className="slider-btn" onClick={increment}>
                                <MdOutlineNavigateNext />
                            </button>
                        </div>

                    }
                </div> : <Loader />}
            </div>
        </div>
    )
}

export default JobsRoute;
