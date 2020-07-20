import {html} from 'lit-element';
import '@granite-elements/granite-qrcode-scanner/granite-qrcode-scanner.js';

const GraniteQrcodeScanner = customElements.get('granite-qrcode-scanner');


class MyGraniteQrcodeScanner extends GraniteQrcodeScanner {

    switchCamera() {
        this.shadowRoot.getElementById('mediaDevices').selectNextDevice()
    }

    firstUpdated(changedProps) {
        this.canchange=true;
    }
    updated(changedProperties) {
        if(this.canchange){
            changedProperties.forEach((oldValue, propName) => {
                if(propName == 'device'){
                    if (this.switchcameraafterstart) {
                        this.switchCamera()
                    }
                    this.canchange = false;
                }
            });
        }
    }

    static get properties() {
        return {
            ...GraniteQrcodeScanner.properties,
            showchangecamera: {
                type: Boolean,
            },
            switchcameraafterstart: {
                type: Boolean,
            },
            canchange: {
                type: Boolean,
            },
        }
    }

    render() {
        return html`
        <style>
          :host {
            display: block;
          }

          [hide] {
            display: none !important;
          }

          #videoWindow {
            position: relative;
          }
          #videoWindow #buttonRow {
            position: absolute;
            bottom: 1em;
            left: 0;
            right: 0;
            display: flex;
            flex-flow: row nowrap;
            justify-content: center;

          }
          #videoWindow #targetSquare {
            position: absolute;
            left: 5em;
            right: 5em;
            top: 4em;
            bottom: 6em;
            border: solid 5px rgba(200,200,200,0.5);
          }

          .media {
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
          }
        </style>

        <div class="media">
          <app-media-devices
              id="mediaDevices"
              @devices-changed="${this._onDevicesChanged}"
              @selected-device-changed="${this._onSelectedDeviceChanged}"
              kind="videoinput"></app-media-devices>

          <app-media-stream
              .video-device="${this.device}"
              .videoDevice="${this.device}"
              video-constraints=
                '{"width": {"ideal": 480}, "height": {"ideal": 480},}'
              @active-changed="${this._onActiveChanged}"
              @stream-changed="${this._onStreamChanged}"
              active></app-media-stream>

          <div id="videoWindow">

            <app-media-video
                id="video"
                .source="${this.stream}"
                @click="${this.record}"
                autoplay
                muted></app-media-video>

            <div id="targetSquare"></div>

            <mwc-ripple 
                id="ripple" 
                noink>
            </mwc-ripple>            

            ${
            !this.active && this.showchangecamera ?
                html`
              <div id="buttonRow">
                  <mwc-fab
                      icon="photo_camera" 
                      @click="${this._takePhoto}"></mwc-fab>
                      
                  <mwc-fab style="margin-left: 1em"
                      icon="switch_camera" 
                      @click="${this.switchCamera}"></mwc-fab>
               </div>
              ` :
                !this.active ?
                    html`
              <div id="buttonRow">
                  <mwc-fab 
                      icon="photo_camera" 
                      @click="${this._takePhoto}"></mwc-fab>
                      
                </div>
              ` :
                    this.showchangecamera ?
                        html`
              <div id="buttonRow">
                  <mwc-fab style="margin-left: 1em"
                      icon="switch_camera" 
                      @click="${this.switchCamera}"></mwc-fab>
                      
                </div>
              ` : ``
        }

          </div>


          <granite-app-media-periodic-image-capture
              id="imageCapture"
              .capture="${this.active}"
              .frequency="${this.frequency}"
              .fill-light-mode="${this.fillLightMode}"
              .stream="${this.stream}"
              focus-mode="single-shot"
              image-width="480"
              image-height="480"
              @last-photo-changed="${this._onLastPhotoChanged}"
              debug="${this.debug}"></granite-app-media-periodic-image-capture>


          <granite-qrcode-decoder
              .blob="${this.photo}" 
              @qrcode-decoded="${this._onQrcodeDecoded}"></granite-qrcode-decoder>

          ${
            this.data ?
                html`<div> Last decoded data: ${this.data}</div>`
                : ``
        }
        </div>
    `;
    }
}

customElements.define('my-granite-qrcode-scanner', MyGraniteQrcodeScanner);