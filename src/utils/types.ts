import type { ParserOptions } from "@apidevtools/json-schema-ref-parser/dist/lib/options.js";
import type {
  OpenAPI3,
  OperationObject,
  ParameterObject,
  RequestBodyObject,
  ResponsesObject,
  ResponseObject,
  OpenAPITSOptions,
} from "openapi-typescript";

export type OpenAPIObj = OpenAPI3;

export type OperationObj = OperationObject;

export type ParameterObj = ParameterObject;

export type RequestBodyObj = RequestBodyObject;

export type ResponsesObj = ResponsesObject;

export type ResponseObj = ResponseObject;

export type OApiTsOptions = Partial<OpenAPITSOptions>;

export type RefParserOptions = Partial<ParserOptions>;
