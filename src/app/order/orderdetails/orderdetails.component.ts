import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { order, product, shippingStatusList } from 'src/app/orderservice.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss']
})
export class OrderdetailsComponent implements OnInit {
  @Input() producttable:product[]=[];
  @Input() shipStatus:shippingStatusList[]=[];
  @Output() addRecord: EventEmitter<Partial<order>> = new EventEmitter();
  @Output() updateProduct: EventEmitter<Partial<product>> = new EventEmitter();
  @Output() addProduct: EventEmitter<Partial<product>> = new EventEmitter();
  @ViewChild('orderDate') public orderDate!: ElementRef;
  @ViewChild('orderStatus') public orderStatus!: ElementRef;
  @ViewChild('shippingName') public shippingName!: ElementRef;
  @ViewChild('shippingContact') public shippingContact!: ElementRef;
  @ViewChild('shippingAddress') public shippingAddress!: ElementRef;

  
  public getOrder:order[]=[];

  model: any;
  title = 'OrderForm';

  ​
  constructor(private http: HttpClient,private formBuilder: FormBuilder) {}

  registerForm!: FormGroup;
  submitted = false;

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      orderDate: ['', Validators.required],
      orderStatus: ['', Validators.required],
      shippingName: ['', [Validators.required, Validators.maxLength(30)]],
      shippingContact: ['', [Validators.required, Validators.pattern('^[+][0-9]{2}-[0-9]{3}-[0-9]{3}-[0-9]{3}$')]],
      shippingAddress: ['', Validators.required],
    });

  }
 
  onSubmitOrder() {

    this.submitted = true;
 
    // stop the process here if form is invalid
    if (this.registerForm.invalid) {
      return;
    } 
    else
    {
   
         // Gather data from input box, select or any other component
    const newRecord: Partial<order> = {
      orderdate: this.orderDate.nativeElement.value,
      orderstatus: this.shipStatus[this.orderStatus.nativeElement.selectedIndex].value,
      shppingName: this.shippingName.nativeElement.value,
      shippingContact:this.shippingContact.nativeElement.value,
      shippingAddress:this.shippingAddress.nativeElement.value,
      product:this.producttable
    }
    
    // Raise 
    this.addRecord.emit(newRecord);
    }
    alert('SUCCESS!!');
  }
  addProductTable(data:Partial<product>) {
    this.addProduct.emit(data);
  }
  updateProductTable(data:Partial<product>){
    this.updateProduct.emit(data);
  }
}
