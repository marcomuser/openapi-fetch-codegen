import type { ParserOptions } from "@apidevtools/json-schema-ref-parser/dist/lib/options.js";
import type {
  OpenAPI3,
  OperationObject,
  ParameterObject,
  RequestBodyObject,
  ResponsesObject,
  ResponseObject,
  OpenAPITSOptions,
  MediaTypeObject,
} from "openapi-typescript";

export type OpenAPIObj = OpenAPI3;

export type OperationObj = OperationObject;

export type ParameterObj = ParameterObject;

export type RequestBodyObj = RequestBodyObject;

export type MediaTypeObj = MediaTypeObject;

export type Encoding = MediaTypeObject["encoding"];

export type ResponsesObj = ResponsesObject;

export type ResponseObj = ResponseObject;

export type OApiTsOptions = Partial<OpenAPITSOptions>;

export type RefParserOptions = Partial<ParserOptions>;
