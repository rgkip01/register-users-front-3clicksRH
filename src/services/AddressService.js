import api from './Api';

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


export default createAddress;