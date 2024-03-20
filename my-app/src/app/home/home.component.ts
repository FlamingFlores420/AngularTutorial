import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { FooterComponent } from '../layout/footer/footer.component';
import { HeaderComponent } from '../layout/header/header.component';
import { ProductComponent } from '../components/product/product.component';
import { PageParams, Product } from '../types';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { Products } from '../types';
import { EditPopUpComponent } from '../components/edit-pop-up/edit-pop-up.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    ProductComponent,
    CommonModule,
    PaginatorModule,
    EditPopUpComponent,
    ButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private productsService: ProductsService) {}

  @ViewChild('paginator') paginator : Paginator | undefined

  product: Product = {
    id: 0,
    name: '',
    rating: 0,
    price: '',
    image: '',
  };
  products: Product[] = [];
  rows: number = 5;
  totalRecords: number = 0;
  displayCreate: boolean = false;
  displayEdit: boolean = false;

  resetPaginator(){
    this.paginator?.changePage(0)
  }

  toggleAddPopUp() {
    this.displayCreate = true;
  }

  toggleEditPopUp(product: Product) {
    this.displayEdit = true;
    this.selectedProduct = product;
  }


  selectedProduct: Product = {
    id: 0,
    name: '',
    rating: 0,
    price: '',
    image: '',
  };

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayCreate = false;
  }

  onConfirmEdit(product: Product) {
    if (!this.selectedProduct.id) {
      return;
    }
    this.editProduct(product, this.selectedProduct.id);
    this.displayEdit = false;
  }

  onConfirmDelete(product: Product){
    if (!product.id) {
      return;
    }
    this.deleteProduct(product.id)
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows);
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService
      .getProducts('http://localhost:3000/clothes', { page, perPage })
      .subscribe({
        next: (value: Products) => {
          this.products = value.items;
          this.totalRecords = value.total;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  addProduct(product: Product) {
    this.productsService
      .addProduct('http://localhost:3000/clothes', product)
      .subscribe({
        next: (value) => {
          console.log(value);
          this.fetchProducts(0, this.rows);
          this.resetPaginator()
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  editProduct(product: Product, id: number) {
    this.productsService
      .editProduct(`http://localhost:3000/clothes/${id}`, product)
      .subscribe({
        next: (value) => {
          console.log(value);
          this.fetchProducts(0, this.rows);
          this.resetPaginator()
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  deleteProduct(id: number) {
    this.productsService
      .deleteProduct(`http://localhost:3000/clothes/${id}`)
      .subscribe({
        next: (value) => {
          console.log(value);
          this.fetchProducts(0, this.rows);
          this.resetPaginator()
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
