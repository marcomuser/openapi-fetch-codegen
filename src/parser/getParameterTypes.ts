import type { Parameter } from "../utils/types.js";

export const getParameterTypes = (parameters?: Parameter[]) => {
  const types: Record<Parameter["in"], boolean> = {
    query: false,
    cookie: false,
    header: false,
    path: false,
  };

  if (parameters) {
    for (const p of parameters) {
      if (p.in === "query") {
        types.query = true;
      } else if (p.in === "cookie") {
        types.cookie = true;
      } else if (p.in === "header") {
        types.header = true;
      } else if (p.in === "path") {
        types.path = true;
      }
    }
  }

  return types;
};
