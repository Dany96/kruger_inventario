import { Injectable } from '@angular/core';
import { api, environment } from '../../environments/environment'
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    url = environment._url;

    constructor(private http: HttpClient) { }

    getAllUser(token: string) {
        const head = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        });
        return this.http.get(api(this.url, '/micro_inventario/user/findAll'), { headers: head });
    }

    getUserById(id: number, token: string) {
        const head = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        });
        return this.http.get(api(this.url, '/micro_inventario/user/findById/' + id), { headers: head });
    }

    insertUser(jsonUser: any, token: string) {
        const body: any = jsonUser;
        const head = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        });
        return this.http.post(api(this.url, '/micro_inventario/user/create'), body, { headers: head });
    }
}