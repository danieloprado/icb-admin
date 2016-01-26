declare var $: any;

import {Component, View, OnInit} from 'angular2/core';
import {NgForm}    from 'angular2/common';


@View({
    templateUrl: "/templates/dashboard"
})
@Component({
})
export class UserComponent implements OnInit {
    title: string;

    constructor() {
    }

    ngOnInit() {
        this.title = "user";
        console.log("init user");
    }
}