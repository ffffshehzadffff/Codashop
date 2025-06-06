import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Clock, User, Settings, CreditCard } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const Dashboard: React.FC = () => {
  const { user, orders } = useUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Please log in to view your dashboard</h2>
          <Link
            to="/login"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  const recentOrders = orders.slice(0, 3);
  const totalSpent = orders.reduce((sum, order) => sum + order.price, 0);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}!</h1>
          <p className="text-gray-400">Manage your gaming purchases and account settings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Orders</p>
                <p className="text-2xl font-bold text-white">{orders.length}</p>
              </div>
              <ShoppingBag className="w-8 h-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Spent</p>
                <p className="text-2xl font-bold text-white">${totalSpent.toFixed(2)}</p>
              </div>
              <CreditCard className="w-8 h-8 text-green-400" />
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Member Since</p>
                <p className="text-2xl font-bold text-white">2024</p>
              </div>
              <Star className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Orders */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
                <Link
                  to="/orders"
                  className="text-purple-400 hover:text-purple-300 text-sm"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">UC</span>
                        </div>
                        <div>
                          <h3 className="text-white font-medium">{order.product}</h3>
                          <p className="text-gray-400 text-sm">{order.game}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-semibold">${order.price}</p>
                        <p className="text-gray-400 text-sm">{order.date}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">No orders yet</p>
                    <Link
                      to="/pubg-mobile"
                      className="text-purple-400 hover:text-purple-300 text-sm"
                    >
                      Make your first purchase
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link
                  to="/pubg-mobile"
                  className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all transform hover:scale-105"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">UC</span>
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Buy PUBG Mobile UC</h3>
                    <p className="text-white/80 text-sm">Instant delivery</p>
                  </div>
                </Link>
                <Link
                  to="/orders"
                  className="flex items-center space-x-3 p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <Clock className="w-10 h-10 text-purple-400" />
                  <div>
                    <h3 className="text-white font-medium">Order History</h3>
                    <p className="text-gray-400 text-sm">View all purchases</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-white font-semibold">{user.name}</h3>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>
              <div className="space-y-3">
                <button className="flex items-center space-x-3 w-full text-left text-gray-300 hover:text-white transition-colors">
                  <User className="w-4 h-4" />
                  <span className="text-sm">Edit Profile</span>
                </button>
                <button className="flex items-center space-x-3 w-full text-left text-gray-300 hover:text-white transition-colors">
                  <Settings className="w-4 h-4" />
                  <span className="text-sm">Account Settings</span>
                </button>
              </div>
            </div>

            {/* Popular Games */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-white font-semibold mb-4">Popular Games</h3>
              <div className="space-y-3">
                <Link
                  to="/pubg-mobile"
                  className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">P</span>
                  </div>
                  <span className="text-white text-sm">PUBG Mobile</span>
                </Link>
                <div className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xs">F</span>
                  </div>
                  <span className="text-gray-400 text-sm">Free Fire (Coming Soon)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;