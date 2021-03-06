/**
 * 画图工具
 */
(function() {
	/**
	 * 画笔
	 */
	var Pen = function(context) {
			this.context = context;
			this.canvasWidth = context.canvas.width;
			this.canvasHeight = context.canvas.height;
			this.activeDrawing = false;
			this.points = [];
		};

	Pen.prototype = {
		mousedown: function(evt) {
			this.activeDrawing = true;
			this.points.push([evt._x, evt._y]);
		},
		mousemove: function(evt) {
			if (!this.activeDrawing) {
				return;
			}

			this.points.push([evt._x, evt._y]);
			this.render();
		},
		mouseup: function(evt) {
			if (this.activeDrawing) {
				this.activeDrawing = false;
				this.points.push([evt._x, evt._y]);
				this.render();
				this.points = [];
			}
		},
		applySettings: function() {
			// TODO:
		},
		render: function() {
			var context = this.context;
			context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
			context.beginPath();
			context.moveTo(this.points[0][0], this.points[0][1]);
			this.points.slice(1).forEach(function(point) {
				context.lineTo(point[0], point[1]);
			});
			context.stroke();
			context.closePath();
		}
	};

	/**
	 * 矩形
	 */
	var Rect = function(context) {
			this.context = context;
			this.canvasWidth = context.canvas.width;
			this.canvasHeight = context.canvas.height;
			this.activeDrawing = false;
		};

	Rect.prototype = {
		mousedown: function(evt) {
			this.activeDrawing = true;
			this.x0 = evt._x;
			this.y0 = evt._y;
		},
		mousemove: function(evt) {
			if (!this.activeDrawing) {
				return;
			}

			var x = Math.min(evt._x, this.x0),
				y = Math.min(evt._y, this.y0),
				w = Math.abs(evt._x - this.x0),
				h = Math.abs(evt._y - this.y0);
			this.clear();
			if (!w || !h) {
				return;
			}
			this.context.strokeRect(x, y, w, h);
		},
		mouseup: function(evt) {
			if (this.activeDrawing) {
				this.activeDrawing = false;
			}
		},
		clear: function() {
			this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
		},
		applySettings: function() {
			// TODO:
		}
	};

	/**
	 * 橡皮
	 */
	var Eraser = function(context) {
			this.context = context;
			this.canvasWidth = context.canvas.width;
			this.canvasHeight = context.canvas.height;
			this.activeDrawing = false;
		};

	Eraser.prototype = {
		mousedown: function(evt) {
			this.activeDrawing = true;
			this.context.save();
			this.context.strokeStyle = "white";
			this.context.lineWidth = 5;
			this.context.beginPath();
			this.context.moveTo(evt._x, evt._y);
		},
		mousemove: function(evt) {
			if (!this.activeDrawing) {
				return;
			}

			this.context.lineTo(evt._x, evt._y);
			this.context.stroke();
		},
		mouseup: function(evt) {
			if (this.activeDrawing) {
				this.activeDrawing = false;
				this.context.lineTo(evt._x, evt._y);
				this.context.stroke();
				this.context.closePath();
				this.context.restore();
			}
		},
		applySettings: function() {
			// TODO:
		}
	};

	window.Pen = Pen;
	window.Rect = Rect;
	window.Eraser = Eraser;
})()
