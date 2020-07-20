import React, { ChangeEvent, useEffect, useState } from "react";

import './copyable-text.css';

export const CopyableText = (props: { value: string, label?: string }) => {
  
  const [value, setValue] = useState(null);
  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.value);
  }

  return (
    <div className="detail">
      { props.label 
        ? <div className="label">{props.label}</div> 
        : ''
      }
      <div className="text-box">{props.value}</div>
      <button type="button" onClick={copyToClipboard}>Copy</button>
    </div>
  )
}
