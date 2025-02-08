/**
 * Base class for the api client to have access to updating the url
 */
export abstract class ApiUrlProvider {
  protected baseUrl = "";

  setBaseUrl(baseUrl: string): void {
    this.baseUrl = baseUrl;
  }
}
