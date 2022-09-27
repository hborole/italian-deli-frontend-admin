import React from 'react';

export default function Preview({ selectedImage, url }) {
  return (
    <div>
      <div className={`preview`}>
        <img
          src={url ? selectedImage : URL.createObjectURL(selectedImage)}
          alt="Thumb"
          className={`preview-image`}
        />
      </div>
      <p className="mt-2">
        <i>{url ? 'Current Image' : 'Selected Image'}</i>
      </p>
    </div>
  );
}
