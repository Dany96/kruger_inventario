import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog-srv.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private catalogService: CatalogService
  ) {
    this.initialAsyncFunctions();
   }

  ngOnInit(): void {
  }

  async initialAsyncFunctions() {
    await this.getCatalog();
  }
  async getCatalog() {
    try {
        this.catalogService.getAllCatalog(sessionStorage['token']).subscribe(async (data:any) => {
          data.forEach((element:any) => {
            localStorage.setItem(element['nombre'], JSON.stringify(element['descripcion']));
          });
        },
          (error) => {
            console.log('error', error);
          });
    } catch (error) {
      console.log('error', error);
    }
  }
}
