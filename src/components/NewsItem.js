// import { getByTitle } from '@testing-library/react'
import React from 'react'

const NewsItem = (props)=> {
    let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
        <div style={{display:'flex', justifyContent: 'center', right:'0', position:'absolute'}}>
        <span class="badge rounded-pill bg-danger">
          {source}
        </span>
        </div>
          <img src={!imageUrl?"https://images.moneycontrol.com/static-mcnews/2022/03/fandosensexniftyderivative-1-770x433.jpg":imageUrl} className="card-img-top" alt="..." style={{width: "286px", height: "161px"}}/>
          <div className="card-body"> 
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className='card-text'><small className='text-muted'>By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem
