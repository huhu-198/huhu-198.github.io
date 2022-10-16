import { Tile } from './tile.js';

function Grid(size, previousState) {
	this.size = size;
	this.cells = previousState ? this.fromState(previousState) : this.empty(); //生成的方块来自上一个旧状态或空棋盘
}

// Build a grid of the specified size 创建一个新的空棋盘
Grid.prototype.empty = function () {
	var cells = [];

	for (var x = 0; x < this.size; x++) {
		var row = (cells[x] = []);

		for (var y = 0; y < this.size; y++) {
			row.push(null);
		}
	}

	return cells;
};

//生成的方块来自上一个状态（历史记录功能）
Grid.prototype.fromState = function (state) {
	var cells = [];

	for (var x = 0; x < this.size; x++) {
		var row = (cells[x] = []);

		for (var y = 0; y < this.size; y++) {
			var tile = state[x][y];
			row.push(tile ? new Tile(tile.position, tile.value) : null);
		}
	}

	return cells;
};

// Find the first available random position 查看是否还有空方块，入口有，返回随机的空位置
Grid.prototype.randomAvailableCell = function () {
	var cells = this.availableCells();

	if (cells.length) {
		return cells[Math.floor(Math.random() * cells.length)];
	}
};

// 返回所有空方块
Grid.prototype.availableCells = function () {
	var cells = [];

	this.eachCell(function (x, y, tile) {
		if (!tile) {
			cells.push({ x: x, y: y });
		}
	});

	return cells;
};

// Call callback for every cell 遍历方块
Grid.prototype.eachCell = function (callback) {
	for (var x = 0; x < this.size; x++) {
		for (var y = 0; y < this.size; y++) {
			callback(x, y, this.cells[x][y]);
		}
	}
};

// Check if there are any cells available
Grid.prototype.cellsAvailable = function () {
	return !!this.availableCells().length;
};

// Check if the specified cell is taken 查看方块是否为空 空：true；有内容：false
Grid.prototype.cellAvailable = function (cell) {
	return !this.cellOccupied(cell);
};

// 查看方块是否为空 空：false；有内容：true
Grid.prototype.cellOccupied = function (cell) {
	return !!this.cellContent(cell);
};

// 返回合法的方块内容
Grid.prototype.cellContent = function (cell) {
	if (this.withinBounds(cell)) {
		return this.cells[cell.x][cell.y];
	} else {
		return null;
	}
};

// Inserts a tile at its position 生成一个新方块
Grid.prototype.insertTile = function (tile) {
	this.cells[tile.x][tile.y] = tile;
};

//移除一个方块
Grid.prototype.removeTile = function (tile) {
	this.cells[tile.x][tile.y] = null;
};

//判断是否在棋盘范围内
Grid.prototype.withinBounds = function (position) {
	return (
		position.x >= 0 &&
		position.x < this.size &&
		position.y >= 0 &&
		position.y < this.size
	);
};

Grid.prototype.serialize = function () {
	var cellState = [];

	for (var x = 0; x < this.size; x++) {
		var row = (cellState[x] = []);

		for (var y = 0; y < this.size; y++) {
			row.push(this.cells[x][y] ? this.cells[x][y].serialize() : null);
		}
	}

	return {
		size: this.size,
		cells: cellState,
	};
};

export { Grid };
