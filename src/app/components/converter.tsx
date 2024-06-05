import { useEffect, useState } from "react";
import { fetchCurrencies, fetchRates } from "@/app/api/hello/conversionRate";
import InputContainer from "@/app/components/input/InputContainer";

export interface IConversion {
  baseAmount: number;
  baseCurrency: string;
  targetAmount: number;
  targetCurrency: string;
}

export interface IConverterProps {
  selectMenu: string
}


export const Converter: React.FC<IConverterProps> = ({ selectMenu }) => {
  const [currencyList, setCurrencyList] = useState<string[]>([])
  const [clickBaseCurrencyMenu, setClickBaseCurrencyMenu] = useState<boolean>(false)
  const [clickTargetCurrencyMenu, setClickTargetCurrencyMenu] = useState<boolean>(false)
  const [conversionRate, setConversionRate] = useState<number>(0)
  const [timeUpdated, setTimeUpdated] = useState<any>("")
  const [conversion, setConversion] = useState<IConversion>({
    baseAmount: 10.00,
    baseCurrency: "GBP",
    targetAmount: 12.00,
    targetCurrency: "EUR"
  })
  const [errMsg, setErrMsg] = useState<string | null>(null)

  useEffect(() => {

    const fetchCurrencyList = async () => {
      try {
        const currencies = await fetchCurrencies();
        const filteredCurrencies = currencies.filter((currency: string) => !["MOP", "SLE", "XAF", "XCD", "XDR", "XPF", "MOP"].includes(currency[0]));

        setTimeout(() => {
          setCurrencyList(filteredCurrencies)
        }, 5000);

      } catch (error) {
        console.error('Error fetching currencies:', error);
        throw error;
      }
    };

    const fetchConversionRates = async () => {
      try {
        const data = await fetchRates(conversion.baseCurrency, conversion.targetCurrency);

        const rate = data.conversion_rate
        setConversionRate(rate)

        const timeUpdated = data.time_last_update_utc
        const date = new Date(timeUpdated)
        const formattedDate = date.toLocaleDateString()
        const formattedTime = date.toLocaleTimeString();
        const formattedTimeUpdated = formattedDate + " " + formattedTime + " UTC"
        setTimeUpdated(formattedTimeUpdated)

        const convertedAmount = +(conversion.baseAmount * rate).toFixed(2)
        setConversion(prevConversion => ({
          ...prevConversion,
          targetAmount: convertedAmount
        }));
      } catch (error) {
        console.error('Error fetching conversion rate:', error);
        setErrMsg("Don't get paid enough to afford the paid version.\nPlease try again another day :(")
        throw error;
      }
    };
    fetchCurrencyList()
    fetchConversionRates()
  }, [conversion.baseCurrency, conversion.targetCurrency]);



  return (
    <InputContainer selectMenu={selectMenu} errMsg={errMsg} currencyList={currencyList} conversionRate={conversionRate} conversion={conversion} clickBaseCurrencyMenu={clickBaseCurrencyMenu} clickTargetCurrencyMenu={clickTargetCurrencyMenu} setConversion={setConversion} setClickTargetCurrencyMenu={setClickTargetCurrencyMenu} timeUpdated={timeUpdated} setClickBaseCurrencyMenu={setClickBaseCurrencyMenu} />
  );
}
