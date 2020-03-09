package sk.smartbase.component.qrscanner;

import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.router.Route;

@Route("")
public class View extends Div {

    public View() {
        QrScanner qrScanner = new QrScanner();
        qrScanner.setConsumer(qrCode ->{
            System.out.println("scanned qr code: " +qrCode);
        });
        add(qrScanner);
    }
}
