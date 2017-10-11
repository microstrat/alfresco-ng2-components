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

import { OverlayContainer } from '@angular/cdk/overlay';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { Component, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MdMenuTrigger } from '@angular/material';
import { Subscription } from 'rxjs/Rx';
import { ContextMenuService } from './context-menu.service';

@Component({
    selector: 'adf-context-menu-holder, context-menu-holder',
    template: `
        <button md-button [mdMenuTriggerFor]="contextMenu"></button>
        <md-menu #contextMenu="mdMenu" class="context-menu">
            <button
                *ngFor="let link of links"
                md-menu-item
                (click)="onMenuItemClick($event, link)"
                [attr.disabled]="link.model?.disabled || undefined">
                <md-icon *ngIf="showIcons && link.model?.icon">
                    {{ link.model?.icon }}
                </md-icon>
                    {{link.title || link.model?.title}}
            </button>
        </md-menu>
    `
})
export class ContextMenuHolderComponent implements OnInit, OnDestroy {
    links = [];

    private mouseLocation: { left: number, top: number } = {left: 0, top: 0};
    private menuElement = null;
    private openSubscription: Subscription;
    private closeSubscription: Subscription;
    private contextSubscription: Subscription;

    @Input() showIcons: boolean = false;
    @ViewChild(MdMenuTrigger) menuTrigger: MdMenuTrigger;

    @HostListener('contextmenu', ['$event'])
    onShowContextMenu(event?: MouseEvent) {
        if (event) {
            event.preventDefault();
        }
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        if (this.mdMenuElement) {
            this.setPosition();
        }
    }

    constructor(
            private viewport: ViewportRuler,
            private overlayContainer: OverlayContainer,
            private contextMenuService: ContextMenuService
    ) {}

    ngOnInit() {
        this.contextSubscription = this.contextMenuService.show.subscribe(e => this.showMenu(e.event, e.obj));
        this.openSubscription = this.menuTrigger.onMenuOpen.subscribe(() => this.menuElement = this.getContextMenuElement());
        this.closeSubscription = this.menuTrigger.onMenuClose.subscribe(() => this.menuElement = null);
    }

    ngOnDestroy() {
        this.contextSubscription.unsubscribe();
        this.openSubscription.unsubscribe();
        this.closeSubscription.unsubscribe();
    }

    onMenuItemClick(event: Event, menuItem: any): void {
        if (menuItem && menuItem.model && menuItem.model.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
            return;
        }
        menuItem.subject.next(menuItem);
    }

    showMenu(e, links) {
        this.links = links;

        if (e) {
            this.mouseLocation = {
                left: e.clientX,
                top: e.clientY
            };
        }

        this.menuTrigger.openMenu();

        if (this.mdMenuElement) {
            this.setPosition();
        }
    }

    get mdMenuElement() {
        return this.menuElement;
    }

    private locationCss() {
        return {
            left: this.mouseLocation.left + 'px',
            top: this.mouseLocation.top + 'px'
        };
    }

    private setPosition() {
        if (this.mdMenuElement.clientWidth + this.mouseLocation.left > this.viewport.getViewportRect().width) {
            this.menuTrigger.menu.xPosition = 'before';
            this.mdMenuElement.parentElement.style.left = this.mouseLocation.left - this.mdMenuElement.clientWidth + 'px';
        } else {
            this.menuTrigger.menu.xPosition = 'after';
            this.mdMenuElement.parentElement.style.left = this.locationCss().left;
        }

        if (this.mdMenuElement.clientHeight + this.mouseLocation.top > this.viewport.getViewportRect().height) {
            this.menuTrigger.menu.yPosition = 'above';
            this.mdMenuElement.parentElement.style.top = this.mouseLocation.top - this.mdMenuElement.clientHeight + 'px';
        } else {
            this.menuTrigger.menu.yPosition = 'below';
            this.mdMenuElement.parentElement.style.top = this.locationCss().top;
        }
    }

    private getContextMenuElement() {
        return this.overlayContainer.getContainerElement().querySelector('.context-menu');
    }
}
