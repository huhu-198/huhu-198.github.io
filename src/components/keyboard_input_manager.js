function KeyboardInputManager() {
	this.events = {};
	this.listen();
}

//重置或新增事件
KeyboardInputManager.prototype.on = function (event, callback) {
	if (!this.events[event]) {
		this.events[event] = [];
	}
	this.events[event].push(callback);
};

KeyboardInputManager.prototype.emit = function (event, data) {
	var callbacks = this.events[event];
	if (callbacks) {
		callbacks.forEach(function (callback) {
			callback(data);
		});
	}
};

//判断按下的方向键
KeyboardInputManager.prototype.listen = function () {
	var self = this;

	var map = {
		//采用更先进的key，而不是keycode和老掉牙的which
		// 38: 0, // Up
		// 39: 1, // Right
		// 40: 2, // Down
		// 37: 3, // Left
		// // 75: 0, // Vim up 不用支持vim
		// // 76: 1, // Vim right
		// // 74: 2, // Vim down
		// // 72: 3, // Vim left
		// 87: 0, // W
		// 68: 1, // D
		// 83: 2, // S
		// 65: 3, // A

		w: 0, // W
		d: 1, // D
		s: 2, // S
		a: 3, // A

		W: 0, // W
		D: 1, // D
		S: 2, // S
		A: 3, // A

		ArrowUp: 0, // 上
		ArrowRight: 1, // 右
		ArrowDown: 2, // 下
		ArrowLeft: 3, // 左
	};

	// Respond to direction keys  监听键盘方向键
	document.addEventListener('keydown', function (event) {
		// var modifiers = //判断是不是同时按着alt、ctrl等键， 不需要
		// 	event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;

		//var mapped = map[event.which];
		var mapped = map[event.key];

		if (mapped !== undefined) {
			//属于方向按键
			event.preventDefault();
			self.emit('move', mapped);
		}

		// R key restarts the game    按R重新开始游戏
		if (event.key === 'r' || event.key === 'R') {
			self.restart.call(self, event);
		}

		// if (!modifiers && event.which === 82) {
		// 	self.restart.call(self, event);
		// }
	});

	// Respond to button presses 绑定按钮事件
	this.bindButtonPress('.retry-button', this.restart); //重新开始 New Game 按钮
	this.bindButtonPress('.restart-button', this.restart); //重新开始 Try again 按钮
	this.bindButtonPress('.keep-playing-button', this.keepPlaying); //继续游戏 Keep going 按钮（达到2048游戏胜利后展示）

	// // Respond to swipe events  滑动事件，适配手机，先不管
	// var touchStartClientX, touchStartClientY;
	// var gameContainer = document.getElementsByClassName('game-container')[0];

	// gameContainer.addEventListener(this.eventTouchstart, function (event) {
	// 	if (
	// 		(!window.navigator.msPointerEnabled && event.touches.length > 1) ||
	// 		event.targetTouches.length > 1
	// 	) {
	// 		return; // Ignore if touching with more than 1 finger
	// 	}

	// 	if (window.navigator.msPointerEnabled) {
	// 		touchStartClientX = event.pageX;
	// 		touchStartClientY = event.pageY;
	// 	} else {
	// 		touchStartClientX = event.touches[0].clientX;
	// 		touchStartClientY = event.touches[0].clientY;
	// 	}

	// 	event.preventDefault();
	// });

	// gameContainer.addEventListener(this.eventTouchmove, function (event) {
	// 	event.preventDefault();
	// });

	// gameContainer.addEventListener(this.eventTouchend, function (event) {
	// 	if (
	// 		(!window.navigator.msPointerEnabled && event.touches.length > 0) ||
	// 		event.targetTouches.length > 0
	// 	) {
	// 		return; // Ignore if still touching with one or more fingers
	// 	}

	// 	var touchEndClientX, touchEndClientY;

	// 	if (window.navigator.msPointerEnabled) {
	// 		touchEndClientX = event.pageX;
	// 		touchEndClientY = event.pageY;
	// 	} else {
	// 		touchEndClientX = event.changedTouches[0].clientX;
	// 		touchEndClientY = event.changedTouches[0].clientY;
	// 	}

	// 	var dx = touchEndClientX - touchStartClientX;
	// 	var absDx = Math.abs(dx);

	// 	var dy = touchEndClientY - touchStartClientY;
	// 	var absDy = Math.abs(dy);

	// 	if (Math.max(absDx, absDy) > 10) {
	// 		// (right : left) : (down : up)
	// 		self.emit('move', absDx > absDy ? (dx > 0 ? 1 : 3) : dy > 0 ? 2 : 0);
	// 	}
	// });
};

// 重新开始
KeyboardInputManager.prototype.restart = function (event) {
	event.preventDefault();
	this.emit('restart');
};

// 继续游戏
KeyboardInputManager.prototype.keepPlaying = function (event) {
	event.preventDefault();
	this.emit('keepPlaying');
};

// 选择某个元素，绑定按钮按下事件（封装函数）
KeyboardInputManager.prototype.bindButtonPress = function (selector, fn) {
	var button = document.querySelector(selector);
	button.addEventListener('click', fn.bind(this));
	//滑动事件
	//button.addEventListener(this.eventTouchend, fn.bind(this));
};

export { KeyboardInputManager };
