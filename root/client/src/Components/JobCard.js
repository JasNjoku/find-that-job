function JobCard(props) {

    return (
    <div className='job-ard' key={props.index}>
        <p className='job-card__title'>{props.jobTitle}</p>
        <p className='job-card__company'>{props.jobCompany}</p>
        <p className='job-card__location'>{props.jobLocation}</p>
    </div>
    )
}

export default JobCard;