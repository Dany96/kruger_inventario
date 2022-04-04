import { Component, OnInit, ViewChild, HostListener, Inject, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';
import { TooltipPosition } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { Location, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

@Injectable()
export class DashboardComponent implements OnInit {
  public User: any;
  public Rol: any;
  public session:any;
  public positionOptions: TooltipPosition[] = ['left'];
  public position = new FormControl(this.positionOptions[0]);


  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(
    private observer: BreakpointObserver,
    private router: Router, @Inject(DOCUMENT)
    private doc: Document
  ) { 
    this.initialsFunction();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  signOut(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigateByUrl('');
    //document.location.href = '';
  }

  redirectTo(path: any) {
    this.router.navigate(path);
  }

  async initialsFunction(){
    this.session= await JSON.parse(sessionStorage['user']);
    this.Rol=this.session.rol;
    this.User=this.session.usuario;
  }

}
