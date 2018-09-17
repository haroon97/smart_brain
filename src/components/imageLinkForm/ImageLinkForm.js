import React from 'react';
import './imageLinkForm.css';

const ImageLinkForm = (props) => {
  return (
    <div>
      <p className='f3 center'>
        {'This Magic Brain will detect faces in your picture. Give it a try'}
      </p>
      <div className='center'>
        <div className='pa4 br3 shadow-5 center form'>
          <input type='text' className='f4 pa2 w-70 center' onChange={props.onInputChange}/>
          <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple button' onClick={props.onSubmit}>Detect</button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;