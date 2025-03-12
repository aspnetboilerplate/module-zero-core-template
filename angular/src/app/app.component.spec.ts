import { TestBed, async } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { LayoutStoreService } from "../shared/layout/layout-store.service";
import { AppSessionService } from "../shared/session/app-session.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientJsonpModule } from "@angular/common/http";
import { HttpClientModule } from "@angular/common/http";
import { ModalModule } from "ngx-bootstrap/modal";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { NgxPaginationModule } from "ngx-pagination";
import { RouterTestingModule } from "@angular/router/testing";
import { ServiceProxyModule } from "../shared/service-proxies/service-proxy.module";
import { SharedModule } from "../shared/shared.module";
import { HomeComponent } from "../app/home/home.component";
import { AboutComponent } from "../app/about/about.component";

// layout
import { HeaderComponent } from "./layout/header.component";
import { HeaderLeftNavbarComponent } from "./layout/header-left-navbar.component";
import { HeaderLanguageMenuComponent } from "./layout/header-language-menu.component";
import { HeaderUserMenuComponent } from "./layout/header-user-menu.component";
import { FooterComponent } from "./layout/footer.component";
import { SidebarComponent } from "./layout/sidebar.component";
import { SidebarLogoComponent } from "./layout/sidebar-logo.component";
import { SidebarUserPanelComponent } from "./layout/sidebar-user-panel.component";
import { SidebarMenuComponent } from "./layout/sidebar-menu.component";

describe("AppComponent", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,

        // layout
        HeaderComponent,
        HeaderLeftNavbarComponent,
        HeaderLanguageMenuComponent,
        HeaderUserMenuComponent,
        FooterComponent,
        SidebarComponent,
        SidebarLogoComponent,
        SidebarUserPanelComponent,
        SidebarMenuComponent,
      ],
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule.forChild(),
        BsDropdownModule.forRoot(),
        CollapseModule.forRoot(),
        TabsModule.forRoot(),
        RouterTestingModule,
        ServiceProxyModule,
        SharedModule.forRoot(),
        NgxPaginationModule,
      ],
      providers: [
        LayoutStoreService,
        {
          provide: AppSessionService,
          useValue: {
            application: {
              version: "",
              releaseDate: {
                format: function () {
                  return "";
                },
              },
            },
            getShownLoginName: function(){
              return 'admin';
            }
          },
        },
      ],
    });
    TestBed.compileComponents();
  });

  it("should create the app", async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  
});
