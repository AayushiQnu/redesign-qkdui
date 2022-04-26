import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-logfilter',
  templateUrl: './logfilter.component.html',
  styleUrls: ['./logfilter.component.scss'],
})
export class LogfilterComponent implements OnInit {

  constructor(
  	private popCtrl: PopoverController
  	) { }

  ngOnInit() {}

  dismiss() {
  	this.popCtrl.dismiss(34);
  }

}
