import React from 'react';

const FileInput = ({ label, name, accept, onChange }) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <input type="file" id={name} name={name} className="form-control" accept={accept} onChange={onChange} />
    </div>
  );
};

export default FileInput;
