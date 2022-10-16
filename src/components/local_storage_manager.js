function LocalStorageManager() {
	this.bestScoreKey = 'bestScore'; //两个localStorage元素的key
	this.gameStateKey = 'gameState';

	this.storage = window.localStorage;
}

// Best score getters/setters

//获取最高分
LocalStorageManager.prototype.getBestScore = function () {
	return this.storage.getItem(this.bestScoreKey) || 0;
};

//设置最高分
LocalStorageManager.prototype.setBestScore = function (score) {
	this.storage.setItem(this.bestScoreKey, score);
};

// Game state getters/setters and clearing
//获取游戏状态数组
LocalStorageManager.prototype.getGameState = function () {
	var stateJSON = this.storage.getItem(this.gameStateKey);
	return stateJSON ? JSON.parse(stateJSON) : null;
};

//设置游戏状态数组
LocalStorageManager.prototype.setGameState = function (gameState) {
	this.storage.setItem(this.gameStateKey, JSON.stringify(gameState));
};

//清除游戏状态数组，清零
LocalStorageManager.prototype.clearGameState = function () {
	this.storage.removeItem(this.gameStateKey);
};

export { LocalStorageManager };
