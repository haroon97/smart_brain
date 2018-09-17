import React from 'react';
import './faceRecognition.css';

const FaceRecognition = (props) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputImage' src={props.imageUrl} width='500px' height='auto'/>
        <div className='bounding-box' style={{top: props.box.topRow, left: props.box.leftCol, right: props.box.rightCol, bottom: props.box.bottomRow}}></div>
      </div>
    </div>
  );
};

export default FaceRecognition;