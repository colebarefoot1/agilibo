import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http'; 
import { RouterModule } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './components/counter/counter.component';
import { AppConfig } from '../AppConfig';
import { RegisterComponent } from './components/account/register.component';
import { SigninComponent } from './components/account/signin.component';
import { BusinessLineComponent } from './components/Setup/businessLine.component';
import { DepartmentComponent } from './components/Setup/department.component';
import { MethodologyComponent } from './components/Setup/methodology.component';
import { WorkTypeComponent } from './components/Setup/workType.component';
import { EmploymentTypeComponent } from './components/Setup/employmentType.component';
import { MenuComponent } from './components/Setup/menuHeader.component';
import { SubMenuComponent } from './components/Setup/submenu.component';
import { ScrumRoleComponent } from './components/Setup/scrumRole.component';
import { ScrumDevelopmentRoleComponent } from './components/Setup/scrumdevrole.component';
import { ManageTeamComponent } from './components/scrumTeam/manageteam.component';
import { ScrumMemberComponent } from './components/scrummembers/scrummember.component';
import { AlertService } from './services/alert.service';
import { UserService } from './services/user.service';
import { AuthenticationService } from './services/authentication.service';
import { BusinessLineService } from './services/setup/businessLine.service';
import { DepartmentService } from './services/setup/department.service';
import { MethodologyService } from './services/setup/methodology.service';
import { WorkTypeService } from './services/setup/workType.service';
import { MenuHeaderService } from './services/setup/menuHeader.service';
import { EmploymentTypeService } from './services/setup/employmentType.service';
import { ScrumTeamService } from './services/scrumTeam/scrumTeam.service';
import { PockerComponent } from './components/playpocker/playpocker.component';
import { ScrumTeamComponent } from './components/scrumTeam/scrumteam.component';
import { MenuDetailService } from './services/setup/menuDetail.service';
import { ScrumRoleService } from './services/setup/scrumRole.service';
import { ScrumDevelopmentRoleService } from './services/setup/scrumDevelopmentRole.service';
import { ScrumTeamMemberService } from './services/scrumTeam/scrumTeamMember.service';
import { TeamManageComponent } from './components/scrumTeam/teammanage.component';
import { AddExisitingUserComponent } from './components/scrummembers/addexisting.component';
import { AgiliboComponent } from './components/home/agilibo.component';
import { EstimateSettingForPlanningPokerService } from './services/estimateSettingPlanningPoker/estimateSettingPlanningPoker.service';
import { PokerPointSettingComponent } from './components/pokerpointsetting/pokerpointsetting.component';
import { ClientCompanyComponent } from './components/clientcompany/clientcompany.component';
import { ClientCompanyService } from './services/clientcompany.service/clientcompany.service';
import { SprintComponent } from './components/sprint/sprint.component';
import { SprintService } from './services/sprint/sprint.service';
import { SprintDurationService } from './services/sprintDuration/sprintDuration.service';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { UserProfileService } from './services/userprofile/userprofile.service';
import { ViewTeamComponent } from './components/kpi/velocityChart/viewteam.component';
import { VelocityKpiComponent } from './components/kpi/velocityChart/velocitykpi.component';
import { VelocityProgressService } from './services/kpi/velocityprogress/velocityprogress.service';
import { CountryService } from './services/country.service/country.service';
import { CountryComponent } from './components/country/country.component';
import { AlertComponent } from './components/alert/alert.component';
import { CrossTeamDependencyComponent } from './components/crossTeam/crossTeamDependency.component';
import { CrossTeamDependencyService } from './services/crossTeamDependency/crossTeamDependency.service';
import { DependencyGridComponent } from './components/crossTeam/dependencyGrid.component';
import { ExternalDependencyService } from './services/crossTeamDependency/external.service';
import { FeedsComponent } from './components/feeds/feeds.component';
import { NavigationService } from './services/naviagtion/navigation.service';
import { PagevisitorComponent } from './components/pageVisitor/pagevisitor.component';
import { CompanyUnitComponent } from './components/companyunit/companyunit.component';
import { CompanyUnitService } from './services/companyunit.service/companyunit.service';
import { AccessRoleService } from './services/accessRole/accessRole.service';
import { UserRoleListComponent } from './components/accessrole/userRoleList.component';
import { EditRoleComponent } from './components/accessrole/editRole.component';
import { AccessRoleComponent } from './components/accessrole/accessRole.component';
import { AssignAccessComponent } from './components/accessrole/assignAccess.component';
import { AssignAccessRoleService } from './services/accessRole/assignAccess.service';
import { PolicyComponent } from './components/policy/policy.component';
import { CompanyUnitSetupComponent } from './components/companyunitsetup/companyunitsetup.component';
import { CompanyUnitSetupService } from './services/companyunitsetup/companyunitsetup.service';
import { DependencyVerticalPipe, DependencyHorizontalPipe } from './filters/dependencyFilter.pipe';
import { RerouteToSignin } from './services/rerouteToSignin';
import { PasswordResetComponent } from './components/passwordreset/passwordreset.component';
import { PasswordResetService } from './services/passwordreset/passwordreset.service';
import { ForgotPasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { ForgotPasswordService } from './services/forgotpassword/forgotPassword.service';
import { ForgotPasswordEmailComponent } from './components/forgotpassword/forgotpasswordmail.component';
import { ForgotPasswordResetComponent } from './components/forgotpassword/forgotpasswordreset.component';
import { ForgotPasswordSuccessComponent } from './components/forgotpassword/forgotpasswordresetsuccess.component';

import { PokerComponent } from './components/poker/poker.component';
import { SprintSettingComponent } from './components/sprintSetting/sprintSetting.component';
import { TeamComponent } from './components/team/team.component';
import { KudoCardComponent } from './components/kudocard/kudocard.component';
import { KudoCardsListPage } from './components/kudocard/kudocardlist.component';
import { KudoCardService } from './services/kudocard.service/kudocard.service';
import { InviteMemberComponent } from './components/invitemember/invitemember.component';
import { HappinessDoorComponent } from './components/happinessdoor/happinessdoor.component';
import { HappinessDoorPostComponent } from './components/happinessdoor/happinessdoorpost.component';
import { HappinessDoorService } from './services/happinessDoor.service/happinessdoor.service';
import { PagerService } from './services/pagerservice';
import { KudoCardBoxComponent } from './components/kudocard/kudocardbox.component';
import { SubMenuMultiComponent } from './components/Setup/submenuMulti.component';
import { FormService } from './services/setup/form.service';
import { FormsUnderFixedHeaderComponent } from './components/Setup/fromsUnderFixedMenu.component';
import { FormsUnderSubHeaderComponent } from './components/Setup/formsUnderSubMenu.component';


@NgModule({
    declarations: [       
        AppComponent,
        AlertComponent,
        NavMenuComponent,
        CounterComponent,
        HomeComponent,
        RegisterComponent,
        SigninComponent,
        BusinessLineComponent,
        DepartmentComponent,
        MethodologyComponent,
        WorkTypeComponent,
        EmploymentTypeComponent,
        ScrumTeamComponent,
        PockerComponent,
        MenuComponent,
        SubMenuComponent,
        ScrumRoleComponent,
        ScrumDevelopmentRoleComponent,
        ManageTeamComponent,
        ScrumMemberComponent,
        TeamManageComponent,
        AddExisitingUserComponent,
        AgiliboComponent,
        PokerPointSettingComponent,
        ClientCompanyComponent,
        SprintComponent,
        UserprofileComponent,
        ViewTeamComponent,
        VelocityKpiComponent,
        CountryComponent,
        CrossTeamDependencyComponent,
        DependencyGridComponent,
        FeedsComponent,
        PagevisitorComponent,
        AccessRoleComponent,
        CompanyUnitComponent,
        UserRoleListComponent,
        EditRoleComponent,
        AssignAccessComponent,
        PolicyComponent,
        CompanyUnitSetupComponent,
        DependencyVerticalPipe,
        DependencyHorizontalPipe,
        PasswordResetComponent,
        ForgotPasswordComponent,
        ForgotPasswordEmailComponent,
        ForgotPasswordResetComponent,
        ForgotPasswordSuccessComponent,
        PokerComponent,
        SprintSettingComponent,
        TeamComponent,
        KudoCardComponent,
        KudoCardsListPage,
        InviteMemberComponent,
        HappinessDoorComponent,
        HappinessDoorPostComponent,
        KudoCardBoxComponent,
        SubMenuMultiComponent,
        FormsUnderFixedHeaderComponent,
        FormsUnderSubHeaderComponent
    ],
    imports: [      
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'agilibo', pathMatch: 'full' },          
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'agilibo', component: AgiliboComponent },
            { path: 'scrumrole', component: ScrumRoleComponent },
            { path: 'teammanage', component: TeamManageComponent },
            { path: 'scrumdevrole', component: ScrumDevelopmentRoleComponent },
            { path: 'formsUnderFixedMenu', component: FormsUnderFixedHeaderComponent },
            { path: 'formsUnderSubMenu', component: FormsUnderSubHeaderComponent },
            { path: 'addexisting/:id', component: AddExisitingUserComponent },
            { path: 'manageTeam/:id', component: ManageTeamComponent },
            { path: 'addscrummember/:id', component: ScrumMemberComponent },
            { path: 'menu', component: MenuComponent },
            { path: 'submenu', component: SubMenuComponent },
            { path: 'submenuMulti', component: SubMenuMultiComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'scrumteam', component: ScrumTeamComponent },
            { path: 'department', component: DepartmentComponent },
            { path: 'workTypeSetup', component: WorkTypeComponent },
            { path: 'employmentTypeSetup', component: EmploymentTypeComponent },
            { path: 'methodologySetup', component: MethodologyComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'signin', component: SigninComponent },
            { path: 'businessLineSetup', component: BusinessLineComponent },
            { path: 'planningpocker/:id/:teamname', component: PockerComponent },
            { path: 'planningpokerpointsetting/:id/:teamname', component: PokerPointSettingComponent },
            { path: 'clientcompany', component: ClientCompanyComponent },
            { path: 'userprofile', component: UserprofileComponent },
            { path: 'sprint/:id/:teamname', component: SprintComponent },
            { path: 'velocitykpi/:id/:teamname', component: VelocityKpiComponent },
            { path: 'viewteam', component: ViewTeamComponent },
            { path: 'country', component: CountryComponent },
            { path: 'crossTeamDependency', component: CrossTeamDependencyComponent },
            { path: 'dependencyGrid', component: DependencyGridComponent },
            { path: 'feeds', component: FeedsComponent },
            { path: 'pagevisitor', component: PagevisitorComponent },
            { path: 'accessrole', component: AccessRoleComponent },
            { path: 'userrolelist', component: UserRoleListComponent },
            { path: 'editRole/:id', component: EditRoleComponent },
            { path: 'assignaccess', component: AssignAccessComponent },
            { path: 'policy', component: PolicyComponent },
            { path: 'companyunit', component: CompanyUnitComponent },          
            { path: 'companyunitsetup', component: CompanyUnitSetupComponent },
            { path: 'passwordreset', component: PasswordResetComponent },
            { path: 'forgotpassword', component: ForgotPasswordComponent },
            { path: 'forgotpasswordmail', component: ForgotPasswordEmailComponent },
            { path: 'forgotpasswordreset', component: ForgotPasswordResetComponent },
            { path: 'forgotpasswordresetsuccess', component: ForgotPasswordSuccessComponent },
            { path: 'poker', component: PokerComponent },
            { path: 'sprintsetting', component: SprintSettingComponent },
            { path: 'team', component: TeamComponent },
            { path: 'kudocard', component: KudoCardComponent },
            { path: 'kudocardlist', component: KudoCardsListPage },
            { path: 'invitemember', component: InviteMemberComponent },
            { path: 'happinessdoor', component: HappinessDoorComponent },
            { path: 'happinessdoorpost', component: HappinessDoorPostComponent },
            { path: 'kudocardbox', component: KudoCardBoxComponent }
            
        ])
    ],
    providers: [
        AppConfig,
        AlertService,
        UserService,
        AuthenticationService,
        BusinessLineService,
        DepartmentService,
        MethodologyService,
        WorkTypeService,
        EmploymentTypeService,
        ScrumTeamService,
        MenuDetailService,
        MenuHeaderService,
        ScrumRoleService,
        ScrumDevelopmentRoleService,
        ScrumTeamMemberService,
        EstimateSettingForPlanningPokerService,
        ClientCompanyService,
        SprintService,
        SprintDurationService,
        UserProfileService,
        VelocityProgressService,
        CountryService,
        VelocityProgressService,
        NavMenuComponent,
        AlertComponent,
        CrossTeamDependencyService,
        ExternalDependencyService,
        NavigationService,
        CompanyUnitService,
        AccessRoleService,
        AssignAccessRoleService,
        CompanyUnitSetupService,
        RerouteToSignin,
        PasswordResetService,
        ForgotPasswordService,
        AppComponent,
        KudoCardService,
        HappinessDoorService,
        PagerService,
        FormService
    ],
  
})
export class AppModuleShared {
}
