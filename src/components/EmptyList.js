import React from 'react';

const EmptyList = ({title}) => {
  return (
    <div className='d-flex justify-content-center' style={{width: '100%'}}>
      <h3 className='text-center' style={{color: 'gray' }}>No {title} to show</h3>
    </div>
  );
}

export default EmptyList;
