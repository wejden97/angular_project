import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestionDetailsComponent } from '../suggestion-details/suggestion-details.component';
import { SuggestionListComponent } from '../suggestion-list/suggestion-list.component';
import { SuggestionFormComponent } from '../suggestion-form/suggestion-form.component';

const  routes: Routes = [
    {path:'',component:SuggestionListComponent},
    {path:'details/:id',component:SuggestionDetailsComponent},
    {path:'update/:id',component:SuggestionFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuggestionMRoutingModule { }
