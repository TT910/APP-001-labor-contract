import React from 'react';

const Layout = ({ title, actions, children }) => {
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-lg font-semibold leading-6 text-gray-900">
            労働条件・雇用契約アプリ v1.0
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-10 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl">{title}</h1>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                {actions}
              </div>
            </div>
          </div>
          <div className="mt-8">
            {children}
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
