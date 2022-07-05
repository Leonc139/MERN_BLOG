import React from 'react';
import './upload.scss';
// import { LoginBg } from '../../../assets';

const Upload = ({img, ...rest}) => {
  return (
    <div className="upload">
      {/* kl image ada baru munculkan image, jika tidak ada maka kosong */}
      {img && <img className="preview" src={img} alt="preview" /> }
        <input type="file" {...rest} />
    </div>
  )
}

export default Upload