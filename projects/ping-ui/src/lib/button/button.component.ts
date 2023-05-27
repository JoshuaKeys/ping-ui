import { Component, Input } from "@angular/core";

@Component({
    selector: 'lib-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class PLButtonComponent {
    @Input() content: string;
    
}