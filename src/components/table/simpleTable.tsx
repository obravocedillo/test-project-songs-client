interface ITableProps<T extends Record<string, any>> {
  title: string;
  description: string;
  data: T[];
  headerActions?: React.ReactNode;
  newItemOnClick?: () => void;
}

export const SimpleTable = <T extends Record<string, any>>({
  title,
  description,
  data = [],
  headerActions,
  newItemOnClick,
}: ITableProps<T>) => {
  const tableHeaders = data[0] && Object.keys(data[0]);

  const handleNewItemOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newItemOnClick) {
      newItemOnClick();
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 w-full">
      {tableHeaders && data.length && (
        <>
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
              <p className="mt-2 text-sm text-gray-700">{description}</p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              {headerActions}
            </div>
          </div>

          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg">
                  <table className="relative min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        {tableHeaders.map((header) => {
                          return (
                            <th
                              key={header}
                              scope="col"
                              className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                            >
                              {header}
                            </th>
                          );
                        })}
                        <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-6">
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 bg-white">
                      {data.map((row) => {
                        return (
                          <tr key={row.id}>
                            {tableHeaders.map((header) => {
                              return (
                                <td
                                  className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6"
                                  key={`${row.id}-${header}`}
                                >
                                  {row[header] ?? ""}
                                </td>
                              );
                            })}
                            <td className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                              <a
                                href="#"
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
                                <span className="sr-only">, {row.id}</span>
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {(!data || data.length === 0) && (
        <div className="text-center">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="mx-auto size-12 text-gray-400 dark:text-gray-500"
          >
            <path
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3 className="mt-2 text-sm font-semibold">No data found</h3>
          <p className="mt-1 text-sm">
            Please add new data and then refresh the page to see the new data
            added
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:shadow-none dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500 cursor-pointer"
              onClick={(e) => {
                handleNewItemOnClick(e);
              }}
            >
              New {title.slice(0, title.length - 1)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
