import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { globalData } from 'src/app/general/global/global-data';
import { EmployeService } from 'src/app/services/employe-srv.service';
import { validationService } from 'src/app/services/validation-srv.service';

export interface employeProfile {
  id: number,
  cedula: string,
  nombre: string,
  apellido: string,
  correo: string,
  fechaNac: string,
  direccion: string,
  telefono: string,
  estadoVac: number,
  tipoVac: number,
  fechaVac: string,
  numDosis: number,
  estado: number
}
@Component({
  selector: 'app-profile-employe',
  templateUrl: './profile-employe.component.html',
  styleUrls: ['./profile-employe.component.scss']
})
export class ProfileEmployeComponent implements OnInit {
  public employeProfile: employeProfile = {
    id: 0,
    cedula: '',
    nombre: '',
    apellido: '',
    correo: '',
    fechaNac: '',
    direccion: '',
    telefono: '',
    estadoVac: 0,
    tipoVac: 0,
    fechaVac: '',
    numDosis: 0,
    estado: 0
  };
  public estadoV: any = '';
  public tipoVac: any = '';
  constructor(
    private employeService: EmployeService,
    private toastrService: ToastrService,
    private validationService: validationService
  ) {
    this.initialFunction();
  }
  ngOnInit(): void {
  }
  showError(msg: string, tittle: string): void {
    this.toastrService.error(msg, tittle);
  }
  showInfo(msg: string, tittle: string): void {
    this.toastrService.info(msg, tittle);
  }
  async initialFunction() {
    this.estadoV = await JSON.parse(localStorage['estadoVacunacion']);
    this.tipoVac = await JSON.parse(localStorage['tipoVacunacion']);
    let user = await JSON.parse(sessionStorage['user']);
    await this.getEmployeId(user.idEmploye);
  }
  async getEmployeId(id: number) {
    try {
      this.employeService.getEmployeById(id, sessionStorage['token']).subscribe(async (data: any) => {
        //console.log(data);
        await this.setData(data);
      },
        async (error) => {
          console.log('error', error);
        })

    } catch (error) {
      console.log(error);
    }
  }
  async setData(user:any){
    if (user.estadoVac==undefined) {
      this.employeProfile.id = user.id;
    this.employeProfile.cedula = user.cedula;
    this.employeProfile.nombre = user.nombre;
    this.employeProfile.apellido = user.apellido;
    this.employeProfile.correo = user.correo;
    this.employeProfile.direccion = user.direccion;
    this.employeProfile.telefono = user.telefono;
    this.employeProfile.estado = user.estado;
    } else {
      this.employeProfile=user;
      this.employeProfile.fechaNac= moment(this.employeProfile.fechaNac).add(1, 'd').format('YYYY-MM-DD');
      this.employeProfile.fechaVac= moment(this.employeProfile.fechaVac).add(1, 'd').format('YYYY-MM-DD');
    }
  }
  async updateEmploye(employe: any) {
    try {
      this.employeService.updateEmploye(employe, sessionStorage['token']).subscribe(async (data: any) => {
        this.showInfo(globalData.texts.msgEmployeUpdate, '');
        window.location.reload();
      },
        async (error) => {
          this.showError(globalData.texts.msgErrorUpdateEmploye, '');
          console.log('error', error);
        })

    } catch (error) {
      console.log(error);
    }
  }
  async validateField() {
    let booleanMail = await this.validationService.validationEmail(this.employeProfile.correo);
    if (this.employeProfile.cedula == '') {
      await this.showError(globalData.texts.msgCedulaClear, '');
    } else if (this.employeProfile.nombre == '') {
      await this.showError(globalData.texts.msgNombreClear, '');
    } else if (this.employeProfile.apellido == '') {
      await this.showError(globalData.texts.msgApellidoClear, '');
    } else if (this.employeProfile.fechaNac == '') {
      await this.showError(globalData.texts.msgFechaNacClear, '');
    } else if (this.employeProfile.telefono == '' || this.employeProfile.telefono.length < 10) {
      await this.showError(globalData.texts.msgTelefonoClear, '');
    } else if (this.employeProfile.correo == '') {
      await this.showError(globalData.texts.msgCorreoClear, '');
    } else if (!booleanMail) {
      await this.showError(globalData.texts.msgCorreoError, '');
    } else if (this.employeProfile.direccion == '') {
      await this.showError(globalData.texts.msgDireccionClear, '');
    } else if (this.employeProfile.estadoVac == 0) {
      await this.showError(globalData.texts.msgEstadoVacClear, '');
    } else if (this.employeProfile.estadoVac == 1 && this.employeProfile.tipoVac == 0) {
      await this.showError(globalData.texts.msgTipoVacClear, '');
    } else if (this.employeProfile.estadoVac == 1 && this.employeProfile.fechaVac == '') {
      await this.showError(globalData.texts.msgFechaVacClear, '');
    } else if (this.employeProfile.estadoVac == 1 && this.employeProfile.numDosis == 0) {
      await this.showError(globalData.texts.msgDosisVacClear, '');
    } else {
      await this.updateEmploye(this.employeProfile);
    }
  }
}