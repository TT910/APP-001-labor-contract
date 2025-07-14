import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';

const ContractDetailPage = () => {
  const { id } = useParams();

  const actions = (
    <>
      <Link
        to="/"
        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        一覧へ戻る
      </Link>
      <button
        type="button"
        className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
      >
        プレビュー
      </button>
    </>
  );

  return (
    <Layout title={`契約詳細: ${id}`} actions={actions}>
      <div className="p-6 border border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center bg-white">
        <p className="text-gray-500">ここに契約書のプレビューが表示されます。</p>
      </div>
    </Layout>
  );
};

export default ContractDetailPage;
