import {Component} from '../base/Component.ts';
import {ICatalogRender} from '../../types';

export class CatalogView extends  Component<ICatalogRender> {
    constructor(container: HTMLElement) {
        super(container);
    }

    set items(items: HTMLElement[]) {
        this.container.replaceChildren(...items);
    }
}