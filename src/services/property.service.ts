import { FilterQuery } from "mongoose";
import Property from "~/models/property";
import { IProperty } from "~/types/models/property";

class PropertyService {
  static async getPropertyById(propertyId: IProperty["_id"] | string) {
    const property = await Property.findById({ _id: propertyId });
    return property;
  }

  static async getProperty(filteredProperty: Partial<IProperty>) {
    const property = await Property.find(filteredProperty);
    return property;
  }

  static async getQueriedProperties(query: FilterQuery<IProperty>) {
    const property = await Property.find(query);
    return property;
  }

  static async createProperty(property: Partial<IProperty>) {
    const newProperty = new Property(property);
    const savedProperty = await newProperty.save();
    return savedProperty;
  }

  static async updatePropertyById(
    propertyId: IProperty["_id"] | string,
    property: IProperty
  ) {
    const updatedProperty = await Property.findByIdAndUpdate(
      { _id: propertyId },
      { $set: property },
      { new: true }
    );
    return updatedProperty;
  }

  static async deletePropertyById(propertyId: IProperty["_id"] | string) {
    const deletedProperty = await Property.findByIdAndDelete({
      _id: propertyId,
    });
    return deletedProperty;
  }

  static async getPropertyCount() {
    const propertyCount = await Property.countDocuments();
    return propertyCount;
  }
}

export default PropertyService;
