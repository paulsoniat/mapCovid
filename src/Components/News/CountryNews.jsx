import React, { useEffect, useState } from "react";

const CountryNews = ( { newsData } ) => {

  useEffect(()=>{    
  });

  console.log(newsData, 'from news')

if (newsData) {
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
}
else {
  return (
    <div>
      Loading News...
    </div>
  )
}
};

export default CountryNews;