export interface HttpResponse<T> extends Response {
  data?: T;
  error?: { message: string };
}

async function prepareResponse<T>(response: HttpResponse<T>) {
  if (response.ok) {
    response.data = await response.json();
  } else {
    const isJson = response.headers.get('Content-Type')?.startsWith('application/json');
    response.error = isJson ? await response.json() : await response.text();
  }
  return response;
}

export default async function http<T>(url: string, opts: RequestInit): Promise<HttpResponse<T>> {
  opts.credentials = 'include';
  const request = new Request(url, opts);
  const response: HttpResponse<T> = await fetch(request);
  return prepareResponse<T>(response);
};
