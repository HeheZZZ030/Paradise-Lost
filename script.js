// Ghost class represents a ghost character with various actions and states.
class Ghost {
  // Constructor initializes the Ghost object with references to different parts of the ghost scene.
    constructor(el) {
      // The main scene element.
      this.scene = el;
      // Clone of the scene for resetting.
      this.clone = el.cloneNode(true);
      // Flags and state variables.
      this.isEscaping = false;
       // References to different elements within the ghost scene.
      this.ghost = el.querySelector('.ghost');
      this.face = el.querySelector('.ghost-face');
      this.eyes = el.querySelector('.eyes-row');
      this.leftEye = this.eyes.querySelector('.left');
      this.rightEye = this.eyes.querySelector('.right');
      this.mouth = el.querySelector('.mouth');
      this.mouthState = 'neutral';
      this.shadow = el.querySelector('.shadow-container');
      this.leftCheek = el.querySelector('.left.cheek');
      this.leftCheek = el.querySelector('.right.cheek');
      this.leftear = el.querySelector('.ear-left');
      this.rightear = el.querySelector('.right-ear');
      // Interval for random activities.
      this.activityInterval = null;
    }
    
    // Reset method recreates the ghost scene and initializes references.
    reset() {
      // Remove the current scene.
      this.scene.remove();
      // Create a new scene by cloning the original.
      this.scene = this.clone.cloneNode(true);
      // Reset references.
      this.resetRefs();
      // Set initial position.
      this.scene.classList.remove('stars-out');
      this.scene.style.position = 'absolute';
      this.scene.style.left = Math.floor(Math.random() * (document.querySelector('body').getBoundingClientRect().width - 140)) + 'px';
      this.scene.style.top = Math.floor(Math.random() * (document.querySelector('body').getBoundingClientRect().height - 160)) + 'px';
      // Add necessary classes for animation.
      this.scene.classList.add('descend');
      // Hide shadow.
      this.shadow.classList.add('disappear');
      // Append the new scene to the body.
      document.querySelector('body').append(this.scene);
      // Start the animation.
      this.enter();
    }
    
    // ResetRefs updates references after a reset.
    resetRefs() {
      // Update references to elements in the cloned scene.
      this.ghost = this.scene.querySelector('.ghost');
      this.face = this.scene.querySelector('.ghost-face');
      this.eyes = this.scene.querySelector('.eyes-row');
      this.leftEye = this.eyes.querySelector('.left');
      this.rightEye = this.eyes.querySelector('.right');
      this.mouth = this.scene.querySelector('.mouth');
      this.mouthState = 'neutral';
      this.isEscaping = false;
      this.shadow = this.scene.querySelector('.shadow-container');
      this.leftCheek = this.scene.querySelector('.left.cheek');
      this.leftCheek = this.scene.querySelector('.right.cheek');
      this.leftear = this.scene.querySelector('.ear-left');
      this.rightear = this.scene.querySelector('.right-ear');
    }

  // blink method simulates blinking of the ghost.
    blink() {
      this.leftEye.classList.add('blink');
      this.rightEye.classList.add('blink');
      setTimeout(() => {
        this.leftEye.classList.remove('blink');
        this.rightEye.classList.remove('blink');
      }, 50)
    }
    
   // wave method simulates a waving ear gesture.
    wave() {
      this.leftear.classList.add('waving');
      setTimeout(() => {
        this.leftear.classList.remove('waving');
      }, 500);
    }
    
  // State changes on hover.
    hover() {
      this.ghost.classList.add('hover');
    }
      // Surprised face animation.
    surprise() {
      this.face.classList.add('surprised');
    }
    
    // Run away state initiates escape animation.
    runAway() {
      clearInterval(this.activityInterval);
      if (!this.isEscaping) {
        this.isEscaping = true;
        this.scene.classList.add('run-away', 'move-stars-in');
        this.scene.classList.remove('stars-out');
        setTimeout(() => {
          this.shadow.classList.add('disappear');
          setTimeout(() => {
            this.reset();
          }, Math.floor(Math.random()*1000) + 500);
        }, 450);
      }
    }
    
   // Enter state initiates entrance animation.
    enter() {
      setTimeout(() => {
        this.shadow.classList.remove('disappear');
      }, 5);
      setTimeout(() => {
        this.scene.classList.remove('descend');
        this.scene.classList.add('stars-out', 'move-stars-out');
      }, 600);
      setTimeout(() => {
        this.hover();
        this.prepareEscape();
        this.startActivity();
      }, 1200)
    }
    
     // Random activities during the idle state.
    startActivity() {
      this.activityInterval = setInterval(() => {
        switch (Math.floor(Math.random()*4)) {
          case 0:
            this.blink();
            setTimeout(() => { this.blink() }, 400);
            setTimeout(() => { this.blink() }, 1300);
            break;
          case 1:
            this.wave();
            break;
          default:
            break;
        }
      }, 7000);
    }
    
    // Event listeners for initiating escape on various interactions.
    prepareEscape() {
      this.scene.addEventListener('click', () => { this.runAway() }, false);
      this.scene.addEventListener('mouseover', () => { this.runAway() }, false);
      this.scene.addEventListener('focus', () => { this.runAway() }, false);
    }
  }
  
  // Create a new Ghost object and initialize its default state and behavior.
  let ghost = new Ghost(document.querySelector('.scene-container'));

  ghost.hover();
  ghost.startActivity();
  ghost.prepareEscape();