export const getParams = (
  parametersTypeRef: string,
  requestBodyTypeRef: string
) => {
  if (parametersTypeRef && !requestBodyTypeRef) {
    return `params: ${parametersTypeRef},`;
  } else if (!parametersTypeRef && requestBodyTypeRef) {
    return `params: { requestBody: ${requestBodyTypeRef} },`;
  } else if (parametersTypeRef && requestBodyTypeRef) {
    return `params: ${parametersTypeRef} & { requestBody: ${requestBodyTypeRef} },`;
  } else {
    return "";
  }
};
