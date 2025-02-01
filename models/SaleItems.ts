import { ObjectId } from 'mongodb';

export interface SaleItem {
  _id?: ObjectId; // MongoDB automatically generates this
  id: string;
  ownerId: string;
  name: string;
  description: string;
  price: number;
  img: string;
  created_at: Date;
  updated_at: Date;
  contact: number;
  approved: boolean;
}
