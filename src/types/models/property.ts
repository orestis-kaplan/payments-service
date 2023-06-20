import { Schema } from "mongoose";

export enum Availability {
  FOR_SALE = "FOR_SALE",
  FUNDED = "FUNDED",
  COMING_SOON = "COMING_SOON",
}

export enum RentStatus {
  RENTED = "RENTED",
  VACANT = "VACANT",
}

export enum InvestmentStrategy {
  RESIDENTIAL = "RESIDENTIAL",
  VACATION_RENTAL = "VACATION_RENTAL",
  NEWLY_BUILT = "NEWLY_BUILT",
}

export interface ILocation {
  lat: number;
  lng: number;
}

export interface IStringDescriptive {
  name: string;
  description: string;
}

export interface INumberDescriptive {
  name: string;
  description: string;
  percentage: number;
  amount: number;
}

export interface IAirdna {}

export interface IOfferingDetails {
  property_purchase_price: INumberDescriptive;
  property_improvements_and_cash_reserves: INumberDescriptive;
  general_costs: INumberDescriptive;
  wiselord_fee: INumberDescriptive;
  total_property_amount: INumberDescriptive;
  price_per_share: INumberDescriptive;
  total_shares: INumberDescriptive;
  hold_period: IStringDescriptive;
  property_management_fee: string;
}

export interface IProperty {
  _id?: Schema.Types.ObjectId;
  name: string;
  address: string;
  investors_count: number;
  initial_investment: number;
  current_investment: number;
  preview_images: string[];
  availability: Availability;
  rent_status: RentStatus;
  investment_strategy: InvestmentStrategy;
  location: ILocation;
  property_description: string;
  property_manager: IStringDescriptive;
  appreciation: INumberDescriptive;
  rental_income: INumberDescriptive;
  expenses: INumberDescriptive;
  yearly_return: INumberDescriptive;
  airdna_data: IAirdna;
  offering_details: IOfferingDetails;
  files: string[];
}
