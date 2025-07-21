

const Table = ({transactions, showActions, onEdit, onDelete, }) => {
   
 

  return (
    <div>
         <table className="table-auto w-full bg-white shadow rounded">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Discription</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Catagory</th>
                {showActions && (
                <th className="px-4 py-2">Actions</th>
              )}
              </tr>
            </thead>

            <tbody>
          {transactions?.length === 0 ? (
            <tr>
              <td colSpan={showActions ? 5 : 4} className="text-center py-4">
                No transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((transaction, index) => (
              <tr key={transaction.id || index}>
                <td className="border px-4 py-2">{transaction.date}</td>
                <td className="border px-4 py-2">{transaction.description}</td>
                <td className="border px-4 py-2">{transaction.type}</td>
                <td className="border px-4 py-2">{transaction.amount}</td>
                <td className="border px-4 py-2">{transaction.category}</td>

                {showActions && ( 
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => onEdit(transaction)}
                      
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onDelete(transaction)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
          </table>
      
    </div>
  )
}

export default Table
