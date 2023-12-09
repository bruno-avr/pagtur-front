import { RequesterClass } from "../Requester/Requester";

export default class UserAPI {
    requester: RequesterClass;

    constructor(requester: RequesterClass) {
      this.requester = requester;
    }
  
    async getUser() {
      const response = await this.requester.get(`/user`);
      if (response.status === 200) return response.data;
      throw new Error(response.data.errors);
    }
  }
