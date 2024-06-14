import { IConversionHistory, getConversionHistory } from "@/app/utils/localStorage";
import { useEffect, useState } from "react";

export default function SavedList() {

  const [list, setList] = useState<IConversionHistory[]>([])
  const [updateList, setUpdateList] = useState<boolean>(true)

  useEffect(() => {
    const fetchSavedData = async () => {
      try {
        const savedData = await getConversionHistory()
        if (savedData) {
          setTimeout(() => {
            setList(savedData)
            setUpdateList(false)
          }, 8000);
        } else {
          setUpdateList(false)
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

      <div className="h-[150px] pt-10 flex items-center justify-center">

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

                  <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                      <tr>
                        <th></th>
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
                        <tr key={index} className="hover:bg-gray-100">
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


  // const renderTable = () => (
  //   <div className="w-full px-4 my-8">
  //     <div className="overflow-x-auto">
  //       <table className="table-auto w-full border-collapse border border-gray-200">
  //         <thead>
  //           <tr>
  //             <th></th>
  //             <th>Amount</th>
  //             <th>Base</th>
  //             <th>Converted</th>
  //             <th>Target</th>
  //             <th>Rate</th>
  //             <th>Time</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {list.map((item: IConversionHistory, index: number) => (
  //             <tr key={index} className="hover:bg-gray-100">
  //               <td>{index + 1}.</td>
  //               <td>{item.base}</td>
  //               <td>{item.from}</td>
  //               <td>{item.target}</td>
  //               <td>{item.to}</td>
  //               <td>{item.rate}</td>
  //               <td>{item.time}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );

  // const renderNoSavedList = () => (
  //   <div className="h-[150px] pt-10flex justify-center items-center">
  //     <div>No Saved List</div>
  //   </div>
  // );

  // const renderLoading = () => (
  //   <div className="h-[150px] pt-10 flex items-center justify-center">
  //     <div className="merge"></div>
  //   </div>
  // );

  // return (
  //   <>
  //     <div>
  //       <h3 className='text-white bg-indigo-950 rounded-t-lg h-[80px] flex justify-center items-center'>
  //         Saved Transaction
  //       </h3>
  //     </div>

  //     {updateList ? renderLoading() : (list.length === 0 ? renderNoSavedList() : renderTable())}
  //   </>
  // );
};

