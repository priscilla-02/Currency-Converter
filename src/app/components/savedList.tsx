import { IConversionHistory, getConversionHistory } from "@/app/utils/localStorage";
import { useEffect, useState } from "react";

export default function SavedList() {

  const [list, setList] = useState<IConversionHistory[]>([])
  const [updateList, setUpdateList] = useState<boolean>(true)

  useEffect(() => {
    const fetchSavedData = async () => {
      try {
        const savedData = await getConversionHistory()

        if (savedData && savedData.length > 0) {
          if (savedData.length > 10) {
            const lastTenItems = savedData.slice(savedData.length - 10);
            setTimeout(() => {
              setList(lastTenItems);
              setUpdateList(false)
            }, 6000);
          } else {
            setList(savedData);
            setUpdateList(false)
          }
        }

      } catch (error) {
        console.error('Error fetching saved list', error);
        setUpdateList(false)
        throw error;
      }
    }
    fetchSavedData()
  }, []);


  return (
    <>
      <div>
        <h3 className='text-white bg-indigo-950 rounded-t-lg h-[80px] flex justify-center items-center'>
          Saved Transaction
        </h3>
      </div>

      <div className="min-h-[150px] flex items-center justify-center">

        {updateList ? (

          <div className="merge">
          </div>

        ) : (
          <>
            {list.length === 0 ? (

              <h4>No Saved List
              </h4>

            ) : (

              <div className="w-full px-4 my-8">
                <div className="overflow-x-auto">
                  <h4 className="mb-8 underline">Last 10 transactions</h4>

                  <table className="table-auto w-full border-none">
                    <thead>
                      <tr>
                        <th ></th>
                        <th>Amount</th>
                        <th>Base</th>
                        <th>Converted</th>
                        <th>Target</th>
                        <th>Rate</th>
                        <th>Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {list.map((item: IConversionHistory, index: number) => (
                        <tr key={index} className="border-none">
                          <td>{index + 1}.</td>
                          <td>{item.base}</td>
                          <td>{item.from}</td>
                          <td>{item.target}</td>
                          <td>{item.to}</td>
                          <td>{item.rate}</td>
                          <td>{item.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            )}
          </>

        )}
      </div>
      <div>
      </div>

    </>
  )
};

