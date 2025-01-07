export const formatDocument = (document) => {
  if (!document) return '';
  
  // Remove quaisquer caracteres não numéricos
  const cleanDocument = document.replace(/\D/g, '');

  // Aplica a formatação somente se o Document tiver 11 dígitos
  if (cleanDocument.length === 11) {
    return cleanDocument.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  return document; // Retorna o CPF sem formatação se não tiver 11 dígitos
};
