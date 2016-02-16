//HUD
"atomic component";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HUD = (function (_super) {
    __extends(HUD, _super);
    function HUD() {
        _super.apply(this, arguments);
        this.view = new Atomic.UIView();
        this.layoutBottom = new Atomic.UILayout();
        this.layoutTop = new Atomic.UILayout();
        this.fd = new Atomic.UIFontDescription();
        this.txtField = new Atomic.UITextField();
        this.txtInstruction = new Atomic.UITextField();
        this.input = Atomic.input;
        this.cameraName = "";
        this.instructions = "";
        this.FPSCam = false;
        this.FreeCam = true;
    }
    HUD.prototype.start = function () {
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
    };
    HUD.prototype.update = function (timeStep) {
        this.txtInstruction.setText(this.instructions);
        this.updateCamera();
        this.updateCameraName(this.txtField);
    };
    HUD.prototype.createTextFieldBottom = function (UITextField) {
        UITextField.setFontDescription(this.fd);
        this.layoutBottom.addChild(UITextField);
    };
    HUD.prototype.createTextFieldTop = function (UITextField) {
        UITextField.setFontDescription(this.fd);
        this.layoutTop.addChild(UITextField);
    };
    HUD.prototype.updateCamera = function () {
        if (this.input.getKeyPress(Atomic.KEY_F)) {
            this.FreeCam = !this.FreeCam;
            this.FPSCam = !this.FPSCam;
            this.instructions = "'F' to switch camera. 'Esc' to toggle mouse wrap.";
        }
    };
    HUD.prototype.updateCameraName = function (UITextField) {
        if (this.FreeCam) {
            this.cameraName = "Free Camera";
            UITextField.setText("CAMERA MODE: " + this.cameraName);
        }
        if (this.FPSCam) {
            this.cameraName = "First Person Camera";
            UITextField.setText("CAMERA MODE: " + this.cameraName);
        }
    };
    return HUD;
})(Atomic.JSComponent);
module.exports = HUD;
//# sourceMappingURL=HUD.js.map