import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { format, addMonths, differenceInYears, isPast } from 'date-fns';
import Layout from '../components/Layout';
import AdminPanel from '../components/AdminPanel';
import ContractForm from '../components/ContractForm';

const ContractEditorPage = () => {
  const { id } = useParams();
  const isNew = !id;
  const pageTitle = isNew ? "新規契約作成" : `契約情報編集: ${id}`;

  const [formData, setFormData] = useState({
    // AdminPanel state
    status: '進行中',
    isRetired: false,
    // ContractForm state
    staffCode: '',
    fullName: '',
    birthDate: '',
    employmentType: 'full-time', // 'full-time' or 'part-time'
    // Probation
    probationPeriod: '3', // in months, '0' for none
    probationStartDate: format(new Date(), 'yyyy-MM-dd'),
    // Part-time specific
    workHoursPreset: '',
    workStartTime: '',
    workEndTime: '',
    weeklyHours: 0,
    // Insurance
    socialInsurance: 'unselected', // 'join', 'not-join', 'unselected'
    employmentInsurance: 'unselected', // 'join', 'not-join', 'unselected'
    // Post-probation
    postProbationAction: '', // 'promote', 'other'
  });

  const [isFormLocked, setIsFormLocked] = useState(false);

  // --- Derived State ---
  const age = formData.birthDate ? differenceInYears(new Date(), new Date(formData.birthDate)) : null;
  
  const probationEndDate = formData.probationPeriod !== '0' && formData.probationStartDate
    ? format(addMonths(new Date(formData.probationStartDate), parseInt(formData.probationPeriod, 10)), 'yyyy-MM-dd')
    : '';

  const isPostProbationEditable = formData.probationPeriod === '0' || (probationEndDate && isPast(new Date(probationEndDate)));

  // --- Effects ---
  useEffect(() => {
    setIsFormLocked(formData.status === '保留中');
  }, [formData.status]);

  useEffect(() => {
    if (formData.employmentType === 'part-time') {
      const start = formData.workStartTime ? parseInt(formData.workStartTime.split(':')[0], 10) : 0;
      const end = formData.workEndTime ? parseInt(formData.workEndTime.split(':')[0], 10) : 0;
      const dailyHours = end > start ? end - start : 0;
      const breakTime = dailyHours > 8 ? 1 : (dailyHours > 6 ? 0.75 : 0);
      const weeklyHours = (dailyHours - breakTime) * 5; // Assuming 5 days a week for simplicity
      
      setFormData(prev => ({
        ...prev,
        weeklyHours: weeklyHours,
        socialInsurance: weeklyHours >= 20 ? 'join' : 'not-join',
        employmentInsurance: weeklyHours >= 20 ? 'join' : 'not-join',
      }));
    }
  }, [formData.employmentType, formData.workStartTime, formData.workEndTime]);


  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePresetChange = (preset) => {
    if (preset === 'other') {
      setFormData(prev => ({ ...prev, workHoursPreset: 'other', workStartTime: '', workEndTime: '' }));
    } else {
      const [start, end] = preset.split('-');
      setFormData(prev => ({ ...prev, workHoursPreset: preset, workStartTime: start, workEndTime: end }));
    }
  };

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
        保存
      </button>
    </>
  );

  return (
    <Layout title={pageTitle} actions={actions}>
      <div className="space-y-8">
        <AdminPanel
          formData={formData}
          onFormChange={handleFormChange}
          isLocked={isFormLocked}
        />
        <ContractForm
          formData={formData}
          onFormChange={handleFormChange}
          onPresetChange={handlePresetChange}
          isLocked={isFormLocked}
          age={age}
          probationEndDate={probationEndDate}
          isPostProbationEditable={isPostProbationEditable}
        />
      </div>
    </Layout>
  );
};

export default ContractEditorPage;
