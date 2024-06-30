import React, { useState } from 'react';
import Search from './Search';

const App: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const HandleSearch = (value : string) => {
    setSearchValue(value);
  };

  return (
    <div className="App">
      <Search onSearch={HandleSearch}/>
    </div>
  );
}

export default App;
