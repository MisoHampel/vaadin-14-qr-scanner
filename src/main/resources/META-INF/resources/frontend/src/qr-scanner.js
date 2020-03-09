import {PolymerElement,html} from '@polymer/polymer/polymer-element.js';
import '@granite-elements/granite-qrcode-scanner/granite-qrcode-scanner.js';

class QrScanner extends PolymerElement{

    static get template() {
        return html`
            <granite-qrcode-scanner on-qrcode-decoded="setDetail" active="[[active]]" debug="[[debug]]" frequency="[[frequency]]"></granite-qrcode-scanner>`;
    }

    static get is() {
        return 'qr-scanner';
    }

}
customElements.define(QrScanner.is, QrScanner);