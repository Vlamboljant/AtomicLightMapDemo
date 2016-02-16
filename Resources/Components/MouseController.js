//Mouse Controller
"atomic component";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MouseController = (function (_super) {
    __extends(MouseController, _super);
    function MouseController() {
        _super.apply(this, arguments);
        this.input = Atomic.input;
    }
    MouseController.prototype.start = function () {
        this.isWrapped = true;
        this.isMouseVisible = true;
    };
    MouseController.prototype.update = function () {
        this.updateInput();
        if (this.isWrapped) {
            this.input.setMouseMode(Atomic.MM_WRAP);
            this.input.setMouseVisible(!this.isMouseVisible);
        }
        else {
            this.input.setMouseMode(Atomic.MM_ABSOLUTE);
            this.input.setMouseVisible(this.isMouseVisible);
        }
    };
    MouseController.prototype.updateInput = function () {
        if (this.input.getKeyPress(Atomic.KEY_ESC))
            this.isWrapped = !this.isWrapped;
    };
    return MouseController;
})(Atomic.JSComponent);
module.exports = MouseController;
//# sourceMappingURL=MouseController.js.map