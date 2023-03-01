import type { OpenAPIV3, OpenAPIV3_1 } from "openapi-types";

export type Document = OpenAPIV3.Document | OpenAPIV3_1.Document;

export type OperationObject =
  | OpenAPIV3.OperationObject
  | OpenAPIV3_1.OperationObject;
