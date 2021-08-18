export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image?: any;
  businessHours: BusinessHours;
  location: Location;
  phoneNumber: string;
}

export interface BusinessHours {
  openingTime: string;
  closingTime: string;
}

export interface Location {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}