import { Injectable } from '@angular/core';
import { api, environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = environment._url;

  constructor(private http: HttpClient) { }

  login_auto(usuario:string, rol:string, password:string) {
    const head = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    });
    return this.http.get(api(this.url, '/micro_inventario/auth/login/'+usuario+'/'+rol+'/'+password), { headers: head });
  }
}
