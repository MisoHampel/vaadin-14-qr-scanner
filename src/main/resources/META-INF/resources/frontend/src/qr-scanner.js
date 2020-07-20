import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import './qr-scanner-camera-switch';

class QrScanner extends PolymerElement {

    static get template() {
        return html`      
         <my-granite-qrcode-scanner on-qrcode-decoded="onQrCodeDecoded" on-selected-device-changed="onSelectedDeviceChanged" on-devices-changed="onDevicesChanged" active="[[active]]" debug="[[debug]]" frequency="[[frequency]]" showChangeCamera="[[showChangeCamera]]" switchCameraAfterStart="[[switchCameraAfterStart]]"></my-granite-qrcode-scanner>`;
    }


    static get is() {
        return 'qr-scanner';
    }

}

customElements.define(QrScanner.is, QrScanner);