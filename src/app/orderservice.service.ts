import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface order {
  id: number;
  orderdate: string;
  orderstatus: string;
  shppingName:string;
  shippingContact:string;
  shippingAddress:string;
  product:product[];
}
export interface product {
  productid:number;
  productname:string;
  productprice:number;
  isEdit:boolean;
}

export interface shippingStatusList {
  value:string;
}
@Injectable({
  providedIn: 'root'
})
export class OrderserviceService {

  
  constructor(private http: HttpClient) { }

  // public getOrder(): Observable<order> {
  //   return this.http.get<order>(`/api/orders`);
  // }

  // public postOrder(body: order[]): Observable<Record<string, any>> {
  //   return this.http.post(`/api/orders`, body);
  // }
}
