import { Button } from './button'

if (!window.customElements.get('ui-button')) {
  window.customElements.define('ui-button', Button)
}
