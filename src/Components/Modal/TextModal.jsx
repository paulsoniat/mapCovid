import React from 'react';
import closeIcon from '../../Assets/close-icon.svg';
import ReactHtmlParser from 'react-html-parser';

const TextModal = ({
  handleClose, displayText, textPrompt,
}) => (
  <div className="overlay">
    <div className="generic-text-modal">
      <div className="modal__header">
        <div className="modal__title">
          {displayText}
        </div>
        <div className="modal__close">
        <img src={closeIcon} alt="Error" className="modal__image" onClick={handleClose}/>
        </div>
      </div>
      <div className="generic-text-modal__section">
        {textPrompt.map((text, index) => {
          return (
            <div key={index} className="generic-text-modal__section-text">{ReactHtmlParser(text)}</div>
          )
        })}
        <div className="generic-text-modal__button-container">
          <div className="generic-text-modal__button-accept" onClick={handleClose} > Enter!</div>
        </div>
      </div>
    </div>
  </div>
);

export default TextModal;

/*<a className="modal__close" onClick={handleClose}>
                <span class="left">
                <span class="circle-left"></span>
                <span class="circle-right"></span>
                </span>
                <span class="right">
                <span class="circle-left"></span>
                <span class="circle-right"></span>
                </span>
            </a>
            */