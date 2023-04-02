import React from 'react';
import { SearchBar } from './searchbar';

const SearchBarDemo = () => {
  return (
    <>
      <div className="demo">
        <h3>基础用法</h3>
        {/* @ts-ignore */}
        <SearchBar
          background="black"
          placeholder="基本使用"
        />
        <h3>基础用法</h3>
        {/* @ts-ignore */}
        <SearchBar
          background="cyan"
          placeholder="基本使用"
          shape="round"
        />
      </div>
    </>
  );
};

export default SearchBarDemo;
