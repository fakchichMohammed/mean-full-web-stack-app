import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { PostCreateComponent } from "./pages/posts/post-create/post-create.component";
import { PostListComponent } from "./pages/posts/post-list/post-list.component";

const routes: Routes = [
    {path: '', component: PostListComponent},
    {path: 'create', component: PostCreateComponent},
    {path: 'edit/:postId', component: PostCreateComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}