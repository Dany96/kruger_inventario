import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeService } from 'src/app/services/employe-srv.service';
import { Md5 } from 'ts-md5';
import { globalData } from '../../global/global-data';

@Component({
  selector: 'app-dialog-user-generate',
  templateUrl: './dialog-user-generate.component.html',
  styleUrls: ['./dialog-user-generate.component.scss']
})
export class DialogUserGenerateComponent implements OnInit {
  public idEmploye = 0;
  public usuario = '';
  public newpassword = '';
  public confirmpassword = '';

  usuerFormControl = new FormControl('', [Validators.required]);
  newpasswordFormControl = new FormControl('', [Validators.required]);
  confirmpasswordFormControl = new FormControl('', [Validators.required]);

  constructor(
    private dialogMsg: MatDialogRef<DialogUserGenerateComponent>,
    private employeService: EmployeService,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.initialFunctions(this.data);
  }
  ngOnInit(): void {
  }
  showError(msg: string, tittle: string): void {
    this.toastrService.error(msg, tittle);
  }
  viewPass() {
    let tipo: any;
    let tipo1: any;
    tipo = document.getElementById('newpass');
    tipo1 = document.getElementById('inputCPass');
    const activeView = document.getElementById('iconBtn');
    if (tipo.type == 'password') {
      tipo.type = 'text';
      activeView?.classList.add('icon-viewP')
    } else {
      tipo.type = 'password';
      activeView?.classList.remove('icon-viewP')
    }
    tipo1 = document.getElementById('inputCPass');
    if (tipo1.type == 'password') {
      tipo1.type = 'text';
      activeView?.classList.add('icon-viewP')
    } else {
      tipo1.type = 'password';
      activeView?.classList.remove('icon-viewP')
    }
  }
  dialogClose(): void {
    this.data.action = '';
    this.dialogMsg.close(this.data);
  }
  dialogSave(): void {
    switch (this.data.process) {
      case 'insert':
        this.data.action = 'insert';
        this.data.datos = { idEmploye:this.idEmploye, idRol:2, usuario:this.usuario, password: Md5.hashStr(this.newpassword) }
        break;
    }
    this.dialogMsg.close(this.data);
  }
  async initialFunctions(data: any) {
    this.idEmploye=data.employeId;
    await this.getEmployeId(this.idEmploye);
  }
  async getEmployeId(id: number) {
    try {
      this.employeService.getEmployeById(id, sessionStorage['token']).subscribe(async (data) => {
        await this.generateNameUser(data);
      },
        async (error) => {
          console.log('error', error);
        })

    } catch (error) {
      console.log(error);
    }
  }
  async generateNameUser(user: any) {
    let name = user.nombre.substring(0, 1);
    let apellido = user.apellido.split(' ')[0];
    this.usuario = name + apellido;
  }
  async validateField() {
    if (this.usuario == '' || this.usuario.length < 5) {
      this.showError(globalData.texts.msgUserClear, "");
    } else if (this.newpassword == '') {
      this.showError(globalData.texts.msgPasswordClear, "");
    } else if (this.confirmpassword == '') {
      this.showError(globalData.texts.msgConfirmPasswordClear, "");
    } else if (this.newpassword != this.confirmpassword) {
      this.showError(globalData.texts.msgErrorPassword, '');
    } else {
      this.dialogSave();
    }
  }
}