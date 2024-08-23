import React, { useState } from 'react';
import './AddWidgetModal.css';

const AddWidgetModal = ({ isOpen, onClose, onAddWidget }) => {
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');

  const handleAddWidget = () => {
    if (widgetName && widgetText) {
      onAddWidget(widgetName, widgetText);
      setWidgetName('');
      setWidgetText('');
      onClose();
    } else {
      alert('Please fill in both fields.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Widget</h2>
          <button className="close-button" onClick={onClose}>✖</button>
        </div>
        <div className="modal-body">
          <input 
            type="text" 
            placeholder="Widget Name" 
            value={widgetName} 
            onChange={(e) => setWidgetName(e.target.value)} 
            className="input-field"
          />
          <textarea 
            placeholder="Widget Text" 
            value={widgetText} 
            onChange={(e) => setWidgetText(e.target.value)} 
            className="input-field"
          />
        </div>
        <div className="modal-footer">
          <button className="add-button" onClick={handleAddWidget}>Add Widget</button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;
