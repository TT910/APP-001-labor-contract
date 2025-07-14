import React from 'react';

const ContractForm = ({ formData, onFormChange, onPresetChange, isLocked, age, probationEndDate, isPostProbationEditable }) => {
  const { employmentType, weeklyHours } = formData;

  const renderPartTimeSpecifics = () => (
    <>
      <div className="sm:col-span-6">
        <label className="block text-sm font-medium text-gray-700">勤務時間プリセット</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {['10:00-17:00', '09:00-18:00', '13:00-22:00'].map(p => (
            <button key={p} type="button" onClick={() => onPresetChange(p)} className={`px-3 py-1.5 border rounded-md text-sm ${formData.workHoursPreset === p ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300'}`}>
              {p}
            </button>
          ))}
          <button type="button" onClick={() => onPresetChange('other')} className={`px-3 py-1.5 border rounded-md text-sm ${formData.workHoursPreset === 'other' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700 border-gray-300'}`}>
            その他
          </button>
        </div>
      </div>

      {formData.workHoursPreset === 'other' && (
        <>
          <div className="sm:col-span-3">
            <label htmlFor="workStartTime" className="block text-sm font-medium text-gray-700">始業時刻</label>
            <input type="time" name="workStartTime" id="workStartTime" value={formData.workStartTime} onChange={onFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="workEndTime" className="block text-sm font-medium text-gray-700">終業時刻</label>
            <input type="time" name="workEndTime" id="workEndTime" value={formData.workEndTime} onChange={onFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
          </div>
        </>
      )}

      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700">休憩時間</label>
        <p className="mt-2 text-sm text-gray-900">{weeklyHours > 40 ? '60分' : weeklyHours > 30 ? '45分' : '0分'}</p>
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm font-medium text-gray-700">週の所定労働時間</label>
        <p className="mt-2 text-sm text-gray-900">{weeklyHours.toFixed(2)} 時間</p>
      </div>

      <div className="sm:col-span-3">
        <label className="block text-sm font-medium text-gray-700">社会保険</label>
        <div className="mt-2 space-y-2">
          {['join', 'not-join'].map(val => (
            <div key={val} className="flex items-center">
              <input id={`social-${val}`} name="socialInsurance" type="radio" value={val} checked={formData.socialInsurance === val} onChange={onFormChange} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <label htmlFor={`social-${val}`} className="ml-3 block text-sm text-gray-700">{val === 'join' ? '加入' : '非加入'}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="sm:col-span-3">
        <label className="block text-sm font-medium text-gray-700">雇用保険</label>
        <div className="mt-2 space-y-2">
          {['join', 'not-join'].map(val => (
            <div key={val} className="flex items-center">
              <input id={`employment-${val}`} name="employmentInsurance" type="radio" value={val} checked={formData.employmentInsurance === val} onChange={onFormChange} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <label htmlFor={`employment-${val}`} className="ml-3 block text-sm text-gray-700">{val === 'join' ? '加入' : '非加入'}</label>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className={`bg-white shadow sm:rounded-lg ${isLocked ? 'opacity-50' : ''}`}>
      <fieldset disabled={isLocked}>
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">契約書フォーム</h3>
          
          {/* Tabs */}
          <div className="mt-4">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button onClick={() => onFormChange({ target: { name: 'employmentType', value: 'full-time' } })} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${employmentType === 'full-time' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  正社員
                </button>
                <button onClick={() => onFormChange({ target: { name: 'employmentType', value: 'part-time' } })} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${employmentType === 'part-time' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  パート・アルバイト
                </button>
              </nav>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            {/* Common Fields */}
            <div className="sm:col-span-2">
              <label htmlFor="staffCode" className="block text-sm font-medium text-gray-700">スタッフコード (任意)</label>
              <input type="text" name="staffCode" id="staffCode" value={formData.staffCode} onChange={onFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="sm:col-span-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">氏名</label>
              <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={onFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700">生年月日</label>
              <input type="date" name="birthDate" id="birthDate" value={formData.birthDate} onChange={onFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>
            <div className="sm:col-span-1">
              <label className="block text-sm font-medium text-gray-700">年齢</label>
              <p className="mt-2 text-sm text-gray-900">{age !== null ? `${age}歳` : '-'}</p>
            </div>

            {/* Probation Period */}
            <div className="sm:col-span-6 border-t border-gray-200 pt-5">
              <h4 className="text-md font-medium text-gray-800">試用期間</h4>
              <div className="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <label htmlFor="probationPeriod" className="block text-sm font-medium text-gray-700">期間</label>
                  <select id="probationPeriod" name="probationPeriod" value={formData.probationPeriod} onChange={onFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm">
                    <option value="0">なし</option>
                    <option value="1">1ヶ月</option>
                    <option value="2">2ヶ月</option>
                    <option value="3">3ヶ月</option>
                    <option value="4">4ヶ月</option>
                    <option value="5">5ヶ月</option>
                    <option value="6">6ヶ月</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="probationStartDate" className="block text-sm font-medium text-gray-700">試用期間 開始日</label>
                  <input type="date" name="probationStartDate" id="probationStartDate" value={formData.probationStartDate} onChange={onFormChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="probationEndDate" className="block text-sm font-medium text-gray-700">
                    {formData.probationPeriod === '0' ? '契約期間 終了日' : '試用期間 終了日'}
                  </label>
                  <input type="date" name="probationEndDate" id="probationEndDate" value={probationEndDate} readOnly className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm bg-gray-50" />
                </div>
              </div>
            </div>

            {/* Commuting Allowance */}
            <div className="sm:col-span-3">
              <label htmlFor="commuting-allowance" className="block text-sm font-medium text-gray-700">通勤手当</label>
              <input type="text" name="commuting-allowance" id="commuting-allowance" defaultValue="上限 20,000円/月" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
            </div>

            {/* Employment Type Specific Fields */}
            {employmentType === 'part-time' && renderPartTimeSpecifics()}

            {/* Post-Probation Actions */}
            <div className={`sm:col-span-6 border-t border-gray-200 pt-5 ${!isPostProbationEditable ? 'opacity-50' : ''}`}>
              <fieldset disabled={!isPostProbationEditable || isLocked}>
                <h4 className="text-md font-medium text-gray-800">契約条件（本採用後）</h4>
                <p className="text-sm text-gray-500">試用期間が「なし」または終了した場合に編集可能になります。</p>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center">
                    <input id="promote" name="postProbationAction" type="radio" value="promote" onChange={onFormChange} checked={formData.postProbationAction === 'promote'} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="promote" className="ml-3 block text-sm font-medium text-gray-700">正社員として登用する</label>
                  </div>
                  {formData.postProbationAction === 'promote' && (
                     <button type="button" className="ml-7 text-sm text-indigo-600 hover:text-indigo-500">パート・アルバイト用フォームに戻る</button>
                  )}
                  <div className="flex items-center">
                    <input id="other" name="postProbationAction" type="radio" value="other" onChange={onFormChange} checked={formData.postProbationAction === 'other'} className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <label htmlFor="other" className="ml-3 block text-sm font-medium text-gray-700">その他（条件を直接入力）</label>
                  </div>
                  <button type="button" className="text-sm text-gray-600 hover:text-gray-800">選択をリセット</button>
                </div>
              </fieldset>
            </div>

          </div>
        </div>
      </fieldset>
    </div>
  );
};

export default ContractForm;
