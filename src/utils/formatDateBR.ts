import { parseISO } from 'date-fns';
import { format, zonedTimeToUtc } from 'date-fns-tz';

/**
 * @description
 * Retorna uma data formatada em pt-BR dd/mm/yyyy.
 * Exemplo de uso:
 * formatDateBR('2021-10-15T03:00:00.000Z');
 * @param {String} date
 * @return {String} 15/10/2021
 */

const formatDateBR = (date: string): string => {
  if (!date) return '';

  const convertDateToISO = parseISO(date);
  const timezone = zonedTimeToUtc(convertDateToISO, 'America/Sao_Paulo');
  const newDateFormatted = format(timezone, 'dd/MM/yyyy');
  return newDateFormatted;
};

export default formatDateBR;
