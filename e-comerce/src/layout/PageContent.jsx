
import React from 'react';
import { Outlet } from 'react-router-dom';

const PageContent = () => {
  return <main className="p-4"><Outlet /></main>;
};

export default PageContent;
