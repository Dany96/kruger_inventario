import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EmployeService } from 'src/app/services/employe-srv.service';
import { validationService } from 'src/app/services/validation-srv.service';
import { globalData } from '../../global/global-data';
import { DialogAlertComponent } from '../dialog-alert/dialog-alert.component';

@Component({
  selector: 'app-dialog-employe-generate',
  templateUrl: './dialog-employe-generate.component.html',
  styleUrls: ['./dialog-employe-generate.component.scss']
})
export class DialogEmployeGenerateComponent implements OnInit {
  employeForm = new FormGroup({
    datosPersonales: new FormGroup({
      cedula: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      correo: new FormControl('', [Validators.required]),
      fecha_nac: new FormControl(''),
      direccion: new FormControl(''),
      telefono: new FormControl(''),
      estado_vac: new FormControl(''),
      tipo_vac: new FormControl(''),
      fecha_vac: new FormControl(''),
      num_dosis: new FormControl(''),
      estado: new FormControl(''),
    })
  });
  constructor(
    private dialogMsg: MatDialogRef<DialogEmployeGenerateComponent>,
    private employeService: EmployeService,
    private dialog: MatDialog,
    private toastrService: ToastrService,
    private validationService: validationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit(): void {
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
  showError(msg: string, tittle: string): void {
    this.toastrService.error(msg, tittle);
  }
  showInfo(msg: string, tittle: string): void {
    this.toastrService.info(msg, tittle);
  }
  dialogClose() {
    this.data.action = '';
    this.dialogMsg.close(this.data);
  }
  async insertEmploye(forms: any) {
    try {
      this.employeService.insertEmploye(forms, sessionStorage['token']).subscribe(async (data) => {
        this.showInfo(globalData.texts.msgEmployeCreate, '');
        this.dialogMsg.close();
      },
        async (error) => {
          this.showError(globalData.texts.msgErrorInsertEmploye, '');
          console.log('error', error);
        })

    } catch (error) {
      console.log(error);
    }
  }
  async validateField(employeForm: any) {
    let form = employeForm.datosPersonales;
    const booleanMail = this.validationService.validationEmail(form.correo);
    if (form.cedula == '' || form.cedula.length < 10) {
      await this.showError(globalData.texts.msgCedulaClear, "");
    } else if (form.nombre == '') {
      await this.showError(globalData.texts.msgNombreClear, "");
    } else if (form.apellido == '') {
      await this.showError(globalData.texts.msgApellidoClear, "");
    } else if (!booleanMail || form.correo == '') {
      await this.showError(globalData.texts.msgCorreoClear, '');
    } else {
      await this.insertEmploye(form);
    }
  }
}