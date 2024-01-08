import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyLoadingImage/img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import "./style.scss"

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const {url} = useSelector((state) => state.home);
    const {data, loading} = useFetch("/movie/upcoming");


    useEffect(()=>{
        const bg = url.backdrop + data?.results[Math.floor(
            Math.random() * 20) ]?.backdrop_path;
            setBackground(bg);
            console.log("Value of src:",  url);

    }, [data]);

    const searchQueryHandler = ()=>{
        if( query.length >0)
        {
            navigate(`/search/${query}`);
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            searchQueryHandler();
        }
      };


  return (
    <div className="heroBanner">
       {!loading && <div className="backdrop-img">
            <Img src={background}/>
        </div>}

        <div className="opacity-layer">
            
        </div>
        <ContentWrapper>       
            <div className="heroBannerContent">
                <span className="title">welcome.</span>
                <span className="subTitle">
                     Millions of movies, TV shows and people to discover.
                     Explore now.
                </span>
                <div className="searchInput">
                   <input 
                      type="text"
                      onChange={(e)=>setQuery(e.target.value)}
                      onKeyUp={handleKeyPress}
                      placeholder="Search for a movie or Tv show..."
                   /> 
                   <button onClick={searchQueryHandler}>search</button>
                </div>
            </div>       
        </ContentWrapper>   
    </div>
  )
}

export default HeroBanner
