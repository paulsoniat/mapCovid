import React from 'react';
import closeIcon from '../../Assets/close-icon.svg';

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
        {textPrompt}
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