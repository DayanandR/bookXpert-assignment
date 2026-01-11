import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { storage, initializeMockData } from "../utils/storage";
import type { Employee, Filters } from "../types";
import EmployeeTable from "../components/EmployeeTable";
import EmployeeForm from "../components/EmployeeForm";
import SearchFilter from "../components/SearchFilter";
import ConfirmationModal from "../components/ConfirmationModal";

const Dashboard = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [filters, setFilters] = useState<Filters>({
    search: "",
    gender: "",
    status: "",
  });
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    employeeId: "",
    employeeName: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    initializeMockData();
    loadEmployees();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [employees, filters]);

  const loadEmployees = () => {
    setLoading(true);
    setTimeout(() => {
      const data = storage.getEmployees();
      setEmployees(data);
      setLoading(false);
    }, 500);
  };

  const applyFilters = () => {
    let filtered = [...employees];

    if (filters.search) {
      filtered = filtered.filter((emp) =>
        emp.fullName.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.gender) {
      filtered = filtered.filter((emp) => emp.gender === filters.gender);
    }

    if (filters.status) {
      const isActive = filters.status === "active";
      filtered = filtered.filter((emp) => emp.active === isActive);
    }

    setFilteredEmployees(filtered);
  };

  const handleSave = (employeeData: Omit<Employee, "id"> & { id?: string }) => {
    const allEmployees = storage.getEmployees();

    if (editingEmployee && employeeData.id) {
      const updated = allEmployees.map((emp) =>
        emp.id === employeeData.id
          ? ({ ...employeeData, id: emp.id } as Employee)
          : emp
      );
      storage.saveEmployees(updated);
    } else {
      const newEmployee: Employee = {
        ...employeeData,
        id: Date.now().toString(),
      } as Employee;
      storage.saveEmployees([...allEmployees, newEmployee]);
    }

    setShowForm(false);
    setEditingEmployee(null);
    loadEmployees();
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    const employee = employees.find((emp) => emp.id === id);
    if (employee) {
      setDeleteModal({
        isOpen: true,
        employeeId: id,
        employeeName: employee.fullName,
      });
    }
  };

  const confirmDelete = () => {
    const allEmployees = storage.getEmployees();
    const updated = allEmployees.filter(
      (emp) => emp.id !== deleteModal.employeeId
    );
    storage.saveEmployees(updated);
    setDeleteModal({ isOpen: false, employeeId: "", employeeName: "" });
    loadEmployees();
  };

  const cancelDelete = () => {
    setDeleteModal({ isOpen: false, employeeId: "", employeeName: "" });
  };

  const handleToggleActive = (id: string) => {
    const allEmployees = storage.getEmployees();
    const updated = allEmployees.map((emp) =>
      emp.id === id ? { ...emp, active: !emp.active } : emp
    );
    storage.saveEmployees(updated);
    loadEmployees();
  };

  const handleLogout = () => {
    storage.logout();
    navigate("/login");
  };

  const activeCount = employees.filter((emp) => emp.active).length;
  const inactiveCount = employees.length - activeCount;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 w-10 h-10 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-gray-800">
                Employee Management
              </h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
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
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 no-print">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Employees
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {employees.length}
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-lg">
                <svg
                  className="w-8 h-8 text-indigo-600"
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
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Employees
                </p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {activeCount}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Inactive Employees
                </p>
                <p className="text-3xl font-bold text-red-600 mt-2">
                  {inactiveCount}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {!showForm && (
          <div className="mb-6 no-print">
            <button
              onClick={() => {
                setEditingEmployee(null);
                setShowForm(true);
              }}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium flex items-center space-x-2"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Add New Employee</span>
            </button>
          </div>
        )}

        {showForm ? (
          <EmployeeForm
            employee={editingEmployee}
            onSave={handleSave}
            onCancel={() => {
              setShowForm(false);
              setEditingEmployee(null);
            }}
          />
        ) : (
          <>
            <SearchFilter
              onSearch={(value) => setFilters({ ...filters, search: value })}
              onFilter={(type, value) =>
                setFilters({ ...filters, [type]: value })
              }
              filters={filters}
            />

            <EmployeeTable
              employees={filteredEmployees}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleActive={handleToggleActive}
              loading={loading}
            />
          </>
        )}
      </main>

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        employeeName={deleteModal.employeeName}
      />
    </div>
  );
};

export default Dashboard;
