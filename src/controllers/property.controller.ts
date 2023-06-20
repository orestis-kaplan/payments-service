import PropertyService from "~/services/property.service";
import { NextFunction, Request, Response } from "express";
import { IProperty } from "~/types/models/property";

class PropertyController {
  static async getProperty(req: Request, res: Response, next: NextFunction) {
    try {
      const propertyId = req.params.propertyId || req.body._id || undefined;
      if (propertyId) {
        const property = await PropertyService.getPropertyById(propertyId);
        return res.json(property).status(200);
      } else {
        const filter = req.body as IProperty;
        const property = await PropertyService.getProperty(filter);
        return res.send(property).status(200);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getQueriedProperties(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const query = req.query || {};
      const projection = req.body.projection || {};
      const property = req.body.property || {};
      const filteredProperty = await PropertyService.getQueriedProperties(
        property,
        projection,
        query
      );
      return res.send(filteredProperty).status(200);
    } catch (error) {
      next(error);
    }
  }

  static async createProperty(req: Request, res: Response) {
    try {
      const property = await PropertyService.createProperty(req.body);
      return res.json(property).status(200);
    } catch (error) {
      return res.json(error).status(400);
    }
  }

  static async updatePropertyById(req: Request, res: Response) {
    try {
      const property = await PropertyService.updatePropertyById(
        req.params.propertyId,
        req.body
      );
      return res.json(property).status(200);
    } catch (error) {
      return res.json(error).status(400);
    }
  }

  static async deletePropertyById(req: Request, res: Response) {
    try {
      const property = await PropertyService.deletePropertyById(
        req.params.propertyId
      );
      return res.json(property).status(200);
    } catch (error) {
      return res.json(error).status(400);
    }
  }

  static async getPropertyCount(req: Request, res: Response) {
    try {
      const propertyCount = await PropertyService.getPropertyCount();
      return res.json(propertyCount).status(200);
    } catch (error) {
      return res.json(error).status(400);
    }
  }
}

export default PropertyController;
