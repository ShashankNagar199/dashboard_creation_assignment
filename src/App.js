import React, { useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import "./App.css";
import AddWidgetByCategoryModal from './components/AddWidgetByCategoryModal/AddWidgetByCategoryModal';
import Header from './components/Header/Header';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      <button className="add-widget-button" onClick={openModal}>Add Widget +</button>
      <Dashboard searchQuery={searchQuery} />
      <AddWidgetByCategoryModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default App;
