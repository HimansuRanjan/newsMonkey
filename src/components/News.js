import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=> {
  const [articles, setArticle] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  
  
  const capitalizeLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(()=>{
    document.title = `${capitalizeLetter(props.category)} - NewsMonkey`;
    updateNews();
    // eslint-disable-next-line
  },[])


  const updateNews = async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&pageSize=${props.pageSize}&page=${page}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    console.log(parsedData);
    props.setProgress(70);
    setArticle( parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  const fetchMoreData =  async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=${props.apiKey}&pageSize=${props.pageSize}&page=${page+1}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    setArticle(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  }

  return (
      <>
        <h1 className="text-center" style={{margin:'35px 0px', marginTop: '90px'}}>
          NewsMonkey - Top {capitalizeLetter(props.category)}{" "}
          Headlines{" "}
        </h1>

        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container my-3">
            <div className="row">
              {articles.map((element) => {
                return (<div className="col-md-4" key={element.url}><NewsItem title={element.title ? element.title.slice(0, 45) : ""} 
                  description={element.description? element.description.slice(0, 45): ""} imageUrl={element.urlToImage} newsUrl={element.url} 
                  author={element.author} date={element.publishedAt} source={element.source.name} /></div> 
                  );
              })}
            </div>
          </div>
        </InfiniteScroll>
       
      </>
    );
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
