export interface CarModel {
  createdAt: Date;
  id: string;
  make: string;
  model: string;
  updatedAt: Date;
  year: number;
}

export interface AddCarModelDTO {
  year: number;
  make: string;
  model: string;
}
