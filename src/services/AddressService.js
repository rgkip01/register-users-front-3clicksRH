import api from './Api';

export const getAddressesByUserId = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/addresses`);
    return response.data.data;
  } catch (error) {
    console.error('Erro ao buscar endereços do usuário:', error);
    throw error;
  }
};

export const createAddress = async (userId, addressData) => {
  const payload = {
    data: {
      type: 'addresses',
      attributes: {
        street: addressData.street,
        city: addressData.city,
        state: addressData.state,
        zip_code: addressData.zipCode,
        country: addressData.country,
        complement: addressData.complement || null,
        user_id: userId, // Associando o endereço ao usuário
      },
    },
  };

  const response = await api.post(`/users/${userId}/addresses`, payload);
  return response.data.data;
};

export const updateAddress = async (userId, addressId, payload) => {
  try {
    const response = await api.put(`/users/${userId}/addresses/${addressId}`, payload);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar o endereço:', error);
    throw error;
  }
};


export const deleteAddress = async (userId, addressId) => {
  try {
    await api.delete(`/users/${userId}/addresses/${addressId}`);
  } catch (error) {
    console.error('Erro ao deletar o endereço:', error);
    throw error;
  }
};
