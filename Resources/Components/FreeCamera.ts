//Free Camera
"atomic component"

class FreeCamera extends Atomic.JSComponent {

    node = this.node;

    renderer = Atomic.renderer;
    cameraNode = Atomic.node;
    input = Atomic.input;

    yaw: number = 0;
    pitch: number = 0;

    moveForward: boolean = false;
    moveBackward: boolean = false;
    moveLeft: boolean = false;
    moveRight: boolean = false;
    isRunning: boolean = false;

    mouseMoveX: number = 0.0;
    mouseMoveY: number = 0.0;

    isFreeCamActive: boolean = true; //Need to be true to start with FPSCamera

    start() {
        var camera = <Atomic.Camera>this.node.getComponent("Camera");
    }

    update(timeStep: number) {
        var camera = <Atomic.Camera>this.node.getComponent("Camera");
        this.cameraNode = camera.node;

        if (this.input.getKeyPress(Atomic.KEY_F)) {
            this.isFreeCamActive = !this.isFreeCamActive;

            if (this.isFreeCamActive)
                this.renderer.getViewport(0).setCamera(camera);
        }

        if (this.isFreeCamActive) {
            this.updateInput();
            this.moveCamera(timeStep);
        }
    }

    updateInput() {
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.isRunning = false;

        if (this.input.getKeyDown(Atomic.KEY_W) || this.input.getKeyDown(Atomic.KEY_UP))
            this.moveForward = true;
        if (this.input.getKeyDown(Atomic.KEY_S) || this.input.getKeyDown(Atomic.KEY_DOWN))
            this.moveBackward = true;
        if (this.input.getKeyDown(Atomic.KEY_A) || this.input.getKeyDown(Atomic.KEY_LEFT))
            this.moveLeft = true;
        if (this.input.getKeyDown(Atomic.KEY_D) || this.input.getKeyDown(Atomic.KEY_RIGHT))
            this.moveRight = true;
        if ((this.input.getKeyDown(Atomic.KEY_W) || this.input.getKeyDown(Atomic.KEY_UP)) && this.input.getKeyDown(Atomic.KEY_LSHIFT))
            this.isRunning = true;

        this.mouseMoveX = this.input.getMouseMoveX();
        this.mouseMoveY = this.input.getMouseMoveY();
    }

    moveCamera(timeStep: number) {
        var MOVE_SPEED = 10.0;
        var MOUSE_SENSITIVITY = 0.1;

        this.yaw = this.yaw + MOUSE_SENSITIVITY * this.mouseMoveX;
        this.pitch = this.pitch + MOUSE_SENSITIVITY * this.mouseMoveY;

        if (this.pitch < -90)
            this.pitch = -90;
        if (this.pitch > 90)
            this.pitch = 90;

        this.cameraNode.rotation = this.QuatFromEuler(this.pitch, this.yaw, 0.0);

        var speed = MOVE_SPEED * timeStep;
        var runningSpeed = speed * 1.8;

        if (!(this.isRunning)) {
            if (this.moveForward)
                this.cameraNode.translate([0.0, 0.0, speed]);
            if (this.moveBackward)
                this.cameraNode.translate([0.0, 0.0, -speed]);
            if (this.moveLeft)
                this.cameraNode.translate([-speed, 0.0, 0.0]);
            if (this.moveRight)
                this.cameraNode.translate([speed, 0.0, 0.0]);
        } else {
            if (this.moveForward)
                this.cameraNode.translate([0.0, 0.0, runningSpeed])
            if (this.moveBackward)
                this.cameraNode.translate([0.0, 0.0, -runningSpeed]);
            if (this.moveLeft)
                this.cameraNode.translate([-runningSpeed, 0.0, 0.0]);
            if (this.moveRight)
                this.cameraNode.translate([runningSpeed, 0.0, 0.0]);
        }
    }

    QuatFromEuler(x, y, z) {

        var M_PI = 3.14159265358979323846264338327950288;

        var q = [0, 0, 0, 0];

        // Order of rotations: Z first, then X, then Y (mimics typical FPS camera with gimbal lock at top/bottom)
        x *= (M_PI / 360);
        y *= (M_PI / 360);
        z *= (M_PI / 360);
        var sinX = Math.sin(x);
        var cosX = Math.cos(x);
        var sinY = Math.sin(y);
        var cosY = Math.cos(y);
        var sinZ = Math.sin(z);
        var cosZ = Math.cos(z);

        q[0] = cosY * cosX * cosZ + sinY * sinX * sinZ;
        q[1] = cosY * sinX * cosZ + sinY * cosX * sinZ;
        q[2] = sinY * cosX * cosZ - cosY * sinX * sinZ;
        q[3] = cosY * cosX * sinZ - sinY * sinX * cosZ;

        return q;
    }
}
export = FreeCamera;