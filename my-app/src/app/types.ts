import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface Options {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    context?: HttpContext;
    observe?: 'body';
    params?: HttpParams | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    transferCache?: {
        includeHeaders?: string[];
    } | boolean;
}

export interface PageParams{
    [param: string]: string | number | boolean | readonly (string | number | boolean)[],
    page: number,
    perPage: number
}

export interface Product{
    id?:number,
    image: string,
    name: string,
    price: string,
    rating: number
}

export interface Products{
    items: Product[],
    total: number,
    page : number,
    perPage : number,
    totalPages: number,
}

