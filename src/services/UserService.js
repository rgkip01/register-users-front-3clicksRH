import api from './Api';

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

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data.data; // Retorna os usuários no formato esperado
};

export default createUser;