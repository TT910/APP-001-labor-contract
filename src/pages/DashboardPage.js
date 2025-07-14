import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const DashboardPage = () => {
  const actions = (
    <Link
      to="/new"
      className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      新規作成
    </Link>
  );

  const contracts = [
    { id: 'EMP-001', name: '田中 太郎', type: '正社員', status: '進行中' },
    { id: 'PRT-002', name: '鈴木 花子', type: 'パート', status: '承認済' },
    { id: 'EMP-003', name: '佐藤 次郎', type: '正社員', status: '保留中' },
  ];

  return (
    <Layout title="契約一覧" actions={actions}>
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {contracts.map((contract) => (
            <li key={contract.id}>
              <Link to={`/contract/${contract.id}`} className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-indigo-600">{contract.name}</p>
                    <div className="ml-2 flex flex-shrink-0">
                      <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                        {contract.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">{contract.type}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default DashboardPage;
