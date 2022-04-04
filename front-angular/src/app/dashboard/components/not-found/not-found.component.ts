import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  public canvas:any;
  public ctx:any;
  public imgData:any;
  public pix:any;
  public WIDTH:any;
  public HEIGHT:any;
  public flickerInterval:any;

  constructor() { }

  ngOnInit(): void {
    this.init();
  }

   init() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.WIDTH = 700;
    this.canvas.height = this.HEIGHT = 500;
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, this.WIDTH, this.HEIGHT);
    this.ctx.fill();
    this.imgData = this.ctx.getImageData(0, 0, this.WIDTH, this.HEIGHT);
    this.pix = this.imgData.data;
    this.flickerInterval = setInterval(this.flickering, 30);
};

 flickering() {
  for (var i = 0; i < this.pix.length; i += 4) {
      var color = (Math.random() * 255) + 50;
      this.pix[i] = color;
      this.pix[i + 1] = color;
      this.pix[i + 2] = color;
  }
  this.ctx.putImageData(this.imgData, 0, 0);
};

}
