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

import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild } from '@angular/core';
import { DocumentListComponent } from 'ng2-alfresco-documentlist';
import { TagListComponent } from 'ng2-alfresco-tag';

@Component({
    selector: 'potato-component-list',
    templateUrl: './potato-components-list.component.html',
    styleUrls: ['./potato-components-list.component.scss']

})
export class PotatoComponentsListComponent implements OnInit {

    @Input()
    container: any;

    componentRef: ComponentRef<any>;

    components: any[];

    constructor(private resolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
        this.components = [
            {name: 'Tag List', type: 'TagListComponent'},
            {name: 'Document List', type: 'DocumentListComponent'},
            {name: 'Potato 3', type: 'TagListComponent'},
            {name: 'Potato 4', type: 'TagListComponent'}
        ];
    }

    createComponent(name) {
        if (name === 'TagListComponent') {
            const tagListComponent: ComponentFactory<any> = this.resolver.resolveComponentFactory(TagListComponent);
            this.componentRef = this.container.createComponent(tagListComponent);
        }

        if (name === 'DocumentListComponent') {
            const documentListComponent: ComponentFactory<any> = this.resolver.resolveComponentFactory(DocumentListComponent);
            this.componentRef = this.container.createComponent(documentListComponent);
        }
    }
}