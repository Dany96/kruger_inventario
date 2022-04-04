import { Injectable } from '@angular/core';
import { api, environment } from '../../environments/environment'
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CatalogService {
    url = environment._url;
    constructor(private http: HttpClient) { }

    getAllCatalog(token: string) {
        const head = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        });
        return this.http.get(api(this.url, '/micro_inventario/catalog/findAll'), { headers: head });
    }
}