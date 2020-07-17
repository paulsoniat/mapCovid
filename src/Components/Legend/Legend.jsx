import React from "react";


const Legend = () => {
        return (
          <>
              <div className="legendText">
                  Click a state to see more details
              </div>
              <div className="legendSub">
                 New Cases by State
              </div>
              <dl>
                  <div className="legend-text-container">
                    <dt className="alot"></dt>
                    10k+
                  </div>
                  <div className="legend-text-container">
                    <dt className="fivek"></dt>
                    5k-10k
                  </div>
                  <div className="legend-text-container">
                    <dt className="twohalfk"></dt>
                    1k-5k
                  </div>
                  <div className="legend-text-container">
                    <dt className="onek"></dt>
                    250-1k
                  </div>
                  <div className="legend-text-container">
                    <dt className="twofitty"></dt>
                    {'< '}250
                  </div>
              </dl>
          </>
        );
};

export default Legend;
