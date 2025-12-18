import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import axios from '../api/axios';
import { Plus, Edit, Trash2, ArrowLeft } from 'lucide-react';

function AddPlan() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [planForm, setPlanForm] = useState({ name: '', price: '', data: '', validity: '' });
  const [editingPlan, setEditingPlan] = useState(null);
  const [planSearch, setPlanSearch] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken || adminToken !== 'admin-authenticated') {
      navigate('/admin-login');
      return;
    }
  }, []);

  useEffect(() => {
    if (notification) {
      setTimeout(() => setNotification(''), 3000);
    }
  }, [notification]);

  const handlePlanSubmit = (e) => {
    e.preventDefault();
    if (planForm.name && planForm.price) {
      if (editingPlan) {
        setPlans(plans.map(plan => plan._id === editingPlan._id ? { ...plan, ...planForm } : plan));
        setNotification('Plan updated successfully!');
        setEditingPlan(null);
      } else {
        const newPlan = { ...planForm, _id: Date.now().toString() };
        setPlans([...plans, newPlan]);
        setNotification('Plan added successfully!');
      }
      setPlanForm({ name: '', price: '', data: '', validity: '' });
    }
  };

  const deletePlan = (id) => {
    setPlans(plans.filter(plan => plan._id !== id));
    setNotification('Plan deleted successfully!');
  };

  return (
    <div className="min-h-screen transition-all duration-500 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r-2 border-gray-200 shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-black text-gray-800 mb-8">
            Admin Panel
          </h1>
          <nav className="space-y-2">
            <button
              onClick={() => navigate('/admin')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300 text-left text-gray-700 hover:bg-gray-100"
            >
              <ArrowLeft size={20} />
              Back to Admin
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {notification && <div className="mb-4 p-4 bg-green-500 text-white rounded-lg font-bold">{notification}</div>}
        <div className="p-6 rounded-xl bg-white border-2 border-gray-200 shadow-lg">
          <h2 className="text-2xl font-black mb-4 text-gray-800 flex items-center gap-2">
            <Plus size={24} />
            Manage Plans
          </h2>
          {/* Add Plan Form */}
          <form onSubmit={handlePlanSubmit} className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Plan Name" value={planForm.name} onChange={(e) => setPlanForm({...planForm, name: e.target.value})} className="p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800" />
              <input type="number" placeholder="Price" value={planForm.price} onChange={(e) => setPlanForm({...planForm, price: e.target.value})} className="p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800" />
              <input type="text" placeholder="Data" value={planForm.data} onChange={(e) => setPlanForm({...planForm, data: e.target.value})} className="p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800" />
              <input type="text" placeholder="Validity" value={planForm.validity} onChange={(e) => setPlanForm({...planForm, validity: e.target.value})} className="p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800" />
            </div>
            <button type="submit" className="mt-4 px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all duration-300">
              {editingPlan ? 'Update Plan' : 'Add Plan'}
            </button>
            {editingPlan && <button type="button" onClick={() => { setEditingPlan(null); setPlanForm({ name: '', price: '', data: '', validity: '' }); }} className="mt-4 ml-4 px-6 py-2 bg-gray-500 text-white font-bold rounded-lg hover:bg-gray-600 transition-all duration-300">Cancel</button>}
          </form>
          {/* Search */}
          <input type="text" placeholder="Search plans..." value={planSearch} onChange={(e) => setPlanSearch(e.target.value)} className="p-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-800 mb-4 w-full" />
          {/* Plans List */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-bold text-gray-800">Name</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-800">Price</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-800">Data</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-800">Validity</th>
                  <th className="text-left py-3 px-4 font-bold text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.filter(plan => plan.name.toLowerCase().includes(planSearch.toLowerCase())).map(plan => (
                  <tr key={plan._id} className="border-b border-gray-200">
                    <td className="py-3 px-4 text-gray-800">{plan.name}</td>
                    <td className="py-3 px-4 text-gray-800">₹{plan.price}</td>
                    <td className="py-3 px-4 text-gray-800">{plan.data}</td>
                    <td className="py-3 px-4 text-gray-800">{plan.validity}</td>
                    <td className="py-3 px-4 text-gray-800 flex gap-2">
                      <button onClick={() => { setEditingPlan(plan); setPlanForm(plan); }} className="text-blue-500 hover:text-blue-700"><Edit size={16} /></button>
                      <button onClick={() => deletePlan(plan._id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPlan;