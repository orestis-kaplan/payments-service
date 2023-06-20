import { Router } from "express";

export interface IRoutes {
  [key: string]: Router;
}