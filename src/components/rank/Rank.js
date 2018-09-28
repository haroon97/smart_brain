import React from 'react';

const Rank = (props) => {
  return (
    <div className='white f3'>
      <div className='center'>
        {props.userName}
      </div>
      <div className='center'>
        {props.submissions}
      </div>
    </div>
  );
};

export default Rank;