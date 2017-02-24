import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/common/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'app',
                component: AppComponent,
                canActivate: [AppRouteGuard],
                canActivateChild: [AppRouteGuard],
                children: [
                    {
                        path: '',
                        children: [
                            { path: '', redirectTo: '/home', pathMatch: 'full' },
                            { path: 'home', component: HomeComponent }
                        ]
                    },
                    {
                        path: 'admin',
                        loadChildren: 'app/app.module#AppModule', //Lazy load admin module
                        data: { preload: true }
                    }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }