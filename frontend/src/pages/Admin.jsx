import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import axios from '../api/axios';
import { BarChart3, Plus, Edit, Trash2, User, Settings, Network, Gift, FileText, Users } from 'lucide-react';

function Admin() {
  const { theme, colors } = useTheme();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [recharges, setRecharges] = useState([]);
  const [plans, setPlans] = useState([]);
  const [offers, setOffers] = useState([]);
  const [networks, setNetworks] = useState([]);
  const [adminProfile, setAdminProfile] = useState({ name: 'Admin', email: 'admin@example.com' });
  const [offerForm, setOfferForm] = useState({ title: '', description: '', discount: '', simType: 'Prepaid' });
  const [networkForm, setNetworkForm] = useState({ name: '', country: '' });
  const [editingOffer, setEditingOffer] = useState(null);
  const [editingNetwork, setEditingNetwork] = useState(null);
  const [offerSearch, setOfferSearch] = useState('');
  const [offerFilter, setOfferFilter] = useState('All');
  const [networkSearch, setNetworkSearch] = useState('');
  const [notification, setNotification] = useState('');
  const [planForm, setPlanForm] = useState({ name: '', price: '', data: '', validity: '', category: 'prepaid' });
  const [editingPlan, setEditingPlan] = useState(null);
  const [planSearch, setPlanSearch] = useState('');
  const chartData = [
    { month: 'Jan', revenue: 1200 },
    { month: 'Feb', revenue: 1500 },
    { month: 'Mar', revenue: 1800 },
    { month: 'Apr', revenue: 2200 },
    { month: 'May', revenue: 2500 },
    { month: 'Jun', revenue: 2800 }
  ];
  const maxRevenue = Math.max(...chartData.map(d => d.revenue));
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRecharges: 0,
    totalRevenue: 0,
    totalPlans: 0,
    totalOffers: 0,
    totalNetworks: 0
  });

  useEffect(() => {
    fetchUsers();
    fetchRecharges();
    fetchPlans();
    fetchOffers();
    fetchNetworks();
  }, []);

  useEffect(() => {
    setStats(prev => ({ ...prev, totalPlans: plans.length, totalOffers: offers.length, totalNetworks: networks.length }));
  }, [plans, offers, networks]);

  useEffect(() => {
    if (notification) {
      setTimeout(() => setNotification(''), 3000);
    }
  }, [notification]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchUsers();
      fetchRecharges();
      fetchPlans();
      fetchOffers();
      fetchNetworks();
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      const userData = response.data.users || [];
      setUsers(userData);
      setStats(prev => ({ ...prev, totalUsers: userData.length }));
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  const fetchRecharges = async () => {
    // TODO: Implement recharges API
    setRecharges([]);
    setStats(prev => ({ ...prev, totalRecharges: 0, totalRevenue: 0 }));
  };

  const fetchPlans = async () => {
    try {
      const response = await axios.get('/api/plans');
      const planData = response.data.plans || [];
      setPlans(planData);
    } catch (error) {
      console.error('Error fetching plans:', error);
      setPlans([]);
    }
  };

  const fetchOffers = async () => {
    try {
      const response = await axios.get('/api/offers');
      const offerData = response.data.offers || [];
      setOffers(offerData);
    } catch (error) {
      console.error('Error fetching offers:', error);
      setOffers([]);
    }
  };

  const fetchNetworks = async () => {
    try {
      const response = await axios.get('/api/networks');
      const networkData = response.data.networks || [];
      setNetworks(networkData);
    } catch (error) {
      console.error('Error fetching networks:', error);
      setNetworks([]);
    }
  };


  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    if (offerForm.title && offerForm.discount) {
      try {
        if (editingOffer) {
          await axios.put(`/api/offers/${editingOffer._id}`, offerForm);
          setNotification('Offer updated successfully!');
          setEditingOffer(null);
        } else {
          await axios.post('/api/offers', offerForm);
          setNotification('Offer added successfully!');
        }
        setOfferForm({ title: '', description: '', discount: '', simType: 'Prepaid' });
        fetchOffers();
      } catch (error) {
        setNotification('Error: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleNetworkSubmit = async (e) => {
    e.preventDefault();
    if (networkForm.name && networkForm.country) {
      try {
        if (editingNetwork) {
          await axios.put(`/api/networks/${editingNetwork._id}`, networkForm);
          setNotification('Network updated successfully!');
          setEditingNetwork(null);
        } else {
          await axios.post('/api/networks', networkForm);
          setNotification('Network added successfully!');
        }
        setNetworkForm({ name: '', country: '' });
        fetchNetworks();
      } catch (error) {
        setNotification('Error: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/admin/profile', adminProfile);
      setNotification('Profile updated successfully!');
    } catch (error) {
      setNotification('Error: ' + (error.response?.data?.message || error.message));
    }
  };


  const deleteOffer = async (id) => {
    try {
      await axios.delete(`/api/offers/${id}`);
      setNotification('Offer deleted successfully!');
      fetchOffers();
    } catch (error) {
      setNotification('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  const deleteNetwork = async (id) => {
    try {
      await axios.delete(`/api/networks/${id}`);
      setNotification('Network deleted successfully!');
      fetchNetworks();
    } catch (error) {
      setNotification('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setNotification('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      setNotification('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  const handlePlanSubmit = async (e) => {
    e.preventDefault();
    if (planForm.name && planForm.price) {
      try {
        if (editingPlan) {
          await axios.put(`/api/plans/${editingPlan._id}`, planForm);
          setNotification('Plan updated successfully!');
          setEditingPlan(null);
        } else {
          await axios.post('/api/plans', planForm);
          setNotification('Plan added successfully!');
        }
        setPlanForm({ name: '', price: '', data: '', validity: '', category: 'prepaid' });
        fetchPlans();
      } catch (error) {
        setNotification('Error: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const deletePlan = async (id) => {
    try {
      await axios.delete(`/api/plans/${id}`);
      setNotification('Plan deleted successfully!');
      fetchPlans();
    } catch (error) {
      setNotification('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'manage-plans', label: 'Manage Plans', icon: Plus },
    { id: 'manage-users', label: 'Manage Users', icon: Users },
    { id: 'admin-profile', label: 'Admin Profile', icon: Settings }
  ];

  return (
    <div className="min-h-screen transition-all duration-500 flex">
      {/* Sidebar */}
      <div className={`w-64 ${colors.cardBg} border-r-2 ${colors.border} shadow-lg`}>
        <div className="p-6">
          <h1 className={`text-2xl font-black ${colors.text} mb-8`}>
            Admin Panel
          </h1>
          <nav className="space-y-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all duration-300 text-left ${
                    currentTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100'
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
          <button
            onClick={() => {
              localStorage.removeItem('adminToken');
              navigate('/');
            }}
            className="w-full mt-8 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-300 shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {notification && <div className="mb-4 p-4 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg font-bold">{notification}</div>}
        {currentTab === 'dashboard' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
              <div className={`p-6 rounded-xl ${colors.cardBg} border-2 ${colors.border} shadow-lg`}>
                <h3 className={`text-lg font-bold ${colors.text} mb-2 flex items-center gap-2`}>
                  <Users size={20} />
                  Total Users
                </h3>
                <p className="text-3xl font-black text-blue-500">{stats.totalUsers}</p>
              </div>
              <div className={`p-6 rounded-xl ${colors.cardBg} border-2 ${colors.border} shadow-lg`}>
                <h3 className={`text-lg font-bold ${colors.text} mb-2 flex items-center gap-2`}>
                  <BarChart3 size={20} />
                  Total Recharges
                </h3>
                <p className="text-3xl font-black text-green-500">{stats.totalRecharges}</p>
              </div>
              <div className={`p-6 rounded-xl ${colors.cardBg} border-2 ${colors.border} shadow-lg`}>
                <h3 className={`text-lg font-bold ${colors.text} mb-2 flex items-center gap-2`}>
                  <FileText size={20} />
                  Total Revenue
                </h3>
                <p className="text-3xl font-black text-purple-500">₹{stats.totalRevenue}</p>
              </div>
              <div className={`p-6 rounded-xl ${colors.cardBg} border-2 ${colors.border} shadow-lg`}>
                <h3 className={`text-lg font-bold ${colors.text} mb-2 flex items-center gap-2`}>
                  <Plus size={20} />
                  Total Plans
                </h3>
                <p className="text-3xl font-black text-orange-500">{stats.totalPlans}</p>
              </div>
              <div className={`p-6 rounded-xl ${colors.cardBg} border-2 ${colors.border} shadow-lg`}>
                <h3 className={`text-lg font-bold ${colors.text} mb-2 flex items-center gap-2`}>
                  <Gift size={20} />
                  Total Offers
                </h3>
                <p className="text-3xl font-black text-pink-500">{stats.totalOffers}</p>
              </div>
              <div className={`p-6 rounded-xl ${colors.cardBg} border-2 ${colors.border} shadow-lg`}>
                <h3 className={`text-lg font-bold ${colors.text} mb-2 flex items-center gap-2`}>
                  <Network size={20} />
                  Total Networks
                </h3>
                <p className="text-3xl font-black text-indigo-500">{stats.totalNetworks}</p>
              </div>
            </div>

            {/* Analytics */}
            <div className="mt-8">
              <h2 className={`text-2xl font-black mb-4 ${colors.text} flex items-center gap-2`}>
                <BarChart3 size={24} />
                Analytics
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-xl ${colors.cardBg} border-2 ${colors.border} shadow-lg`}>
                  <h3 className={`text-lg font-bold mb-4 ${colors.text}`}>Monthly Revenue</h3>
                  <div className="space-y-3">
                    {chartData.map(item => (
                      <div key={item.month} className="flex items-center gap-4">
                        <span className={`w-12 font-bold ${colors.text}`}>{item.month}</span>
                        <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                          <div className="bg-gradient-to-r from-green-400 to-blue-500 h-6 rounded-full transition-all duration-500" style={{width: `${(item.revenue / maxRevenue) * 100}%`}}></div>
                        </div>
                        <span className={`font-bold ${colors.text}`}>₹{item.revenue}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={`p-6 rounded-xl ${colors.cardBg} border-2 ${colors.border} shadow-lg`}>
                  <h3 className={`text-lg font-bold mb-4 ${colors.text}`}>User Growth</h3>
                  <div className="space-y-3">
                    {chartData.map((item, index) => {
                      const users = stats.totalUsers * (index + 1) / chartData.length;
                      return (
                        <div key={item.month} className="flex items-center gap-4">
                          <span className={`w-12 font-bold ${colors.text}`}>{item.month}</span>
                          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6">
                            <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-6 rounded-full transition-all duration-500" style={{width: `${(users / stats.totalUsers) * 100}%`}}></div>
                          </div>
                          <span className={`font-bold ${colors.text}`}>{Math.round(users)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className={`mb-8 p-6 rounded-xl ${colors.cardBg} border-2 ${colors.border} shadow-lg`}>
              <h2 className={`text-2xl font-black mb-4 ${colors.text} flex items-center gap-2`}>
                <Users size={24} />
                Users
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b-2 ${colors.border}`}>
                      <th className={`text-left py-3 px-4 font-bold ${colors.text}`}>ID</th>
                      <th className={`text-left py-3 px-4 font-bold ${colors.text}`}>Username</th>
                      <th className={`text-left py-3 px-4 font-bold ${colors.text}`}>Email</th>
                      <th className={`text-left py-3 px-4 font-bold ${colors.text}`}>Join Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className={`border-b ${colors.border}`}>
                        <td className={`py-3 px-4 ${colors.text}`}>{user.id}</td>
                        <td className={`py-3 px-4 ${colors.text}`}>{user.username}</td>
                        <td className={`py-3 px-4 ${colors.text}`}>{user.email}</td>
                        <td className={`py-3 px-4 ${colors.text}`}>{user.joinDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recharges Table */}
            <div className={`p-6 rounded-xl ${colors.cardBg} border-2 ${colors.border} shadow-lg`}>
              <h2 className={`text-2xl font-black mb-4 ${colors.text} flex items-center gap-2`}>
                <BarChart3 size={24} />
                Recent Recharges
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b-2 ${colors.border}`}>
                      <th className={`text-left py-3 px-4 font-bold ${colors.text}`}>ID</th>
                      <th className={`text-left py-3 px-4 font-bold ${colors.text}`}>User</th>
                      <th className={`text-left py-3 px-4 font-bold ${colors.text}`}>Amount</th>
                      <th className={`text-left py-3 px-4 font-bold ${colors.text}`}>Operator</th>
                      <th className={`text-left py-3 px-4 font-bold ${colors.text}`}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recharges.map(recharge => (
                      <tr key={recharge.id} className={`border-b ${colors.border}`}>
                        <td className={`py-3 px-4 ${colors.text}`}>{recharge.id}</td>
                        <td className={`py-3 px-4 ${colors.text}`}>{recharge.user}</td>
                        <td className={`py-3 px-4 ${colors.text}`}>₹{recharge.amount}</td>
                        <td className={`py-3 px-4 ${colors.text}`}>{recharge.operator}</td>
                        <td className={`py-3 px-4 ${colors.text}`}>{recharge.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {currentTab === 'manage-plans' && (
          <div className={`p-6 rounded-xl ${colors.cardBg} border-2 ${colors.border} shadow-lg`}>
            <h2 className={`text-2xl font-black mb-4 ${colors.text} flex items-center gap-2`}>
              <Plus size={24} />
              Manage Plans
            </h2>
            {/* Add Plan Form */}
            <form onSubmit={handlePlanSubmit} className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Plan Name" value={planForm.name} onChange={(e) => setPlanForm({...planForm, name: e.target.value})} className={`p-3 rounded-lg ${colors.cardBg} ${colors.border} ${colors.text}`} />
                <input type="number" placeholder="Price" value={planForm.price} onChange={(e) => setPlanForm({...planForm, price: e.target.value})} className={`p-3 rounded-lg ${colors.cardBg} ${colors.border} ${colors.text}`} />
                <input type="text" placeholder="Data" value={planForm.data} onChange={(e) => setPlanForm({...planForm, data: e.target.value})} className={`p-3 rounded-lg ${colors.cardBg} ${colors.border} ${colors.text}`} />
                <input type="text" placeholder="Validity" value={planForm.validity} onChange={(e) => setPlanForm({...planForm, validity: e.target.value})} className={`p-3 rounded-lg ${colors.cardBg} ${colors.border} ${colors.text}`} />
                <select value={planForm.category} onChange={(e) => setPlanForm({...planForm, category: e.target.value})} className={`p-3 rounded-lg ${colors.cardBg} ${colors.border} ${colors.text}`}>
                  <option value="prepaid">Prepaid</option>
                  <option value="postpaid">Postpaid</option>
                  <option value="topup">Top Up</option>
                  <option value="data">Data Plans</option>
                </select>
              </div>
              <button type="submit" className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                {editingPlan ? 'Update Plan' : 'Add Plan'}
              </button>
              {editingPlan && <button type="button" onClick={() => { setEditingPlan(null); setPlanForm({ name: '', price: '', data: '', validity: '', category: 'prepaid' }); }} className="mt-4 ml-4 px-6 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300">Cancel</button>}
            </form>
            {/* Search */}
            <input type="text" placeholder="Search plans..." value={planSearch} onChange={(e) => setPlanSearch(e.target.value)} className={`p-3 rounded-lg ${colors.cardBg} ${colors.border} ${colors.text} mb-4 w-full`} />
            {/* Plans List */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b-2 ${colors.border}`}>
                    <th className={`text-left py-3 px-4 font-bold ${colors.text}`}>Name</th>
                    <th className={`text-left py-3 px-4 font-bold ${colors.text}`}>Price</th>
                    <th className={`text-left py-3 px-4 font-bold ${colors.text}`}>Data</th>
                    <th className={`text-left py-3 px-4 font-bold ${colors.text}`}>Validity</th>
                    <th className={`text-left py-3 px-4 font-bold ${colors.text}`}>Category</th>
                    <th className={`text-left py-3 px-4 font-bold ${colors.text}`}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.filter(plan => plan.name.toLowerCase().includes(planSearch.toLowerCase())).map(plan => (
                    <tr key={plan._id} className={`border-b ${colors.border}`}>
                      <td className={`py-3 px-4 ${colors.text}`}>{plan.name}</td>
                      <td className={`py-3 px-4 ${colors.text}`}>₹{plan.price}</td>
                      <td className={`py-3 px-4 ${colors.text}`}>{plan.data}</td>
                      <td className={`py-3 px-4 ${colors.text}`}>{plan.validity}</td>
                      <td className={`py-3 px-4 ${colors.text}`}>{plan.category}</td>
                      <td className={`py-3 px-4 ${colors.text} flex gap-2`}>
                        <button onClick={() => { setEditingPlan(plan); setPlanForm(plan); }} className="text-blue-500 hover:text-blue-700"><Edit size={16} /></button>
                        <button onClick={() => deletePlan(plan._id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}





        {currentTab === 'manage-users' && (
          <div className={`p-6 rounded-xl ${colors.cardBg} border-2 ${colors.border} shadow-lg`}>
            <h2 className={`text-2xl font-black mb-4 ${colors.text} flex items-center gap-2`}>
              <Users size={24} />
              Manage Users
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className={`border-b-2 ${colors.border}`}>
                    <th className={`text-left py-3 px-4 font-bold ${colors.text}`}>ID</th>
                    <th className={`text-left py-3 px-4 font-bold ${colors.text}`}>Username</th>
                    <th className={`text-left py-3 px-4 font-bold ${colors.text}`}>Email</th>
                    <th className={`text-left py-3 px-4 font-bold ${colors.text}`}>Join Date</th>
                    <th className={`text-left py-3 px-4 font-bold ${colors.text}`}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id} className={`border-b ${colors.border}`}>
                      <td className={`py-3 px-4 ${colors.text}`}>{user._id}</td>
                      <td className={`py-3 px-4 ${colors.text}`}>{user.username}</td>
                      <td className={`py-3 px-4 ${colors.text}`}>{user.email}</td>
                      <td className={`py-3 px-4 ${colors.text}`}>{user.createdAt}</td>
                      <td className={`py-3 px-4 ${colors.text} flex gap-2`}>
                        <button onClick={() => {/* edit user logic */}} className="text-blue-500 hover:text-blue-700"><Edit size={16} /></button>
                        <button onClick={() => deleteUser(user._id)} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {currentTab === 'admin-profile' && (
          <div className={`p-6 rounded-xl ${colors.cardBg} border-2 ${colors.border} shadow-lg`}>
            <h2 className={`text-2xl font-black mb-4 ${colors.text} flex items-center gap-2`}>
              <Settings size={24} />
              Admin Profile
            </h2>
            <form onSubmit={(e) => { e.preventDefault(); /* update profile logic */ }} className="max-w-md">
              <div className="mb-4">
                <label className={`block text-sm font-bold mb-2 ${colors.text}`}>Name</label>
                <input type="text" value={adminProfile.name} onChange={(e) => setAdminProfile({...adminProfile, name: e.target.value})} className={`w-full p-3 rounded-lg ${colors.cardBg} ${colors.border} ${colors.text}`} />
              </div>
              <div className="mb-4">
                <label className={`block text-sm font-bold mb-2 ${colors.text}`}>Email</label>
                <input type="email" value={adminProfile.email} onChange={(e) => setAdminProfile({...adminProfile, email: e.target.value})} className={`w-full p-3 rounded-lg ${colors.cardBg} ${colors.border} ${colors.text}`} />
              </div>
              <button type="submit" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                Update Profile
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;