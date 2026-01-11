import type { Employee } from "../types";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string) => void;
  loading: boolean;
}

const EmployeeTable = ({
  employees,
  onEdit,
  onDelete,
  onToggleActive,
  loading,
}: EmployeeTableProps) => {
  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="bg-white p-12 rounded-lg shadow-sm border border-gray-200 text-center">
        <svg
          className="w-16 h-16 text-gray-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No Employees Found
        </h3>
        <p className="text-gray-500">Add your first employee to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center no-print">
        <h3 className="text-lg font-semibold text-gray-800">Employee List</h3>
        <button
          onClick={handlePrint}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          <span>Print</span>
        </button>
      </div>

      <div className="overflow-x-auto print:overflow-visible">
        <table className="w-full print:w-full print:table-fixed">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-24 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="w-20 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profile
              </th>
              <th className="w-32 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full Name
              </th>
              <th className="w-24 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="w-32 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date of Birth
              </th>
              <th className="w-32 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                State
              </th>
              <th className="w-24 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="w-32 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider no-print">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50 transition">
                <td className="px-2 py-4 text-sm text-gray-900 wrap-break-word">
                  {employee.id}
                </td>
                <td className="py-4">
                  <img
                    src={employee.profileImage}
                    alt={employee.fullName}
                    className="h-10 w-10 rounded-full text-center"
                  />
                </td>
                <td className="px-2 py-2 text-sm font-medium text-gray-900 wrap-break-word min-w-0">
                  <div className="line-clamp-2">{employee.fullName}</div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600 wrap-break-word">
                  {employee.gender}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600 wrap-break-word">
                  {employee.dateOfBirth}
                </td>
                <td className="px-4 py-4 text-sm text-gray-600 wrap-break-word">
                  {employee.state}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => onToggleActive(employee.id)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold no-print ${
                      employee.active
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {employee.active ? "Active" : "Inactive"}
                  </button>
                  <span className="print-only">
                    {employee.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 no-print">
                  <button
                    onClick={() => onEdit(employee)}
                    className="text-indigo-600 hover:text-indigo-900 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(employee.id)}
                    className="text-red-600 hover:text-red-900 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
