import api from './Api';

export const searchUsers = async (query) => {
  try {
    const response = await api.get(`/users/search`, {
      params: { q: query },
    });
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data;

  } catch (error) {
    console.error('Erro ao buscar o usuário:', error);
    throw error;
  }
};

export const updateUser = async (userId, payload) => {
  try {
    const response = await api.put(`/users/${userId}`, payload);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
    throw error;
  }
};

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

export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao remove o usuário:', error);
    throw error;
  }
}

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data.data; // Retorna os usuários no formato esperado
};
