package sk.smartbase.component.qrscanner;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("")
public class View extends Div {

    public View() {
        QrScanner qrScanner = new QrScanner(false);
        qrScanner.setFrequency(1);
        qrScanner.setActive(true);
        qrScanner.setDebug(true);
        qrScanner.setShowChangeCamera(true);
        qrScanner.setConsumer(qrCode -> {
            if (!"error decoding QR Code".equals(qrCode)) {
                System.out.println("scanned qr code: " + qrCode);
            }
        });
        add(qrScanner);
    }
}
