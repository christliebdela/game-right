// MOCK DATABASE FOR USER MANAGEMENT

// USER TYPE TO REPRESENT MOCK USER DATA

export type MockUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

// INITIAL SEED DATA FOR MOCK USERS

const initialUsers: MockUser[] = [
  {
    id: 'user-1',
    name: 'Demo User',
    email: 'demo@killshop.com',
    password: 'password123',  
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'user-2',
    name: 'Chris Del',
    email: 'chris@killshop.com',
    password: 'admin123',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// MOCK DATABSE INITIALIZATION

const initMockDb = (): void => {
  if (!localStorage.getItem('mockUsers')) {
    localStorage.setItem('mockUsers', JSON.stringify(initialUsers));
  }
};

// GET ALL USERS

export const getAllUsers = (): MockUser[] => {
  initMockDb();
  return JSON.parse(localStorage.getItem('mockUsers') || '[]');
};

// GET USER BY EMAIL

export const getUserByEmail = (email: string): MockUser | undefined => {
  const users = getAllUsers();
  return users.find(user => user.email === email);
};

// ADD NEW USER

export const addUser = (userData: Omit<MockUser, 'id' | 'createdAt' | 'updatedAt'>): MockUser => {
  const users = getAllUsers();
  
  // CHECK IF EMAIL ALREADY EXISTS

  if (users.some(user => user.email === userData.email)) {
    throw new Error('Email already exists');
  }
  
  const newUser: MockUser = {
    ...userData,
    id: `user-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  localStorage.setItem('mockUsers', JSON.stringify([...users, newUser]));
  return newUser;
};

// AUTHENTICATE USER

export const authenticateUser = (email: string, password: string): MockUser => {
  const user = getUserByEmail(email);
  
  if (!user || user.password !== password) {
    throw new Error('Invalid credentials');
  }
  
  return user;
};

// RESET PASSWORD

export const resetPassword = (email: string): boolean => {
  const users = getAllUsers();
  const userIndex = users.findIndex(user => user.email === email);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  // In a real app, this would send an email with a password reset link
  // For our mock app, we'll just simulate a successful request
  
  // Update the user's updatedAt timestamp to simulate some change
  
  users[userIndex].updatedAt = new Date().toISOString();
  localStorage.setItem('mockUsers', JSON.stringify(users));
  
  return true;
};