import { removePluralTitle } from "../../utils/string";

interface ITableProps<T extends Record<string, any>> {
  title: string;
  description: string;
  data: T[];
  headerActions?: React.ReactNode;
  searchComponent?: React.ReactNode;
  newItemOnClick?: () => void;
  editItemOnClick?: (item: T) => void;
  deleteItemOnClick?: (item: T) => void;
}

export const SimpleTable = <T extends Record<string, any>>({
  title,
  description,
  data = [],
  headerActions,
  searchComponent,
  newItemOnClick,
  editItemOnClick,
  deleteItemOnClick,
}: ITableProps<T>) => {
  const tableHeaders = data[0] && Object.keys(data[0]);

  const handleNewItemOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newItemOnClick) {
      newItemOnClick();
    }
  };

  const handleDeleteOnClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: T,
  ) => {
    e.preventDefault();
    if (deleteItemOnClick) {
      deleteItemOnClick(item);
    }
  };

  const handleEditOnClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: T,
  ) => {
    e.preventDefault();
    if (editItemOnClick) {
      editItemOnClick(item);
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 w-full">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
          <p className="mt-2 text-sm text-gray-700">{description}</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          {headerActions}
        </div>
      </div>

      {searchComponent && <div className="mt-4">{searchComponent}</div>}

      {tableHeaders && data.length > 0 && (
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow-sm outline-1 outline-black/5 sm:rounded-lg">
                <table className="relative min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      {tableHeaders.map((header) => (
                        <th
                          key={header}
                          scope="col"
                          className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          {header}
                        </th>
                      ))}

                      {(editItemOnClick || deleteItemOnClick) && (
                        <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-6">
                          <span className="sr-only">Actions</span>
                        </th>
                      )}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data.map((row) => (
                      <tr key={row.id}>
                        {tableHeaders.map((header) => (
                          <td
                            className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6"
                            key={`${row.id}-${header}`}
                          >
                            {row[header] ?? ""}
                          </td>
                        ))}

                        <td className="py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                          {editItemOnClick && (
                            <a
                              className="text-indigo-600 hover:text-indigo-900 cursor-pointer mr-6"
                              onClick={(e) => {
                                handleEditOnClick(e, row);
                              }}
                            >
                              Edit
                            </a>
                          )}

                          {deleteItemOnClick && (
                            <a
                              className="text-red-600 hover:text-red-900 cursor-pointer"
                              onClick={(e) => {
                                handleDeleteOnClick(e, row);
                              }}
                            >
                              Delete
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {(!data || data.length === 0) && (
        <div className="mt-8 rounded-lg border-2 border-dashed border-gray-200 px-6 py-16 text-center">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="mx-auto size-14 text-indigo-300"
          >
            <path
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3 className="mt-4 text-base font-semibold text-gray-900">
            No {title.toLowerCase()} yet
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Get started by adding your first{" "}
            {removePluralTitle(title).toLowerCase()}.
          </p>
          <div className="mt-6">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              onClick={handleNewItemOnClick}
            >
              New {removePluralTitle(title).toLowerCase()}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
