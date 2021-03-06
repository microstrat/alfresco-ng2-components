/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AnalyticsModule } from 'ng2-activiti-analytics';
import { DiagramsModule } from 'ng2-activiti-diagrams';
import { ActivitiFormModule } from 'ng2-activiti-form';
import { ActivitiProcessListModule } from 'ng2-activiti-processlist';
import { ActivitiTaskListModule } from 'ng2-activiti-tasklist';
import { AppConfigService, CoreModule, TRANSLATION_PROVIDER } from 'ng2-alfresco-core';
import { DataTableModule } from 'ng2-alfresco-datatable';
import { DocumentListModule } from 'ng2-alfresco-documentlist';
import { LoginModule } from 'ng2-alfresco-login';
import { SearchModule } from 'ng2-alfresco-search';
import { SocialModule } from 'ng2-alfresco-social';
import { TagModule } from 'ng2-alfresco-tag';
import { UploadModule } from 'ng2-alfresco-upload';
import { UserInfoModule } from 'ng2-alfresco-userinfo';
import { ViewerModule } from 'ng2-alfresco-viewer';
import { WebScriptModule } from 'ng2-alfresco-webscript';

import { FlexLayoutModule } from '@angular/flex-layout';
import { Editor3DModule } from 'ng2-3d-editor';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { routing } from './app.routes';
import { CustomEditorsModule } from './components/activiti/custom-editor/custom-editor.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { FileViewComponent } from './components/file-view/file-view.component';
import { FormListDemoComponent } from './components/form/form-list-demo.component';
import { ThemePickerModule } from './components/theme-picker/theme-picker';
import { MaterialModule } from './material.module';
import { DebugAppConfigService } from './services/debug-app-config.service';

import { CustomSourcesComponent } from './components/files/custom-sources.component';

import {
    AboutComponent,
    ActivitiAppsViewComponent,
    ActivitiDemoComponent,
    ActivitiProcessAttachmentsComponent,
    ActivitiShowDiagramComponent,
    ActivitiTaskAttachmentsComponent,
    DataTableDemoComponent,
    FilesComponent,
    FormDemoComponent,
    FormNodeViewerComponent,
    FormViewerComponent,
    HomeComponent,
    LoginDemoComponent,
    SearchBarComponent,
    SearchComponent,
    SettingsComponent,
    SocialComponent,
    TagComponent,
    WebscriptComponent
} from './components/index';

@NgModule({
    imports: [
        BrowserModule,
        routing,
        CoreModule,
        MaterialModule,
        LoginModule,
        SearchModule,
        DataTableModule,
        DocumentListModule,
        UploadModule,
        TagModule,
        SocialModule,
        WebScriptModule,
        ViewerModule,
        ActivitiFormModule,
        ActivitiTaskListModule,
        ActivitiProcessListModule,
        UserInfoModule,
        AnalyticsModule,
        DiagramsModule,
        CustomEditorsModule,
        Editor3DModule,
        ChartsModule,
        ThemePickerModule,
        FlexLayoutModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        DataTableDemoComponent,
        SearchComponent,
        SearchBarComponent,
        LoginDemoComponent,
        ActivitiDemoComponent,
        ActivitiTaskAttachmentsComponent,
        ActivitiProcessAttachmentsComponent,
        ActivitiShowDiagramComponent,
        ActivitiAppsViewComponent,
        FormViewerComponent,
        WebscriptComponent,
        TagComponent,
        SocialComponent,
        AboutComponent,
        FilesComponent,
        FormNodeViewerComponent,
        SettingsComponent,
        FormDemoComponent,
        FormListDemoComponent,
        CustomSourcesComponent,
        FileViewComponent,
        AppLayoutComponent
    ],
    providers: [
        { provide: AppConfigService, useClass: DebugAppConfigService },
        {
            provide: TRANSLATION_PROVIDER,
            multi: true,
            useValue: {
                name: 'app',
                source: 'resources'
            }
        }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
