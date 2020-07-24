import React, { useEffect, useState } from "react";
import axios from 'axios';
import NewsPaper from '../Loaders/NewsPaper';
import { useParams } from 'react-router-dom';

const News = ( { rootPath, newsData} ) => {

  const { name } = useParams();

  useEffect(()=>{
  });

if (newsData) {
  return (
    <>
      <div className="news-container">
            <div className="news-content">

              {newsData.message.map((newsStory) => {
                return (
                  <div key={newsStory.title}>
                  <div className="news-story">
                    <NewsPaper /> 
                    <a className="news-link" href={`${newsStory.url}`}>
                        {newsStory.title}
                    </a>
                  </div>
                  <br />
                  </div>
                )
              })}
            </div>
      </div>
    </>
  );
}
};

export default News;