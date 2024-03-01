export interface ICustomer {
  id: number;
  businessName: string;
  vatNumber: string;
  insertionDate: string;
  lastContactDate: string;
  annualTurnover: number;
  pec: string;
  phoneNumber: string;
  registeredOfficeAddress: string;
  operationalHeadquartersAddress: string;
  contactName: string;
  contactSurname: string;
  contactNumber: string;
  logo: string;
  customerType: string;
  email: string;
  address: Address;
  invoices: Invoice[];
}

export interface Address {
  id: number;
  street: string;
  streetNumber: string;
  city: string;
  postalCode: string;
  country: string;
  municipality: Municipality;
}

export interface Invoice {
  number: number;
  date: string;
  status: string;
}

export interface Municipality {
  id: number;
  name: string;
  province: string;
  provinceAbbr: string;
  region: string;
}


