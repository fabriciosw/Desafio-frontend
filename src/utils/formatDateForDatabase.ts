/**
 * @description
 * Retorna uma data formatada em mm/dd/yyyy.
 * Exemplo de uso:
 * formatDateForDatabase('30/12/2000');
 * @param {String} date
 * @return {String} 12/30/2000
 */

const formatDateForDatabase = (date: string): string => {
  if (!date) return '';

  const [day, month, year] = date.split('/');
  const newDateFormatted = `${month}/${day}/${year}`;
  return newDateFormatted;
};

export default formatDateForDatabase;
