// src/components/Dashboard/Dashboard.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addWidget, removeWidget, addCategory } from '../../widgetsActions/actions';
import Category from '../Category/Category';
import AddWidgetModal from '../AddWidgetModal/AddWidgetModal';
import Swal from "sweetalert2";
import "./Dashboard.css";

const Dashboard = ({ searchQuery }) => {
  const categories = useSelector(state => state.dashboard.categories);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  const handleOpenModal = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddWidget = (widgetName, widgetText) => {
    const newWidget = {
      id: new Date().getTime(),
      name: widgetName,
      text: widgetText
    };
    Swal.fire({
      title: "Widget Added",
      icon: "success",
      timer: 1000,
      showCloseButton: true,
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    dispatch(addWidget(selectedCategoryId, newWidget));
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

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      dispatch(addCategory(newCategoryName.trim()));
      setNewCategoryName('');
      setIsAddCategoryModalOpen(false);
    }
    Swal.fire({
      title: "Category Added",
      icon: "success",
      timer: 1000,
      showCloseButton: true,
      allowOutsideClick: false,
      showConfirmButton: false,
    });
  };

  // Filtering the categories and widgets based on the search query
  const filteredCategories = categories.map(category => {
    const filteredWidgets = category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      widget.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return {
      ...category,
      widgets: filteredWidgets,
    };
  }).filter(category => 
    category.widgets.length > 0 || 
    category.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <React.Fragment>
     <div className="dashboard-header">
      <h1 className="dashboard-title">CNAPP Dashboard</h1>
      <button className="add-category-button" onClick={() => setIsAddCategoryModalOpen(true)}>
        Add Category +
      </button>  
     </div>  
      <div className="dashboard">
        {filteredCategories.length > 0 ? (
          filteredCategories.map(category => (
            <Category 
              key={category.id} 
              category={category} 
              onAddWidget={handleOpenModal} 
              onRemoveWidget={handleRemoveWidget} 
            />
          ))
        ) : (
          <div className="no-results-message">
            No dashboard or widgets found.
          </div>
        )}
        <AddWidgetModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          onAddWidget={handleAddWidget} 
        />
      </div>
      {isAddCategoryModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Category</h2>
              <button className="close-button" onClick={() => setIsAddCategoryModalOpen(false)}>✖</button>
            </div>
            <div className="modal-body">
              <input 
                type="text" 
                placeholder="Category Name" 
                value={newCategoryName} 
                onChange={(e) => setNewCategoryName(e.target.value)} 
                className="input-field"
              />
            </div>
            <div className="modal-footer">
              <button className="add-button" onClick={handleAddCategory}>Add Category</button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Dashboard;
