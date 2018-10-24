@injectable()
export class AccountService {
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Optional()
    @Inject(API_BASE_URL)
    baseUrl?: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl ? baseUrl : "";
  }

  /**
   * @input (optional)
   * @return Success
   */
  isTenantAvailable(
    input: IsTenantAvailableInput | null | undefined
  ): Observable<IsTenantAvailableOutput> {
    let url_ = this.baseUrl + "/api/services/app/Account/IsTenantAvailable";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(input);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json"
      })
    };

    return this.http
      .request("post", url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processIsTenantAvailable(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processIsTenantAvailable(<any>response_);
            } catch (e) {
              return <Observable<IsTenantAvailableOutput>>(
                (<any>_observableThrow(e))
              );
            }
          } else
            return <Observable<IsTenantAvailableOutput>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processIsTenantAvailable(
    response: HttpResponseBase
  ): Observable<IsTenantAvailableOutput> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
          ? (<any>response).error
          : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ""
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200
            ? IsTenantAvailableOutput.fromJS(resultData200)
            : new IsTenantAvailableOutput();
          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<IsTenantAvailableOutput>(<any>null);
  }

  /**
   * @input (optional)
   * @return Success
   */
  register(
    input: RegisterInput | null | undefined
  ): Observable<RegisterOutput> {
    let url_ = this.baseUrl + "/api/services/app/Account/Register";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(input);

    let options_: any = {
      body: content_,
      observe: "response",
      responseType: "blob",
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Accept: "application/json"
      })
    };

    return this.http
      .request("post", url_, options_)
      .pipe(
        _observableMergeMap((response_: any) => {
          return this.processRegister(response_);
        })
      )
      .pipe(
        _observableCatch((response_: any) => {
          if (response_ instanceof HttpResponseBase) {
            try {
              return this.processRegister(<any>response_);
            } catch (e) {
              return <Observable<RegisterOutput>>(<any>_observableThrow(e));
            }
          } else
            return <Observable<RegisterOutput>>(
              (<any>_observableThrow(response_))
            );
        })
      );
  }

  protected processRegister(
    response: HttpResponseBase
  ): Observable<RegisterOutput> {
    const status = response.status;
    const responseBlob =
      response instanceof HttpResponse
        ? response.body
        : (<any>response).error instanceof Blob
          ? (<any>response).error
          : undefined;

    let _headers: any = {};
    if (response.headers) {
      for (let key of response.headers.keys()) {
        _headers[key] = response.headers.get(key);
      }
    }
    if (status === 200) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          let result200: any = null;
          let resultData200 =
            _responseText === ""
              ? null
              : JSON.parse(_responseText, this.jsonParseReviver);
          result200 = resultData200
            ? RegisterOutput.fromJS(resultData200)
            : new RegisterOutput();
          return _observableOf(result200);
        })
      );
    } else if (status !== 200 && status !== 204) {
      return blobToText(responseBlob).pipe(
        _observableMergeMap(_responseText => {
          return throwException(
            "An unexpected server error occurred.",
            status,
            _responseText,
            _headers
          );
        })
      );
    }
    return _observableOf<RegisterOutput>(<any>null);
  }
}
