//HUD
"atomic component"

class HUD extends Atomic.JSComponent {

    view = new Atomic.UIView();
    layoutBottom = new Atomic.UILayout();
    layoutTop = new Atomic.UILayout();
    fd = new Atomic.UIFontDescription();
    txtField = new Atomic.UITextField();
    txtInstruction = new Atomic.UITextField();

    input = Atomic.input;

    cameraName: string = "";
    instructions: string = "";
    FPSCam: boolean = false;
    FreeCam: boolean = true;

    start() {
        this.layoutBottom.rect = this.view.rect;
        this.layoutBottom.axis = Atomic.UI_AXIS_X;
        this.layoutBottom.setLayoutPosition(Atomic.UI_LAYOUT_POSITION_LEFT_TOP);

        this.layoutTop.rect = this.view.rect;
        this.layoutTop.axis = Atomic.UI_AXIS_X;
        this.layoutTop.setLayoutPosition(Atomic.UI_LAYOUT_POSITION_RIGHT_BOTTOM);

        this.view.addChild(this.layoutBottom);
        this.view.addChild(this.layoutTop);

        this.instructions = "Press 'F' to start.";

        this.createTextFieldTop(this.txtInstruction);
        this.createTextFieldBottom(this.txtField);
        
    }

    update(timeStep: number) {
        this.txtInstruction.setText(this.instructions);
        this.updateCamera();
        this.updateCameraName(this.txtField);
    }

    createTextFieldBottom(UITextField) {
        UITextField.setFontDescription(this.fd);

        this.layoutBottom.addChild(UITextField);
    }

    createTextFieldTop(UITextField) {
        UITextField.setFontDescription(this.fd);

        this.layoutTop.addChild(UITextField);
    }

    updateCamera() {
        if (this.input.getKeyPress(Atomic.KEY_F)) {
            this.FreeCam = !this.FreeCam;
            this.FPSCam = !this.FPSCam;
            this.instructions = "'F' to switch camera. 'Esc' to toggle mouse wrap.";
        }
    }

    updateCameraName(UITextField) {
        if (this.FreeCam) {
            this.cameraName = "Free Camera";
            UITextField.setText("CAMERA MODE: " + this.cameraName);
        }

        if (this.FPSCam) {
            this.cameraName = "First Person Camera";
            UITextField.setText("CAMERA MODE: " + this.cameraName);
        }
    }
}
export = HUD;