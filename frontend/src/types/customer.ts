export interface Customer {
  name: string;
  phoneNumber: string;
  altPhoneNumber: string;
  address: string;
  aadhaarNumber: string;
  panNumber: string;
  rationNumber: string;
  email: string;
  occupation: string;
}

export interface CustomerRequest extends Customer { }

export interface CustomerResponse extends Customer {
  id: number;
}
