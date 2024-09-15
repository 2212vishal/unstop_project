import React from 'react';

function Footer() {
  return (
    <div className="bg-neutral-100 flex justify-center text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200 lg:text-left">
      <footer className="w-11/12 ">
        <div className="flex justify-center border-b-2 border-neutral-200 p-6 dark:border-neutral-500 ">
          <div className="mr-12 flex items-center flex-col">
            <span className="text-3xl ">UNSTOP ASSIGNMENT</span>
            <span>credntials that matter</span>
          </div>
        </div>

        
        <div className="bg-neutral-200 p-6 text-center dark:bg-neutral-700">
          <span>© 2024 Copyright: Vishal</span>
          
        </div>
      </footer>
    </div>
  );
}

export default Footer;
