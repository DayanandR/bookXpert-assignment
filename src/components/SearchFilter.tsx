import type { ChangeEvent } from "react";
import type { Filters } from "../types";

interface SearchFilterProps {
  onSearch: (value: string) => void;
  onFilter: (type: string, value: string) => void;
  filters: Filters;
}

const SearchFilter = ({ onSearch, onFilter, filters }: SearchFilterProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 no-print">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search by Name
          </label>
          <input
            type="text"
            placeholder="Search employees..."
            value={filters.search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onSearch(e.target.value)
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Gender
          </label>
          <select
            value={filters.gender}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              onFilter("gender", e.target.value)
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          >
            <option value="">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Status
          </label>
          <select
            value={filters.status}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              onFilter("status", e.target.value)
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
