import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { product } from 'src/app/orderservice.service';

const product = {

}

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})
export class ProductdetailsComponent implements OnInit {
  @Input() producttable:product[]=[];
  @Output() addProductTable: EventEmitter<Partial<product>> = new EventEmitter();
  @Output() updateProductTable: EventEmitter<Partial<product>> = new EventEmitter();
  @ViewChild('productName') public productName!: ElementRef;
  @ViewChild('productPrice') public productPrice!: ElementRef;
  
  products:product[]=[];
  ProductForm!:FormGroup
  productadded=false;
  private updateBuffer: Partial<product> = {};
  constructor(private formBuilder: FormBuilder,private http: HttpClient,) { }
  numberRegEx = /\-?\d*\.?\d{1,2}/;
  ngOnInit(): void {
    this.ProductForm=this.formBuilder.group(
      {
        productName: ['', [Validators.required, Validators.maxLength(30)]],
        productPrice: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      }
    )
  }
  onSubmitProduct() {
    this.productadded=true;
    if(this.ProductForm.invalid){
      return;
    }
    else{
      const newRecord: Partial<product>={
          productname:this.productName.nativeElement.value,
          productprice:this.productPrice.nativeElement.value
      }
      this.addProductTable.emit(newRecord);
    }
  }
  enableEditMethod(data:product) {
    this.updateBuffer = { productname: data.productname, productprice: data.productprice };
    // Cancel edit mode for other rows
    this.producttable.forEach( itm => { if ( itm !== data ) { itm.isEdit = false; }});
    data.isEdit=true;
  }
  onUpdateButtonClick(data: product) {
    data.isEdit = false;
    this.updateProductTable.emit(this.updateBuffer);
  }
}
