import React, { useEffect, useState } from "react";
import axios from 'axios';
import BacteriaLoader from '../Loaders/BacteriaLoader';
import { useParams } from 'react-router-dom';
import News from '../News/News.jsx';

const Country = ( { rootPath } ) => {

  const [newsData, setNewsData] = useState(null);

  const { name } = useParams();

  useEffect(()=>{
    axios.post('http://covid19-us-api.herokuapp.com/news', {
      "state": "LA",
      "topic": "Coronavirus"
  }).then((res) => {
    if (!newsData) {
      setNewsData(res.data);
    }
    console.log(newsData)
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
              Scroll Down
            </div>
      </div>
    </>
  );
}
else {
  return (
    <div>
      Loading...
    </div>
  )
}
};

export default Country;