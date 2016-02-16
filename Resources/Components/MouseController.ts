//Mouse Controller
"atomic component"

class MouseController extends Atomic.JSComponent {

    input = Atomic.input;

    isWrapped: boolean;
    isMouseVisible: boolean;

    start() {
        this.isWrapped = true;
        this.isMouseVisible = true;
    }

    update() {
        this.updateInput();

        if (this.isWrapped) {
            this.input.setMouseMode(Atomic.MM_WRAP);
            this.input.setMouseVisible(!this.isMouseVisible);
        } else {
            this.input.setMouseMode(Atomic.MM_ABSOLUTE);
            this.input.setMouseVisible(this.isMouseVisible);
        }
    }

    updateInput() {
        if (this.input.getKeyPress(Atomic.KEY_ESC))
            this.isWrapped = !this.isWrapped;
    }
}
export = MouseController;