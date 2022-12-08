const DEFAULT_USER_AGENT =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15";

type BrowserResponse = {
  response: Response;
  body: string;
};

export class Browser {
  constructor(private readonly userAgent: string = DEFAULT_USER_AGENT) {}

  async go(url: string): Promise<BrowserResponse> {
    const resp = await fetch(url, {
      headers: {
        "User-Agent": this.userAgent,
      },
    });

    return { response: resp, body: await resp.text() };
  }
}
