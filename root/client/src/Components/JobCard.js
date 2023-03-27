import { Link } from "react-router-dom";

function JobCard(props) {
    return (
    <div className='job-card' key={props.index}>
        <a rel="noreferrer" target={'_blank'} href={`https://${props.website}`}>{props.website}</a>
        <a className="job-card__title" rel="noreferrer" target={'_blank'} href={`${props.titleHref}`}><h2>{props.jobTitle}</h2></a>
        <h3 className='job-card__company'>{props.jobCompany}</h3>
        <h4 className='job-card__location'>{props.jobLocation}</h4>
    </div>
    )
}

export default JobCard;