export default class Utils {
  static createResponse: (
    responseCode: number,
    headers: any,
    body: any
  ) => any = (responseCode: number, headers: any, body: any) => {
    return {
      statusCode: responseCode,
      headers: headers,
      body: body,
    };
  };
}
