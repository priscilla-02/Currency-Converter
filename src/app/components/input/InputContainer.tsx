import { IConversion } from "@/app/components/converter";
import { currenciesFlags } from "@/app/utils/currenciesFlags";
import ArrowUpDown from "../../../../public/svg/ArrowUpDown.svg"
import ArrowRightLeft from "../../../../public/svg/ArrowRightLeft.svg"
import { SetStateAction } from "react";
import { flatCurrencyList } from "@/app/utils/flatCurrencyList";

interface InputContainerProps {
  selectMenu: string;
  errMsg: string | null;
  // currencyList: string[];
  currencyList: any;
  conversionRate: number;
  conversion: IConversion;
  clickBaseCurrencyMenu: Boolean
  clickTargetCurrencyMenu: Boolean
  setConversion: React.Dispatch<SetStateAction<IConversion>>
  setClickTargetCurrencyMenu: React.Dispatch<SetStateAction<boolean>>
  setClickBaseCurrencyMenu: React.Dispatch<SetStateAction<boolean>>
  timeUpdated?: any;
}


const InputContainer: React.FC<InputContainerProps> = (
  { selectMenu,
    errMsg,
    currencyList,
    conversionRate,
    conversion,
    clickBaseCurrencyMenu,
    clickTargetCurrencyMenu,
    setConversion,
    setClickTargetCurrencyMenu,
    timeUpdated,
    setClickBaseCurrencyMenu
  }) => {


  const handleAmountBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const amount = +event.target.value;
    setConversion(prevConversion => ({
      ...prevConversion,
      baseAmount: amount,
      targetAmount: amount * conversionRate
    }));
  };


  const handleCurrencySelect = (currency: string, isBaseCurrency: boolean) => {
    if (isBaseCurrency) {
      setConversion(prevConversion => ({
        ...prevConversion,
        baseCurrency: currency
      }));

      setClickBaseCurrencyMenu(false);
    } else {
      setConversion(prevConversion => ({
        ...prevConversion,
        targetCurrency: currency
      }));

      setClickTargetCurrencyMenu(false);
    }
  };


  return (
    <section className="px-8 pt-6 pb-8 mb-4">
      {errMsg !== null || (currencyList.length > 0 && conversionRate !== 0 && errMsg == null) ? (
        <div>
          <div className="text-rose-600 mb-4 flex flex-col">
            {errMsg && <p style={{ whiteSpace: 'pre-line' }}>{errMsg}</p>}
          </div>

          <div className="flex lg:flex-row flex-col justify-center items-center">

            <div className="mb-4 flex flex-col justify-center items-start">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Amount
              </label>


              <div className="flex max-w-[500px]">
                <input className="shadow-2xl appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder={conversion.baseAmount.toString()} onBlur={handleAmountBlur} />

                <div className="relative inline-block text-left w-full">


                  <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300 min-h-[50px]" id="menu-button" onClick={() => setClickBaseCurrencyMenu(prev => !prev)}>
                    <div className="flex justify-center items-center">
                      <img src={currenciesFlags.find(currenciesFlags => currenciesFlags.code === conversion.baseCurrency)?.flag} className="mr-2 w-[32px] h-[32]" />
                      {conversion.baseCurrency}
                      <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </button>

                  {clickBaseCurrencyMenu && (
                    <div className="w-full absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto max-h-60" role="menu" aria-orientation="vertical">
                      <div className="py-1" role="none">

                        {selectMenu == "currency" ? (<>
                          {currencyList.map((currency: string) => (
                            <div className="flex justify-center cursor-pointer hover:bg-gray-300">
                              <img src={currenciesFlags.find(currenciesFlags => currenciesFlags.code === currency[0])?.flag} className="w-[32px] h-[32]" />
                              <div key={currency[0]} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => handleCurrencySelect(currency[0], true)}>
                                {currency[0]}
                              </div>
                            </div>
                          ))}
                        </>) : (<>
                          {flatCurrencyList.map((currency: string) => (
                            <div className="flex justify-center cursor-pointer hover:bg-gray-300">
                              <img src={currenciesFlags.find(currenciesFlags => currenciesFlags.code === currency)?.flag} className="w-[32px]" />
                              <div key={currency} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => handleCurrencySelect(currency, true)}>
                                {currency}
                              </div>
                            </div>
                          ))}
                        </>)}

                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>



            <div className="flex justify-center">
              <ArrowUpDown className="w-[50px] mx-2 lg:hidden flex" />
              <ArrowRightLeft className="w-[50px] mx-5 hidden lg:flex" />
            </div>



            <div className="mb-4 flex flex-col justify-center items-start">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Converted To
              </label>


              <div className="flex max-w-[500px]">

                <input className="shadow-2xl appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder={conversion.targetAmount.toFixed(2).toString()} disabled />

                <div className="relative inline-block text-left w-full ">


                  <button type="button" className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-300 h-[50px]" id="menu-button" onClick={() => setClickTargetCurrencyMenu(prev => !prev)}>
                    <div className="flex justify-center items-center cursor-pointer hover:bg-gray-300">
                      {selectMenu == "currency" ? (
                        <img src={currenciesFlags.find(currenciesFlags => currenciesFlags.code === conversion.targetCurrency)?.flag} className="mr-2 w-[32px] h-[21px]" />
                      ) : (
                        <img src={currencyList.find((currency: any) => currency.symbol.toUpperCase() === conversion.targetCurrency)?.image} className="mr-2 w-[32px] h-[32]" />
                      )}
                      {conversion.targetCurrency}
                      <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </button>



                  {clickTargetCurrencyMenu && (
                    <div className="w-full absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-y-auto max-h-60" role="menu" aria-orientation="vertical">
                      <div className="py-1" role="none">
                        {selectMenu == "currency" ? (<>

                          {currencyList.map((currency: string) => (
                            <div className="flex justify-center cursor-pointer hover:bg-gray-300">
                              <img src={currenciesFlags.find(currenciesFlags => currenciesFlags.code === currency[0])?.flag} className="w-[32px]" />
                              <div key={currency[0]} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => handleCurrencySelect(currency[0], false)}>
                                {currency[0]}
                              </div>
                            </div>
                          ))}
                        </>) : (<>
                          {currencyList.map((currency: any) => (
                            <div className="flex justify-center cursor-pointer hover:bg-gray-300" key={currency.id}>
                              <img src={currency.image} className="w-[32px] h-[32]" />
                              <div key={currency.id} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" onClick={() => handleCurrencySelect(currency.symbol.toUpperCase(), false)}>
                                {currency.symbol.toUpperCase()}
                              </div>
                            </div>
                          ))}
                        </>)}

                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>



          {conversionRate !== null && (
            <div style={{
              fontSize: '9px',
            }}>
              {selectMenu == "currency" ? (
                <>
                  <p>Conversion rate from <b>{conversion.baseCurrency}</b> to <b>{conversion.targetCurrency}</b> is 1 : <b>{conversionRate}</b></p>
                  <p>Last updated at {timeUpdated} </p>
                </>
              ) : (<>
                <p>{conversion.baseCurrency} to {conversion.targetCurrency} is 1:  <b>{conversionRate}</b></p>
              </>)}

            </div>
          )}</div>

      ) : (
        <div>Loading...</div>
      )}
    </section>
  )
}

export default InputContainer;
