import React, { createContext } from 'react';
interface layoutContextType {
  'gutter': string | number;
}
const DataContext = createContext<layoutContextType | null>(null);
export default DataContext;
