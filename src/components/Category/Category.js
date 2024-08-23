import React from 'react';
import Widget from '../Widget/Widget';
import "./Category.css";

const Category = ({ category, onAddWidget, onRemoveWidget }) => {
  const hasNoWidgets = category.widgets.length === 0;
    return (
      <div className="category">
        <h2 className="category-title">{category.category}</h2>
        <div className="widgets-grid">
          {category.widgets.map(widget => (
            <Widget 
              key={widget.id} 
              widget={widget} 
              onRemove={() => onRemoveWidget(category.id, widget.id)} 
            />
          ))}
          <div  className={`add-widget-box ${hasNoWidgets ? 'empty-widget-box' : ''}`} 
           onClick={() => onAddWidget(category.id)}>
            <span className="add-widget-icon">+ Add Widget</span>
          </div>
        </div>
      </div>
    );
  };
  

export default Category;
