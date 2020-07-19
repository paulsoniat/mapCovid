import React, { useEffect, useState } from "react";
import axios from 'axios';

const CountryNews = ( { newsData } ) => {

    const [altData, setAltData] = useState([]);

  useEffect(()=>{  
      if (newsData && !newsData.length && !altData.length) {
        let config = {
            headers : {
              'Subscription-Key': '3009d4ccc29e4808af1ccc25c69b4d5d' 
            }
          }
        axios.get(`https://api.smartable.ai/coronavirus/news/${'US'}`, config)
        .then((res) => {
          setAltData(res.data.news);
        })
      }
  });


if (newsData.length) {
  return (
    <>
      <div className="news-container">
            <div className="news-content">

              {newsData.map((newsStory) => {
                return (
                  <div key={newsStory.title}>
                  <div>
                    <a href={`${newsStory.webUrl}`}>
                        {newsStory.provider.name} - {newsStory.title}
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
} if  (altData.length) {
    return (
        <>
          <div className="news-container">
                <div className="news-content">
    
                  {altData.map((newsStory) => {
                    return (
                      <div key={newsStory.title}>
                      <div>
                        <a href={`${newsStory.webUrl}`}>
                            {newsStory.provider.name} - {newsStory.title}
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
else {
   return (
       <div>
           Loading...
       </div>
   )
}
};

export default CountryNews;