import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {RouterModule} from "@angular/router";
import {HOME_ROUTES} from "./home.routing";
import {SidebarModule} from "primeng/sidebar";
import {ButtonModule} from "primeng/button";
import {ToolbarModule} from "primeng/toolbar";
import {CardModule} from "primeng/card";
import {ToastModule} from "primeng/toast";
import {CookieService} from "ngx-cookie-service";
import {MessageService} from "primeng/api";


@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		CommonModule, RouterModule.forChild(HOME_ROUTES), SidebarModule, ButtonModule, ToolbarModule, CardModule, ToastModule
	],
	providers: [CookieService, MessageService]
})
export class HomeModule {
}
