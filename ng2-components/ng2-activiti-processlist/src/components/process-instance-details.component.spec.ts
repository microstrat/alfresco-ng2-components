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

import { DebugElement, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

import { ActivitiFormModule, FormService } from 'ng2-activiti-form';
import { ActivitiTaskListModule } from 'ng2-activiti-tasklist';
import { AlfrescoTranslationService, CoreModule } from 'ng2-alfresco-core';

import { ProcessInstance } from '../models/process-instance.model';
import { exampleProcess, exampleProcessNoName } from './../assets/process.model.mock';
import { TranslationMock } from './../assets/translation.service.mock';
import { ProcessService } from './../services/process.service';
import { ProcessInstanceDetailsComponent } from './process-instance-details.component';

describe('ProcessInstanceDetailsComponent', () => {

    let componentHandler: any;
    let service: ProcessService;
    let formService: FormService;
    let component: ProcessInstanceDetailsComponent;
    let fixture: ComponentFixture<ProcessInstanceDetailsComponent>;
    let getProcessSpy: jasmine.Spy;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                CoreModule,
                ActivitiFormModule,
                ActivitiTaskListModule
            ],
            declarations: [
                ProcessInstanceDetailsComponent
            ],
            providers: [
                { provide: AlfrescoTranslationService, useClass: TranslationMock },
                ProcessService
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        }).compileComponents();
    }));

    beforeEach(() => {

        fixture = TestBed.createComponent(ProcessInstanceDetailsComponent);
        component = fixture.componentInstance;
        service = fixture.debugElement.injector.get(ProcessService);
        formService = fixture.debugElement.injector.get(FormService);

        getProcessSpy = spyOn(service, 'getProcess').and.returnValue(Observable.of(exampleProcess));

        componentHandler = jasmine.createSpyObj('componentHandler', [
            'upgradeAllRegistered',
            'upgradeElement'
        ]);
        window['componentHandler'] = componentHandler;
    });

    it('should not load task details when no processInstanceId is specified', () => {
        fixture.detectChanges();
        expect(getProcessSpy).not.toHaveBeenCalled();
    });

    it('should set a placeholder message when processInstanceId not initialised', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toBe('DETAILS.MESSAGES.NONE');
    });

    it('should display a header when the processInstanceId is provided', async(() => {
        fixture.detectChanges();
        component.ngOnChanges({ 'processInstanceId': new SimpleChange(null, '123', true) });
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            let headerEl: DebugElement = fixture.debugElement.query(By.css('.mat-card-title '));
            expect(headerEl).not.toBeNull();
            expect(headerEl.nativeElement.innerText).toBe('Process 123');
        });
    }));

    it('should display default details when the process instance has no name', async(() => {
        getProcessSpy = getProcessSpy.and.returnValue(Observable.of(exampleProcessNoName));
        fixture.detectChanges();
        component.ngOnChanges({ 'processInstanceId': new SimpleChange(null, '123', true) });
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            let headerEl: DebugElement = fixture.debugElement.query(By.css('.mat-card-title '));
            expect(headerEl).not.toBeNull();
            expect(headerEl.nativeElement.innerText).toBe('My Process - Nov 10, 2016, 3:37:30 AM');
        });
    }));

    describe('change detection', () => {

        let change = new SimpleChange('123', '456', true);
        let nullChange = new SimpleChange('123', null, true);

        beforeEach(async(() => {
            component.processInstanceId = '123';
            fixture.detectChanges();
            component.tasksList = jasmine.createSpyObj('tasksList', ['load']);
            fixture.whenStable().then(() => {
                getProcessSpy.calls.reset();
            });
        }));

        it('should fetch new process details when processInstanceId changed', () => {
            component.ngOnChanges({ 'processInstanceId': change });
            expect(getProcessSpy).toHaveBeenCalledWith('456');
        });

        it('should NOT fetch new process details when empty changeset made', () => {
            component.ngOnChanges({});
            expect(getProcessSpy).not.toHaveBeenCalled();
        });

        it('should NOT fetch new process details when processInstanceId changed to null', () => {
            component.ngOnChanges({ 'processInstanceId': nullChange });
            expect(getProcessSpy).not.toHaveBeenCalled();
        });

        it('should set a placeholder message when processInstanceId changed to null', () => {
            component.ngOnChanges({ 'processInstanceId': nullChange });
            fixture.detectChanges();
            expect(fixture.nativeElement.innerText).toBe('DETAILS.MESSAGES.NONE');
        });

        it('should display cancel button if process is running', () => {
            component.processInstanceDetails = new ProcessInstance({
                ended : null
            });
            fixture.detectChanges();
            let buttonEl = fixture.debugElement.query(By.css('[data-automation-id="header-status"] button'));
            expect(buttonEl).not.toBeNull();
        });
    });

});
