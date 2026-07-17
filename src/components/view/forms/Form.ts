import {Component} from '../../base/Component.ts';
import {IFormRender} from '../../../types';
import {ensureElement} from '../../../utils/utils.ts';

export class Form extends Component<IFormRender> {
    private errorElement: HTMLElement;
    private submitButton: HTMLButtonElement;

    constructor(container: HTMLElement) {
        super(container);
        this.errorElement = ensureElement<HTMLElement>('.form__errors', this.container);
        this.submitButton = ensureElement<HTMLButtonElement>('.button[type="submit"]', this.container);
    }

    set error(msg: string) {
        this.errorElement.textContent = msg;
    }

    set buttonIsDisabled(isDisabled: boolean) {
        this.submitButton.disabled = isDisabled;
    }
}