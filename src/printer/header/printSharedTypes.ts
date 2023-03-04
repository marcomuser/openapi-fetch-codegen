export const printSharedTypes = () => {
  return `type TBaseUrl = {
  /**
   * The baseUrl that will be used in the fetch request. This is an additional property added to the options object of this fetch function when it was generated by openapi-fetch. It is not part of the fetch standard.
   */
  baseUrl: string;
};

type ExtendedRequestInit = RequestInit & TBaseUrl;
`;
};