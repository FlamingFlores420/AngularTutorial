import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { PageParams, Product, Products } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private apiService: ApiService) { }

  getProducts(url : string, params : PageParams) : Observable<Products>{
    return this.apiService.get(url, {
      params,
      responseType:'json'
    })
  }

  addProduct(url: string, product: Product): Observable<Product>{
    return this.apiService.post(url, product)
  }

  editProduct(url: string, product: Product): Observable<Product>{
    return this.apiService.put(url, product)
  }

  deleteProduct(url: string): Observable<any>{
    return this.apiService.delete(url)
  }

}
 