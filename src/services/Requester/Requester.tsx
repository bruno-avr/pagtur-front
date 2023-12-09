import axios, { AxiosInstance, AxiosResponse } from 'axios';

export class RequesterClass {
  requester: AxiosInstance;

  constructor(token?: string) {
    this.requester = axios.create({
      baseURL: 'http://localhost:3333/',
      headers: {
        Authorization: token || ''
      },
      validateStatus: () => true
    });
  }

  post(url: string, data: any) {
    return this.awaitResponse(this.requester.post(url, data));
  }

  put(url: string, data: any) {
    return this.awaitResponse(this.requester.put(url, data));
  }

  get(url: string, params = {}) {
    return this.awaitResponse(this.requester.get(url, { params }));
  }

  delete(url: any) {
    return this.awaitResponse(this.requester.delete(url));
  }

  async awaitResponse(request: Promise<AxiosResponse>) {
    return await request;
  }
}

export default new RequesterClass();