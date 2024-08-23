import React from 'react';
import "./Widget.css";

const Widget = ({ widget, onRemove }) => {
    return (
      <div className="widget">
        <div className="widget-header">
          <h4>{widget.name}</h4>
          <button className="remove-button" onClick={onRemove}>✖</button>
        </div>
        <p>{widget.text}</p>
      </div>
    );
  };
  
  export default Widget;