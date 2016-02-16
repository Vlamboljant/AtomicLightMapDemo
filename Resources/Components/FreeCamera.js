//Free Camera
"atomic component";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FreeCamera = (function (_super) {
    __extends(FreeCamera, _super);
    function FreeCamera() {
        _super.apply(this, arguments);
        this.node = this.node;
        this.renderer = Atomic.renderer;
        this.cameraNode = Atomic.node;
        this.input = Atomic.input;
        this.yaw = 0;
        this.pitch = 0;
        this.moveForward = false;
        this.moveBackward = false;
        this.moveLeft = false;
        this.moveRight = false;
        this.isRunning = false;
        this.mouseMoveX = 0.0;
        this.mouseMoveY = 0.0;
        this.isFreeCamActive = true; //Need to be true to start with FPSCamera
    }
    FreeCamera.prototype.start = function () {
        var camera = this.node.getComponent("Camera");
    };
    FreeCamera.prototype.update = function (timeStep) {
        var camera = this.node.getComponent("Camera");
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
    };
    FreeCamera.prototype.updateInput = function () {
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
    };
    FreeCamera.prototype.moveCamera = function (timeStep) {
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
        }
        else {
            if (this.moveForward)
                this.cameraNode.translate([0.0, 0.0, runningSpeed]);
            if (this.moveBackward)
                this.cameraNode.translate([0.0, 0.0, -runningSpeed]);
            if (this.moveLeft)
                this.cameraNode.translate([-runningSpeed, 0.0, 0.0]);
            if (this.moveRight)
                this.cameraNode.translate([runningSpeed, 0.0, 0.0]);
        }
    };
    FreeCamera.prototype.QuatFromEuler = function (x, y, z) {
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
    };
    return FreeCamera;
})(Atomic.JSComponent);
module.exports = FreeCamera;
//# sourceMappingURL=FreeCamera.js.map