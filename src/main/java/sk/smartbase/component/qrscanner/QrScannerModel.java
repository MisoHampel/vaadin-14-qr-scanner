package sk.smartbase.component.qrscanner;

import com.vaadin.flow.templatemodel.TemplateModel;

/**
 * QrScannerModel
 *
 * @author Michal Hampel
 * @since 3/9/2020
 */
public interface QrScannerModel extends TemplateModel {

    /**
     * Number of captured images per second
     */
    void setFrequency(Integer frequency);

    /**
     * If true, the element captures `frequency` images per second
     * If false, capture will be done with a button
     */
    void setActive(boolean active);

    /**
     * If true, send logs to the console
     */
    void setDebug(boolean debug);
}
