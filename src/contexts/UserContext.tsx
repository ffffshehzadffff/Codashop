import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface Order {
  id: string;
  game: string;
  product: string;
  amount: number;
  price: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  playerId: string;
}

interface UserContextType {
  user: User | null;
  orders: Order[];
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      game: 'PUBG Mobile',
      product: '600 UC',
      amount: 600,
      price: 9.99,
      date: '2024-01-15',
      status: 'completed',
      playerId: '123456789'
    },
    {
      id: '2',
      game: 'PUBG Mobile',
      product: '1800 UC',
      amount: 1800,
      price: 29.99,
      date: '2024-01-10',
      status: 'completed',
      playerId: '123456789'
    }
  ]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      setUser({
        id: '1',
        email,
        name: email.split('@')[0],
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`
      });
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (name && email && password) {
      setUser({
        id: '1',
        email,
        name,
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face`
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>) => {
    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      status: 'completed'
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  return (
    <UserContext.Provider value={{ user, orders, login, register, logout, addOrder }}>
      {children}
    </UserContext.Provider>
  );
};