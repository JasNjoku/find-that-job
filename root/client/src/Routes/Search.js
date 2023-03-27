import {useState } from 'react'
import { Navigate } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa'

function Search() {
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [redirect, setRedirect] = useState(false)

  const search = (e) => {
    e.preventDefault();
    setJobTitle(document.getElementById('job_Title').value);
    setJobLocation(document.getElementById('job_Location').value);
    setRedirect(true)

  }
    return (
        <div className='search-page'>
          {redirect ? <Navigate to={`/jobs/${jobTitle}/${jobLocation}`} /> : null}
            <form onSubmit={search}>
            <a rel="noreferrer" target={'_blank'} id='github' title='Github'  href='https://github.com/JasNjoku'><FaGithub /></a>
            <h1>Find That Job</h1>
                <div className='form-inputs'>
                <div className='input-wrapper'>
                    <label>Job Title</label>
                    <input required id='job_Title' placeholder='Search Job...'/>
                </div>
                <div className='input-wrapper'>
                    <label>Job Location</label>
                    <input required id="job_Location" placeholder='Search Location' />
                </div>
                </div>
                <div className='form-submit'>
                    <button required type='submit'>Search</button>
                </div>
                
            </form>
        </div>
    )
}

export default Search;