import { v4 as uuidv4 } from 'uuid';

export interface IConversionHistory {
  uuid?: string | undefined;
  base: number;
  from: string;
  target: number;
  to: string;
  rate: number;
  time: string
}

export const saveToConversionHistory = (conversionEntry: IConversionHistory): void => {
  const currentHistory = getConversionHistory() || [];
  const entryWithId = { ...conversionEntry, uuid: uuidv4() };
  console.log("entryWithId", entryWithId.uuid)
  currentHistory.push(entryWithId);
  localStorage.setItem('conversion_history', JSON.stringify(currentHistory));
};

export const getConversionHistory = (): IConversionHistory[] | null => {
  const storedConversion = localStorage.getItem('conversion_history');
  if (storedConversion) {
    return JSON.parse(storedConversion);
  }
  return null;
};


export const deleteConversionHistory = (uuid: string): void => {
  let currentHistory = getConversionHistory();
  if (currentHistory) {
    currentHistory = currentHistory.filter(entry => entry.uuid !== uuid);
    localStorage.setItem('conversion_history', JSON.stringify(currentHistory));
  }
}