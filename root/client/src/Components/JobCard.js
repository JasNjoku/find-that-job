function JobCard(props) {

    return (
    <div className='job-card' key={props.index}>
        <p>{props.website}</p>
        <p className='job-card__title'>{props.jobTitle}</p>
        <p className='job-card__company'>{props.jobCompany}</p>
        <p className='job-card__location'>{props.jobLocation}</p>
    </div>
    )
}

export default JobCard;