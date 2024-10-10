import React from 'react';
// import { ImagesComponent } from './ImagesComponent';
import { SideBar } from './SideBar';
import { ImagesComponent } from './ImagesComponent';

export const MainComponent = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <div className="flex flex-col lg:flex-row">
        <SideBar />
        <main className="flex-1 mt-4 lg:mt-0">
          <ImagesComponent />
        </main>
      </div>
    </div>
  );
};
