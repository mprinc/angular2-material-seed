import {View, Component} from 'angular2/core';
import {MATERIAL_DIRECTIVES} from 'ng2-material/all';
@Component({selector: 'button-basic-usage'})
@View({
  templateUrl: 'templates/basic_usage.html',
  styleUrls: ['templates/basic_usage.css'],
  directives: [MATERIAL_DIRECTIVES]
})
export class ButtonBasicUsage {
    constructor() {
        console.log('ButtonBasicUsage');
    };

    googleUrl: string = 'https://www.google.com';
    title1: string = 'Button: ' + this.isCool();
    title4: string = 'Warn';
    isDisabled: boolean = true;

    private isCool() {
        var m: string = 'is cool';
        console.log('[t] ', m);
        return m;
    };
}
