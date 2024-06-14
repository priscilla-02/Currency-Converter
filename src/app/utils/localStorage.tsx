export interface IConversionHistory {
  base: number;
  from: string;
  target: number;
  to: string;
  rate: number;
  time?: string
}

export const saveToConversionHistory = (conversionEntry: IConversionHistory): void => {
  const currentHistory = getConversionHistory() || [];
  currentHistory.push(conversionEntry);
  localStorage.setItem('conversion_history', JSON.stringify(currentHistory));
};

export const getConversionHistory = (): IConversionHistory[] | null => {
  const storedConversion = localStorage.getItem('conversion_history');
  if (storedConversion) {
    return JSON.parse(storedConversion);
  }
  return null;
};