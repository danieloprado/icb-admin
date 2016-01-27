import {Component, View, OnInit} from 'angular2/core';
import {NgForm}    from 'angular2/common';


@View({
    templateUrl: "/views/app/dashboard.html"
})
@Component({
})
export class DashboardComponent implements OnInit {
    title: string;

    constructor() {
    }

    ngOnInit() {
        this.title = "dashboard";
        console.log("init dashboard");
    }
}
