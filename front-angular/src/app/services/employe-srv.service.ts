import { Injectable } from '@angular/core';
import { api, environment } from '../../environments/environment'
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class EmployeService {
    url = environment._url;

    constructor(private http: HttpClient) { }

    getAllEmploye(token: string) {
        const head = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        });
        return this.http.get(api(this.url, '/micro_inventario/employe/findAll'), { headers: head });
    }

    getEmployeById(idEmploye: number, token: string) {
        const head = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        });
        return this.http.get(api(this.url, '/micro_inventario/employe/findById/' + idEmploye), { headers: head });
    }

    insertEmploye(jsonEmploye: any, token: string) {
        const body: any = jsonEmploye;
        const head = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        });
        return this.http.post(api(this.url, '/micro_inventario/employe/create'), body, { headers: head });
    }

    updateEmploye(jsonEmploye: any, token: string) {
        const body: any = jsonEmploye;
        const head = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
        });
        return this.http.post(api(this.url, '/micro_inventario/employe/update'), body, { headers: head });
    }

    deleteEmployeById(idEmploye: number, token: string) {
        const head = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        });
        return this.http.get(api(this.url, '/micro_inventario/employe/delete/' + idEmploye), { headers: head });
    }
}