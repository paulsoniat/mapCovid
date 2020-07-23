import React, { useEffect, useState } from "react";
import axios from 'axios';
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
                  <div>
                    <a href={`${newsStory.url}`}>
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