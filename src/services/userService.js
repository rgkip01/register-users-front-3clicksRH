import api from './api';

export const createUser = async (userData) => {
  const payload = {
    data: {
      type: 'users',
      attributes: {
        name: userData.name,
        email: userData.email,
        document: userData.document,
        date_of_birth: userData.dateOfBirth
      },
    },
  };

  const response = await api.post('/users', payload)
  return response.data.data
}