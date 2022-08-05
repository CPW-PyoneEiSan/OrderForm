import { Component } from '@angular/core';
import { max } from 'rxjs';
import { order, OrderserviceService, product, shippingStatusList } from './orderservice.service';

const shippingStatus: shippingStatusList[] = [
  {value:''},
  {value:'Pending Payment' },
  {value:'Processing' },
  {value:'Cancelled' },
  {value:'Completed' },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public shipStatus: shippingStatusList[]=shippingStatus;
  public ordertable: order[] = [];
  public producttable:product[]=[];

  constructor(private service:OrderserviceService) {}


addRecord(data: Partial<order>) {
  const maxId = Math.max(...this.ordertable.map( itm => itm.id ));
    this.ordertable.push({
      id:maxId+1,
      orderdate: data.orderdate ?? '',
      orderstatus: data.orderstatus  ?? '',
      shppingName: data.shppingName ?? '',
      shippingContact:data.shippingContact ?? '',
      shippingAddress:data.shippingAddress ?? '',
      product:this.producttable
    }
    )
    console.log(this.ordertable)
  }


  addProduct(data: Partial<product>){
    const maxId = Math.max(...this.producttable.map( itm => itm.productid ));
    this.producttable.push({
      productid:maxId+1,
      productname:data.productname ?? '',
      productprice:data.productprice ?? 0,
      isEdit:false
    })
    console.log(this.producttable);
  }

  updateProduct(data:Partial<product>){
    this.producttable=this.producttable.map(itm =>{
      if(itm.productid==data.productid)
      {
        return{...itm,...data};
      }else{
        return itm;
      }
    })
  }

}
