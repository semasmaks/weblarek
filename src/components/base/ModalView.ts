import {Component} from './Component.ts';
import {IModal} from '../../types';

export class ModalView extends Component<IModal> {
    contentSection: HTMLDivElement | null;

    constructor(container: HTMLElement) {
        super(container);
        this.contentSection = container.querySelector('.modal__content');
    }

    open(): void {
        this.container.classList.add('modal_active');
    }

    close(): void {
        this.container.classList.remove('modal_active');
    }

    addElements(item: HTMLElement | HTMLElement[]): void {
        const items = Array.isArray(item) ? item : [item];
        items.forEach(el => this.contentSection?.append(el));
    }

    clear(): void {
        this.contentSection?.replaceChildren();
    }

    replaceElement(item: HTMLElement | HTMLElement[]): void {
        this.clear()
        this.addElements(item)
    }
}