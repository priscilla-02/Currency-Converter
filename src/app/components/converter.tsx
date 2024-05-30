import { useEffect, useState } from "react";
import { fetchCurrencies, fetchRates } from "@/app/api/hello/conversionRate";
import InputContainer from "@/components/input/InputContainer";
import errorMap from "zod/lib/locales/en";


export interface IConversion {
  baseAmount: number;
  baseCurrency: string;
  targetAmount: number;
  targetCurrency: string;
}


export default function Converter() {
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

        setCurrencyList(filteredCurrencies)

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

        const convertedAmount = conversion.baseAmount * rate
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
    <InputContainer errMsg={errMsg} currencyList={currencyList} conversionRate={conversionRate} conversion={conversion} clickBaseCurrencyMenu={clickBaseCurrencyMenu} clickTargetCurrencyMenu={clickTargetCurrencyMenu} setConversion={setConversion} setClickTargetCurrencyMenu={setClickTargetCurrencyMenu} timeUpdated={timeUpdated} setClickBaseCurrencyMenu={setClickBaseCurrencyMenu} />
    // <InputContainer currencyList={currencyList} conversionRate={conversionRate} conversion={conversion} clickBaseCurrencyMenu={clickBaseCurrencyMenu} clickTargetCurrencyMenu={clickTargetCurrencyMenu} setConversion={setConversion} setClickBaseCurrencyMenu-={setClickBaseCurrencyMenu} setClickTargetCurrencyMenu={setClickTargetCurrencyMenu} timeUpdated={timeUpdated} />
    // <section className="px-8 pt-6 pb-8 mb-4 ">
    //   {(currencyList.length > 0 && conversionRate !== 0) ? (
    //     <div>
    //       <div className="flex lg:flex-row flex-col justify-center items-center">


    //         <div className="mb-4 flex flex-col justify-center items-start">
    //           <label className="block text-gray-700 text-sm font-bold mb-2">
    //             Amount
    //           </label>


    //           <div className="flex max-w-[500px]">
    //             <input className="shadow-2xl appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder={conversion.baseAmount.toString()} onBlur={handleAmountBlur} />

    //             <div className="relative inline-block text-left w-full">


    //               <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300 min-h-[50px]" id="menu-button" onClick={() => setClickBaseCurrencyMenu(prev => !prev)}>
    //                 <div className="flex justify-center items-center">
    //                   <img src={currenciesFlags.find(currenciesFlags => currenciesFlags.code === conversion.baseCurrency)?.flag} className="mr-2 w-[32px] h-[32]" />
    //                   {conversion.baseCurrency}
    //                   <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    //                     <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
    //                   </svg>
    //                 </div>
    //               </button>

    //               {clickBaseCurrencyMenu && (
    //                 <div className="w-full absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto max-h-60" role="menu" aria-orientation="vertical">
    //                   <div className="py-1" role="none">
    //                     {currencyList.map(currency => (
    //                       <div className="flex justify-center cursor-pointer hover:bg-gray-300">
    //                         <img src={currenciesFlags.find(currenciesFlags => currenciesFlags.code === currency[0])?.flag} className="w-[32px] h-[32]" />
    //                         <div key={currency[0]} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => handleCurrencySelect(currency[0], true)}>
    //                           {currency[0]}
    //                         </div>
    //                       </div>
    //                     ))}
    //                   </div>
    //                 </div>
    //               )}
    //             </div>

    //           </div>

    //         </div>

    //         {/* <InputContainer label={"Test"} placeholder={conversion.baseAmount} onBlur={handleAmountBlur} ></InputContainer> */}

    //         <div className="flex justify-center">
    //           <ArrowUpDown className="w-[50px] mx-2 lg:hidden flex" />
    //           <ArrowRightLeft className="w-[50px] mx-5 hidden lg:flex" />
    //         </div>



    //         <div className="mb-4 flex flex-col justify-center items-start">
    //           <label className="block text-gray-700 text-sm font-bold mb-2">
    //             Converted To
    //           </label>


    //           <div className="flex max-w-[500px]">

    //             <input className="shadow-2xl appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder={conversion.targetAmount.toFixed(2).toString()} disabled />

    //             <div className="relative inline-block text-left w-full ">


    //               <button type="button" className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300 h-[50px]" id="menu-button" onClick={() => setClickTargetCurrencyMenu(prev => !prev)}>
    //                 <div className="flex justify-center">
    //                   <img src={currenciesFlags.find(currenciesFlags => currenciesFlags.code === conversion.targetCurrency)?.flag} className="mr-2 w-[32px] h-[21px]" />
    //                   {conversion.targetCurrency}
    //                   <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    //                     <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
    //                   </svg>
    //                 </div>
    //               </button>



    //               {clickTargetCurrencyMenu && (
    //                 <div className="w-full absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto max-h-60" role="menu" aria-orientation="vertical">
    //                   <div className="py-1" role="none">
    //                     {currencyList.map(currency => (
    //                       <div className="flex justify-center">
    //                         <img src={currenciesFlags.find(currenciesFlags => currenciesFlags.code === currency[0])?.flag} className="w-[32px]" />
    //                         <div key={currency[0]} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => handleCurrencySelect(currency[0], false)}>
    //                           {currency[0]}
    //                         </div>
    //                       </div>
    //                     ))}
    //                   </div>
    //                 </div>
    //               )}
    //             </div>

    //           </div>

    //         </div>

    //       </div>



    //       {conversionRate !== null && (
    //         <div style={{
    //           fontSize: '9px',
    //         }}>
    //           <p>Conversion rate from <b>{conversion.baseCurrency}</b> to <b>{conversion.targetCurrency}</b> is 1 : <b>{conversionRate}</b></p>
    //           <p>Last updated at {timeUpdated} </p>
    //         </div>
    //       )}</div>

    //   ) : (
    //     <div>Loading...</div>
    //   )}
    // </section>
  );
}
