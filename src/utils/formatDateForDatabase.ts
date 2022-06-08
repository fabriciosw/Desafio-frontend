/**
 * @description
 * Retorna uma data formatada em pt-BR dd/mm/yyyy.
 * Exemplo de uso:
 * formatDate('2021-10-15T03:00:00.000Z');
 * @param {String} date
 * @return {String} 15/10/2021
 */

const formatDateForDatabase = (date: string): string => {
  if (!date) return '';

  const [day, month, year] = date.split('/');
  const newDateFormatted = `${month}/${day}/${year}`;
  return newDateFormatted;
};

export default formatDateForDatabase;
