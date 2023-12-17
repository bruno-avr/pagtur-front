import { RequesterClass } from "../Requester/Requester";

export type AddPayment = {
  date: Date,
  value: number,
  method: 'PIX' | 'CREDIT_CARD' | 'CASH',
  referringMonth: string
}

export type Payment = {
  id: string,
  date: Date,
  value: number,
  method: 'PIX' | 'CREDIT_CARD' | 'CASH',
  referringMonth: string
}

export default class PaymentAPI {
    requester: RequesterClass;

    constructor(requester: RequesterClass) {
      this.requester = requester;
    }
  
    async addPayment(contractId: string, payment: AddPayment) {
      const response = await this.requester.post('/payment', {
        ...payment,
        contract: {
          connect: {
            id: contractId
          }
        }
      });
      if (response.status === 201) return response.data as Payment;
      throw new Error(response.data.errors);
    }

    async getData() {
      const response = await this.requester.get('/payment/data');
      if (response.status === 200) return response.data;
      throw new Error(response.data.errors);
    }
  }
