import React, { useState } from 'react';

const AdminPanel = ({ formData, onFormChange, isLocked }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState('');

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteReason.trim() === '') {
      alert('削除理由を入力してください。');
      return;
    }
    console.log('Deleting with reason:', deleteReason);
    // Add logic for logical delete here
    setIsModalOpen(false);
    setDeleteReason('');
  };

  return (
    <div className={`bg-white shadow sm:rounded-lg ${isLocked ? 'opacity-50' : ''}`}>
      <fieldset disabled={isLocked}>
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">管理パネル</h3>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* Status and Delete */}
            <div className="sm:col-span-2">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">ステータス</label>
              <div className="mt-1 flex items-center space-x-3">
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={onFormChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option>進行中</option>
                  <option>保留中</option>
                </select>
                <button
                  type="button"
                  onClick={handleDeleteClick}
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700"
                >
                  削除
                </button>
              </div>
            </div>

            {/* Retirement Section */}
            <div className="sm:col-span-6 border-t border-gray-200 pt-5">
              <div className="relative flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="isRetired"
                    name="isRetired"
                    type="checkbox"
                    checked={formData.isRetired}
                    onChange={onFormChange}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="isRetired" className="font-medium text-gray-700">退職処理</label>
                  <p className="text-gray-500">この契約を退職済みとして処理します。</p>
                </div>
              </div>
              <fieldset disabled={!formData.isRetired || isLocked} className={`mt-4 pl-7 ${!formData.isRetired ? 'opacity-50' : ''}`}>
                 <div className="sm:col-span-2">
                    <label htmlFor="retirement-date" className="block text-sm font-medium text-gray-700">退職日</label>
                    <input type="date" name="retirement-date" id="retirement-date" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                 </div>
              </fieldset>
            </div>
          </div>
        </div>
      </fieldset>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">契約の削除</h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">この契約を削除します。この操作は元に戻せません。削除理由を必ず入力してください。</p>
                      <textarea
                        rows={3}
                        value={deleteReason}
                        onChange={(e) => setDeleteReason(e.target.value)}
                        className="mt-2 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                        placeholder="削除理由（必須）"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="button" onClick={handleConfirmDelete} className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm">
                  削除実行
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm">
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
