import mongooge from "mongoose";

const Schema = mongooge.Schema;

const numericDescriptiveSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    percentage: { type: Number, required: false },
    amount: { type: Number, required: true },
  },
  { _id: false }
);

const stringDescriptiveSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);
const airdnaSchema = new Schema({}, { _id: false });

const offeringDetailsSchema = new Schema(
  {
    property_purchase_price: { type: numericDescriptiveSchema },
    property_improvements_and_cash_reserves: { type: numericDescriptiveSchema },
    general_costs: { type: numericDescriptiveSchema },
    wiselord_fee: { type: numericDescriptiveSchema },
    total_property_amount: { type: numericDescriptiveSchema },
    price_per_share: { type: numericDescriptiveSchema },
    total_shares: { type: numericDescriptiveSchema },
    hold_period: { type: stringDescriptiveSchema },
    property_management_fee: { type: String },
  },
  { _id: false }
);

const locationSchema = new Schema(
  {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { _id: false }
);

const propertySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    address: { type: String, required: true, unique: true },
    investors_count: { type: Number, required: true, default: 0 },
    initial_investment: { type: Number, required: true },
    current_investment: { type: Number, required: true },
    preview_images: { type: [{ type: String, unique: true }], required: true },
    availability: {
      type: String,
      required: true,
      enum: ["FOR_SALE", "FUNDED", "COMING_SOON"],
    },
    rent_status: {
      type: String,
      required: true,
      enum: ["RENTED", "VACANT"], //vacant means not rented,empty
    },
    investment_strategy: {
      type: String,
      required: true,
      enum: ["RESIDENTIAL", "VACATION_RENTAL", "NEWLY_BUILT"],
    },
    location: { type: locationSchema, required: true },
    property_description: { type: String, required: true },
    property_manager: { type: stringDescriptiveSchema, required: false },
    appreciation: { type: numericDescriptiveSchema }, //poso tha anevei tou xronou
    rental_income: { type: numericDescriptiveSchema },
    expenses: { type: numericDescriptiveSchema },
    yearly_return: { type: numericDescriptiveSchema },
    airdna_data: { type: airdnaSchema },
    offering_details: { type: offeringDetailsSchema },
    files: { type: [{ type: String, required: true }], required: true },
  },
  { timestamps: true }
);

const PropertyModel = mongooge.model("Property", propertySchema);

export default PropertyModel;
