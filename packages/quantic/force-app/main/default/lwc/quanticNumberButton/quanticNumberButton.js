import {LightningElement, api} from 'lwc';

/**
 * The `QuanticNumberButton` component is used internally to display a button in a set of buttons with numeric labels.
 * @fires CustomEvent#select
 * @category Utility
 * @example
 * <c-quantic-number-button number="1" selected onselect={select}></c-quantic-number-button>
 */
export default class QuanticNumberButton extends LightningElement {
  /**
   * The number to display as button label.
   * @api
   * @type {number}
   */
  @api number;
  /**
   * The selected number in the set of buttons.
   * @api
   * @type {number}
   */
  @api selected;

  get isPressed() {
    return `${this.selected}`;
  }

  get buttonClasses() {
    const classes = ['slds-button', 'slds-m-left__xx-small'];
    classes.push(
      this.selected ? 'slds-button_brand' : 'slds-button_outline-brand'
    );
    return classes.join(' ');
  }

  select() {
    this.dispatchEvent(new CustomEvent('select', {detail: this.number}));
  }
}
