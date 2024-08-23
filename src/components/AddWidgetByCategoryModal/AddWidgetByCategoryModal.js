import React, { useState , useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWidget, removeWidget } from '../../widgetsActions/actions';
import Swal from "sweetalert2";
import './AddWidgetByCategoryModal.css';

const AddWidgetByCategoryModal = ({ isOpen, onClose }) => {
  const categories = useSelector(state => state.dashboard.categories);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const dispatch = useDispatch();

  // Effect to reset fields when the modal is closed
  useEffect(() => {
    if (!isOpen) {
      setSelectedCategoryId(null);
      setWidgetName('');
      setWidgetText('');
      }
  }, [isOpen]);

  const handleAddWidget = () => {
    if (selectedCategoryId && widgetName && widgetText) {
      const newWidget = {
        id: new Date().getTime(),
        name: widgetName,
        text: widgetText
      };
      dispatch(addWidget(selectedCategoryId, newWidget));
      Swal.fire({
        title: "Widget Added",
        icon: "success",
        timer: 1000,
        showCloseButton: true,
        allowOutsideClick: false,
        showConfirmButton: false,
      });
      setWidgetName('');
      setWidgetText('');
      setSelectedCategoryId(null);
      onClose();
    }
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch(removeWidget(categoryId, widgetId));
    Swal.fire({
      title: "Widget Removed",
      icon: "success",
      timer: 1000,
      showCloseButton: true,
      allowOutsideClick: false,
      showConfirmButton: false,
    });
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>Add Widget</h2>
        <div className="category-select">
          <label htmlFor="categories">Select Category:</label>
          <select
            id="categories"
            value={selectedCategoryId || ''}
            onChange={e => setSelectedCategoryId(Number(e.target.value))}
          >
            <option value="">Select a Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.category}
              </option>
            ))}
          </select>
        </div>
        {selectedCategoryId && (
          <div>
            <h3>Widgets in Selected Category</h3>
            <ul>
              {categories.find(c => c.id === selectedCategoryId)?.widgets.map(widget => (
                <li key={widget.id}>
                  {widget.name} <button onClick={() => handleRemoveWidget(selectedCategoryId, widget.id)}>Remove</button>
                </li>
              ))}
            </ul>
            <div>
              <input
                type="text"
                placeholder="Widget Name"
                value={widgetName}
                onChange={e => setWidgetName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Widget Text"
                value={widgetText}
                onChange={e => setWidgetText(e.target.value)}
              />
              <button onClick={handleAddWidget}>Add Widget</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddWidgetByCategoryModal;
