package sk.smartbase.component.qrscanner;

import com.vaadin.flow.component.EventData;
import com.vaadin.flow.component.Tag;
import com.vaadin.flow.component.dependency.JsModule;
import com.vaadin.flow.component.dependency.NpmPackage;
import com.vaadin.flow.component.polymertemplate.EventHandler;
import com.vaadin.flow.component.polymertemplate.PolymerTemplate;

import java.util.function.Consumer;

/**
 * QrScanner
 *
 * @author Michal Hampel
 * @since 3/6/2020
 */
@Tag("qr-scanner")
@NpmPackage(value = "@granite-elements/granite-qrcode-scanner", version = "3.0.3")
@JsModule("./src/qr-scanner.js")
public class QrScanner extends PolymerTemplate<QrScannerModel>{

    public final static String ERROR_DECODING_QR_CODE = "error decoding QR Code";

    private String lastValue = "";
    private Consumer<String> consumer;

    public QrScanner() {
        setId("qr-scanner");
        setActive(false);
        setDebug(false);
        setFrequency(1000);
    }

    public QrScanner(Consumer<String> consumer) {
        this();
        this.consumer = consumer;
    }

    public void setConsumer(Consumer<String> consumer) {
        this.consumer = consumer;
    }

    @EventHandler
    private void setDetail(@EventData("event.detail") String detail){
        getElement().setAttribute("value", detail);
        this.lastValue =detail;
        if(consumer!=null)
            consumer.accept(detail);
    }

    /**
     * @return last scanned value
     */
    public String getLastValue() {
        return lastValue;
    }

    /**
     * If true, the element captures `frequency` images per second
     * If false, capture will be done with a button
     */
    public void setActive(boolean isActive){
        getModel().setActive(isActive);
    }

    /**
     * Number of captured images per second
     */
    public void setFrequency(Integer frequency){
        getModel().setFrequency(frequency);
    }

    /**
     * If true, send logs to the console
     */
    public void setDebug(boolean debug){
        getModel().setDebug(debug);
    }

}
