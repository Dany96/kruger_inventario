import { Component, OnInit, ViewChild, Input, HostListener } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogAlertComponent } from 'src/app/general/shared/dialog-alert/dialog-alert.component';
import { MatDialog } from '@angular/material/dialog';
import { globalData } from 'src/app/general/global/global-data';
import moment from 'moment';
import { DialogSpinnerComponent } from 'src/app/general/shared/dialog-spinner/dialog-spinner.component';
import { EmployeService } from 'src/app/services/employe-srv.service';
import { DialogEmployeGenerateComponent } from 'src/app/general/shared/dialog-employe-generate/dialog-employe-generate.component';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user-srv.service';
import { DialogUserGenerateComponent } from 'src/app/general/shared/dialog-user-generate/dialog-user-generate.component';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.scss']
})
export class EmployeComponent implements OnInit {
  users: any;
  rol: string;
  provinciaCat: any;
  public access: boolean;
  public estadoVac: any = '';
  public tipoVac: any = '';
  public header:any=[];  
  public arrayEmploye:any=[];

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  })

  @Input() forms: any;
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(
    private employeService: EmployeService,
    private userService: UserService,
    private toastrService: ToastrService,
    private dialog: MatDialog) {
    this.access = false;
    this.rol = '';
    this.initialAsyncFunctions();
  }
  ngOnInit() {
  }
  applyFilterSource(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  sortData(sort: MatSort) {
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
  openDialogSpinner(msg: string): void {
    var tittle = '';
    tittle = msg;
    this.dialog.open(DialogSpinnerComponent, {
      disableClose: true,
      width: '300px',
      height: '250px',
      data: {
        tittle,
        action: ''
      }
    });
  }
  closeDialogSpinner(): void {
    this.dialog.closeAll();
  }
  openDialogEmploye(): void {
    const titleDlg = 'Nuevo Empleado';
    const dialogRef = this.dialog.open(DialogEmployeGenerateComponent, {
      width: '460px',
      disableClose: true,
      data: {
        button: 'Agregar',
        titleDlg,
        action: 'insert',
        process: 'insert',
      }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result !== undefined && result.action !== '') {
        switch (result.action) {
          case 'insert':
            break;
        }
      }
    });
  }
  openDialogUser(employeId: any): void {
    const titleDlg = 'Nuevo Usuario';
    const dialogRef = this.dialog.open(DialogUserGenerateComponent, {
      width: '350px',
      disableClose: true,
      data: {
        button: 'Agregar',
        titleDlg,
        employeId,
        action: 'insert',
        process: 'insert',
      }
    });
    dialogRef.afterClosed().subscribe(async result => {
      if (result !== undefined && result.action !== '') {
        switch (result.action) {
          case 'insert':
            await this.insertUser(result.datos);
            break;
        }
      }
    });
  }
  showError(msg: string, tittle: string): void {
    this.toastrService.error(msg, tittle);
  }
  showInfo(msg: string, tittle: string): void {
    this.toastrService.info(msg, tittle);
  }
  SortArray(x:any, y:any) {
    if (x.ID < y.ID) { return -1; }
    if (x.ID > y.ID) { return 1; }
    return 0;
  }
  async applyFilter() {
    var fechas = this.range.value;
    if (fechas.start == null && fechas.end == null) {
      this.showError(globalData.texts.msgDateClear, '');
    } else {
      const data = this.arrayEmploye.filter((data:any) => {
        const strDate = new Date(data['fechaVac']);   
        return (strDate >= fechas.start && strDate < fechas.end)
       });
       let employe = await this.generateTable(data);
       this.displayedColumns = this.header;
       this.dataSource = new MatTableDataSource<any>(employe.sort(this.SortArray));
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort; 
    }
  }
  async initialAsyncFunctions() {
    this.estadoVac = await JSON.parse(localStorage['estadoVacunacion']);
    this.tipoVac = await JSON.parse(localStorage['tipoVacunacion']);
    await this.getAllEmploye();
  }
  async getAllEmploye() {
    this.openDialogSpinner('');
    try {
      this.employeService.getAllEmploye(sessionStorage['token']).subscribe(async (data) => {
        this.arrayEmploye = data;
        let employe = await this.generateTable(data);
        this.displayedColumns = this.header;
        this.dataSource = new MatTableDataSource<any>(employe.sort(this.SortArray));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.closeDialogSpinner();
      },
        async (error) => {
          console.log('error', error);
          this.closeDialogSpinner();
        })

    } catch (error) {
      console.log(error);
    }
  }
  async generateTable(arrayEmploye: any) {
    let dataSource: any = [];
    let modelSource = {};
    arrayEmploye.forEach((element: any) => {
      let fecha_nac = '';
      let fecha_vac = '';
      let estado_vac: any = '';
      let tipo_vac: any = '';
      if (element.fechaNac != undefined) {
        fecha_nac = moment(element.fechaNac).format('DD/MM/YYYY');
      }
      if (element.fechaVac != undefined) {
        fecha_vac = moment(element.fechaVac).format('DD/MM/YYYY');
      }
      if (element.estadoVac != undefined) {
        estado_vac = this.estadoVac.estadoVac.find((e: any) => e.id == element.estadoVac);
      }
      if (element.tipoVac != undefined) {
        tipo_vac = this.tipoVac.tipoVac.find((e: any) => e.id == element.tipoVac);
      }
      modelSource = {
        ID: element.id,
        CÉDULA: element.cedula,
        NOMBRE: element.nombre,
        APELLIDO: element.apellido,
        TELÉFONO: element.telefono,
        CORREO: element.correo,
        DIRECCIÓN: element.direccion,
        FECHA_NAC: fecha_nac,
        ESTADO_VACUNACIÓN: estado_vac.value,
        TIPO_VACUNA: tipo_vac.value,
        NUM_DOSIS: element.numDosis,
        FECHA_VACUNACIÓN: fecha_vac,
        OPCIÓN: ''
      }
      dataSource.push(modelSource);
    });
     this.header=  ['ID', 'CÉDULA', 'NOMBRE', 'APELLIDO', 'TELÉFONO', 'CORREO', 'DIRECCIÓN', 'FECHA_NAC',
        'ESTADO_VACUNACIÓN', 'TIPO_VACUNA', 'NUM_DOSIS', 'FECHA_VACUNACIÓN', 'OPCIÓN']     
    return dataSource;
  }
  async insertUser(forms: any) {
    try {
      this.userService.insertUser(forms, sessionStorage['token']).subscribe(async (data) => {
        this.showInfo(globalData.texts.msgUserCreate, '');
        window.location.reload();
      },
        async (error) => {
          this.showError(globalData.texts.msgErrorInsertUser, '');
          console.log('error', error);
        })

    } catch (error) {
      console.log(error);
    }
  }
}