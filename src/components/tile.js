// 设置方块状态
function Tile(position, value) {
	this.x = position.x; //行
	this.y = position.y; //列
	this.value = value || 2;

	this.previousPosition = null;
	this.mergedFrom = null; // Tracks tiles that merged together  合并后的元素
}

Tile.prototype.savePosition = function () {
	//保存之前的位置
	this.previousPosition = { x: this.x, y: this.y };
};

Tile.prototype.updatePosition = function (position) {
	//更新后的位置
	this.x = position.x;
	this.y = position.y;
};

Tile.prototype.serialize = function () {
	return {
		position: {
			x: this.x,
			y: this.y,
		},
		value: this.value,
	};
};

export { Tile };
