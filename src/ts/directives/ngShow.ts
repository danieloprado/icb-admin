
import {Directive, ViewContainerRef, TemplateRef} from 'angular2/core';


@Directive({
    selector: '[ngShow]',
    inputs: ['ngShow: ngShow']
})
export class NgShow {
    private _element: any;

    constructor(private _viewContainer: ViewContainerRef) {
    }

    set ngShow(newValue) {
        if (newValue) {
            this._viewContainer.element.nativeElement.style.display = 'block';
            return;
        }

        this._viewContainer.element.nativeElement.style.display = 'none';
    }
}