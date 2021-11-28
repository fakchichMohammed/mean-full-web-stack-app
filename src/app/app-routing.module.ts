import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { AuthGuard } from "./apis/guard/auth-guard";
import { LoginComponent } from "./pages/auth/login/login.component";
import { SignupComponent } from "./pages/auth/signup/signup.component";
import { PostCreateComponent } from "./pages/posts/post-create/post-create.component";
import { PostListComponent } from "./pages/posts/post-list/post-list.component";

const routes: Routes = [
    {path: '', component: PostListComponent},
    {path: 'create', component: PostCreateComponent, canActivate: [AuthGuard]},
    {path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})

export class AppRoutingModule {

}