import { useEffect, useState } from "react";
import { fetchCrypto } from "@/app/api/hello/conversionRate";

import { IConversion, IConverterProps } from "@/app/components/converter";
import InputContainer from "@/app/components/input/InputContainer";

export interface ICurrency {
  id: string,
  symbol: string,
  name: string,
  image: string,
  current_price: number
}

export const CryptoConverter: React.FC<IConverterProps> = ({ selectMenu }) => {
  const [currencyList, setCurrencyList] = useState<ICurrency[]>([])
  const [clickBaseCurrencyMenu, setClickBaseCurrencyMenu] = useState<boolean>(false)
  const [clickTargetCurrencyMenu, setClickTargetCurrencyMenu] = useState<boolean>(false)
  const [conversionRate, setConversionRate] = useState<number>(0)
  const [conversion, setConversion] = useState<IConversion>({
    baseAmount: 10.00,
    baseCurrency: "GBP",
    targetAmount: 12.00,
    targetCurrency: "BTC"
  })
  const [errMsg, setErrMsg] = useState<string | null>(null)


  useEffect(() => {

    const fetchCryptoList = async () => {
      try {
        const cryptoData = await fetchCrypto(conversion.baseCurrency);

        const filteredCrypto = cryptoData.map(({ id, symbol, name, image, current_price }: ICurrency) => ({ id, symbol, name, image, current_price }))
        setCurrencyList(filteredCrypto)

        const currencyPrice = filteredCrypto.find((currency: any) => currency.symbol === conversion.targetCurrency.toLowerCase())
        if (currencyPrice) {
          const conversionRate = currencyPrice.current_price
          setConversionRate(conversionRate)

          const convertedAmount = (conversion.baseAmount * conversionRate)
          setConversion(prevConversion => ({
            ...prevConversion,
            targetAmount: convertedAmount
          }));
        }
      } catch (error) {
        console.error('Error fetching currencies:', error);
        setErrMsg("Don't get paid enough to afford the paid version.\nPlease try again another day :(")
        throw error;
      }
    };

    fetchCryptoList()
  }, [conversion.baseCurrency, conversion.targetCurrency]);

  return (
    <InputContainer selectMenu={selectMenu} errMsg={errMsg} currencyList={currencyList} conversionRate={conversionRate} conversion={conversion} clickBaseCurrencyMenu={clickBaseCurrencyMenu} clickTargetCurrencyMenu={clickTargetCurrencyMenu} setConversion={setConversion} setClickTargetCurrencyMenu={setClickTargetCurrencyMenu} setClickBaseCurrencyMenu={setClickBaseCurrencyMenu} />
  );
}
