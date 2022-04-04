import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { globalData } from 'src/app/general/global/global-data';
import { DialogAlertComponent } from 'src/app/general/shared/dialog-alert/dialog-alert.component';
import { LoginService } from 'src/app/services/login-srv.service';
import { Md5 } from 'ts-md5';
import jwt from 'jwt-encode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public authForm = {
    login: '',
    password: ''
  };

  formularioData: FormGroup = new FormGroup({
    usupLogin: new FormControl('', [Validators.required]),
    usupClave: new FormControl('', [Validators.required]),
    usupRol: new FormControl('',[Validators.required]),
  });

  @HostListener('click', ['$event'])
  onClickasync = async (event: any) => {
  }

  constructor(
    public srvLogin: LoginService,
    // public srvPerson: PersonService, 
    private router: Router,
    public dialog: MatDialog) {
    this.initialFunction();
  }
  ngOnInit(): void {
    // console.log(screen.width);
    this.formularioData.setValue({
      usupLogin: '',
      usupClave: '',
      usupRol: '',
    });
  }
  initialFunction() {
    if (sessionStorage.length > 0) {
      this.router.navigateByUrl('dashboard/home');
    }
  }
  async login(form: any) {
    var mpass = form.usupClave;
    var muser = form.usupLogin;
    var mrol = form.usupRol;
    const pass = Md5.hashStr(mpass);
    await this.getUser(muser, mrol, pass);
  }
  async getUser(user: string, rol: string, pass: string) {
    try {
      await this.srvLogin.login_auto(user, rol, pass).subscribe(async (data: any) => {
        await this.loginOnline(data);
      },
        (error: any) => {
          console.log('error', error);
          if (error.status === 404) {
            this.openDialogAlert(globalData.texts.msgLoginErrUsrPass);
            this.formularioData.reset();
          } else {
            this.openDialogAlert(globalData.texts.msgLoginUnknownErr);
            this.formularioData.reset();
          }
        });
    } catch (error) {
      this.openDialogAlert(globalData.texts.msgLoginUnknownErr);
      this.formularioData.reset();
    }
  }
  async loginOnline(user: any) {
    const secret = 'secret';
    const data = {
      usuarios: [
        {
          "usuId": user.id,
          "rol": user.rol
        }
      ]
    }
    const token = jwt(data, secret);
    await this.setSessionStorage(user, token);
  }
  async setSessionStorage(user: any, token: string) {
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('token', token);
    await this.router.navigateByUrl('dashboard/home');
  }
  getErrorMessageUser() {
    return this.formularioData.get('usupLogin')?.hasError('required')
      ? 'Usuario requerido'
      : '';
  }
  getErrorMessagePass() {
    return this.formularioData.get('usupClave')?.hasError('required')
      ? 'Coontraseña requerida'
      : '';
  }
  openDialogAlert(msg: string): void {
    var titleDlg = '';
    titleDlg = msg;
    this.dialog.open(DialogAlertComponent, {
      disableClose: true,
      width: '400px',
      data: {
        titleDlg,
        action: ''
      }
    });
  }
}