export interface Employee {
  id: string;
  fullName: string;
  gender: "Male" | "Female" | "Other";
  dateOfBirth: string;
  state: string;
  active: boolean;
  profileImage: string;
}

export interface Filters {
  search: string;
  gender: string;
  status: string;
}

export interface Credentials {
  username: string;
  password: string;
}
