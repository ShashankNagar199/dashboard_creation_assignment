import { ADD_WIDGET, REMOVE_WIDGET,ADD_CATEGORY } from '../widgetsActions/actions';
import initialData from '../initialWidgetsData.json';

// Load initial data from localStorage or fallback to initialData
const loadInitialData = () => {
  const savedData = localStorage.getItem('dashboardData');
  return savedData ? JSON.parse(savedData) : initialData;
};

const initialState = {
  categories: loadInitialData()
};

export const dashboardReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case ADD_WIDGET:
      newState = {
        ...state,
        categories: state.categories.map(category => 
          category.id === action.payload.categoryId
            ? {
                ...category,
                widgets: [...category.widgets, action.payload.widget]
              }
            : category
        )
      };
      break;
      
    case REMOVE_WIDGET:
      newState = {
        ...state,
        categories: state.categories.map(category => 
          category.id === action.payload.categoryId
            ? {
                ...category,
                widgets: category.widgets.filter(widget => widget.id !== action.payload.widgetId)
              }
            : category
        )
      };
      break;

      case ADD_CATEGORY:
        const newCategory = {
          id: new Date().getTime(),  // Generating an unique ID
          category: action.payload.categoryName,
          widgets: []
        };
        newState = {
          ...state,
          categories: [...state.categories, newCategory]
        };
        break;  
      
    default:
      return state;
  }

  // Save updated state to localStorage
  localStorage.setItem('dashboardData', JSON.stringify(newState.categories));
  return newState;
};
