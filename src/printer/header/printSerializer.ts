export const printSerializer = () => {
  return `${querySerializer}

${headersSerializer}`;
};

const querySerializer = `const serializeQuery = <
  T extends Record<string, unknown>,
  U extends FormData | URLSearchParams
>(
  query: T = {} as T,
  options: QuerySerializerOptions<U>
) => {
  const { encoder, encoding } = options;
  for (const [key, value] of Object.entries(query)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        encoder.append(key, String(item));
      }
    } else if (typeof value === "object") {
      encoder.set(key, JSON.stringify(value));
    } else {
      encoder.set(key, String(value));
    }
  }
  return encoder;
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
      } else if (Array.isArray(value)) {
        headers.append(key, value.join(","));
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
