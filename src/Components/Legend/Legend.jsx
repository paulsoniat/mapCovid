import React from "react";


const Legend = () => {

  return (
    <>
        <dl>
            <dt className="alot">10k+</dt>
                <dd>10k+</dd>
            <dt className="tenk">5-10k</dt>
                <dd>5k-10k</dd>
            <dt className="fivek">2.5k-5k</dt>
                <dd>2.5k-5k</dd>
            <dt className="twohalfk">2k-2.5k</dt>
                <dd>2k-2.5k</dd>
            <dt className="twok">1.5k-2k</dt>
                <dd>1.5k-2k</dd>
            <dt className="onehalfk">1k-1.5k</dt>
                <dd>1k-1.5k</dd>
            <dt className="onek">500-1k</dt>
                <dd>500-1k</dd>
            <dt className="fivehunned">250-500</dt>
                <dd>250-500</dd>
            <dt className="twofitty"> {'<'}250</dt>
                <dd>250</dd>
        </dl>
    </>
  );
};

export default Legend;
