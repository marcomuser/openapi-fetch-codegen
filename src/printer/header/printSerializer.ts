export const printSerializer = () => {
  return `${querySerializer}

${headersSerializer}`;
};

const querySerializer = `const serializeQuery = <T extends Record<string, unknown>>(query: T) => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        searchParams.append(key, item);
      }
    } else if (typeof value === "object") {
      searchParams.set(key, JSON.stringify(value));
    } else {
      searchParams.set(key, String(value));
    }
  }
  return searchParams;
};`;

const headersSerializer = `const serializeHeaders = <
  T extends Headers,
  U extends HeadersInit,
  V extends Record<string, unknown>
>(
  headers: T,
  configHeaders?: U,
  paramHeader?: V
) => {
  if (paramHeader) {
    for (const [key, value] of Object.entries(paramHeader)) {
      if (typeof value === "string") {
        headers.append(key, value);
      }
    }
  }

  if (configHeaders instanceof Headers) {
    for (const [key, value] of configHeaders) {
      headers.append(key, value);
    }
  } else if (typeof configHeaders === "object") {
    for (const [key, value] of Object.entries(configHeaders)) {
      headers.append(key, value);
    }
  }

  return headers;
};`;
