import { Add } from "@mui/icons-material";

const Table = ({ data, handleSelect }) => {
  const onPartSelect = (part) => {
    if (handleSelect) {
      handleSelect(part);
    }
  };

  return (
    <table className="min-w-full divide-y divide-gray-200 border-2 border-white ">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-7 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            Selection
          </th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            Price
          </th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            Price Range
          </th>
          <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            Stock
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((item, index) => (
          <tr key={index}>
            <th className="align-middle">
              <button
                onClick={() => {
                  onPartSelect(item);
                }}
                className=" mr-2 p-2 px-2 rounded-xl text-white bg-blue-600"
              >
                <Add></Add>
              </button>
            </th>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {item.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              ${item.price}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.priceRange}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {item.stock}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Table;
