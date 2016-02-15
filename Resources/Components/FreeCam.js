// designate component
"atomic component";

//define an inspectorFields to make variables visible in editor
var inspectorFields = {
  //needs default value to make editor understand type of that value
  speed: 1.0
}

//define a component AvatarController
exports.component = function(self) {
	
	var node = self.node;

	var renderer = Atomic.renderer;
	var input = Atomic.input;

	var yaw = 0;
	var pitch = 0;

	var moveForward = false;
	var moveBackward = false;
	var moveLeft = false;
	var moveRight = false;
	var isRunning = false;

	var mouseMoveX = 0.0;
	var mouseMoveY = 0.0;

	var isFreeCamActive = true;
	
	var camera;
	var cameraNode;


	self.start = function() {
	   camera = node.getComponent("Camera");
	   cameraNode = camera.node;
		
        input.setMouseMode(Atomic.MM_WRAP);
	}

	self.update = function(timeStep) {
	
		if (input.getKeyPress(Atomic.KEY_F)) {
			isFreeCamActive = !isFreeCamActive;
			
			if (isFreeCamActive) {
			    input.setMouseMode(Atomic.MM_WRAP);
				renderer.getViewport(0).setCamera(camera);
			}
		}	 			
    
    		if (isFreeCamActive) {
    		    updateInput();
    			moveCamera(timeStep);
    		}
    }

	function updateInput() {
		moveForward = false;
		moveBackward = false;
		moveLeft = false;
		moveRight = false;
		isRunning = false;

		if (input.getKeyDown(Atomic.KEY_W) || input.getKeyDown(Atomic.KEY_UP))
			moveForward = true;
		if (input.getKeyDown(Atomic.KEY_S) || input.getKeyDown(Atomic.KEY_DOWN))
			moveBackward = true;
		if (input.getKeyDown(Atomic.KEY_A) || input.getKeyDown(Atomic.KEY_LEFT))
			moveLeft = true;
		if (input.getKeyDown(Atomic.KEY_D) || input.getKeyDown(Atomic.KEY_RIGHT))
			moveRight = true;
		if ((input.getKeyDown(Atomic.KEY_W) || input.getKeyDown(Atomic.KEY_UP)) && input.getKeyDown(Atomic.KEY_LSHIFT))
			isRunning = true;
			
		if (input.getKeyPress(Atomic.KEY_ESC))
		    input.setMouseMode(Atomic.MM_ABSOLUTE);

		
		mouseMoveX = input.getMouseMoveX();
		mouseMoveY = input.getMouseMoveY();
	}

	function moveCamera(timestep) {
	
		var MOVE_SPEED = 10.0;
		var MOUSE_SENSITIVITY = 0.1;

		yaw = yaw + MOUSE_SENSITIVITY * mouseMoveX;
		pitch = pitch + MOUSE_SENSITIVITY * mouseMoveY;

		if (pitch < -90)
			pitch = -90;
		if (pitch > 90)
			pitch = 90;
			
		cameraNode.rotation = QuatFromEuler(pitch, yaw, 0.0);

		var speed = MOVE_SPEED * timestep;

		if (!isRunning) {
			if (moveForward)
				cameraNode.translate([0.0, 0.0, speed])
			if (moveBackward)
				cameraNode.translate([0.0, 0.0, -speed])
			if (moveLeft)
				cameraNode.translate([-speed, 0.0, 0.0])
			if (moveRight)
				cameraNode.translate([speed, 0.0, 0.0])
		} else {
			if (moveForward)
			    cameraNode.translate([0.0, 0.0, speed*2])
			if (moveLeft)
				cameraNode.translate([-speed*2, 0.0, 0.0])
			if (moveRight)
				cameraNode.translate([speed*2, 0.0, 0.0])
		}	
	}
}


function QuatFromEuler(x, y, z) {

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
