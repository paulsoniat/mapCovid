import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';

const News = ( { rootPath } ) => {

  const [newsData, setNewsData] = useState(null);

  const { name } = useParams();

  useEffect(()=>{
    axios.post('https://covid19-us-api.herokuapp.com/news', {
      "state": "LA",
      "topic": "Coronavirus"
  }).then((res) => {
    if (!newsData) {
      setNewsData(res.data);
    }
  })
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