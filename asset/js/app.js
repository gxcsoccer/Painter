/**
 * 画图板
 * @author XIAOCHEN GAO
 */
(function() {

	var App = {
		init: function() {
			// create canvas
			this.canvas = document.getElementById("canvas");
			this.canvasT = document.getElementById("canvas_tmp");
			this.context = this.canvas.getContext("2d");
			this.contextT = this.canvasT.getContext("2d");
			var pen = new Pen(this.context),
				rect = new Rect(this.context),
				eraser = new Eraser(this.contextT);

			this.tools = [pen, rect, eraser];

			this.context.lineWidth = 5;
			this.context.lineCap = "round";
			this.context.lineJoin = "round";

			this.currentTool = pen;

			this.canvas.addEventListener("mousedown", this, false);
			this.canvas.addEventListener("mousemove", this, false);
			this.canvas.addEventListener("mouseup", this, false);
		},
		handleEvent: function(evt) {
			var x, y;

			// Get the mouse position relative to the canvas element.
			if (evt.layerX || evt.layerX == 0) { // Firefox
				x = evt.layerX;
				y = evt.layerY;
			} else if (evt.offsetX || evt.offsetX == 0) { // Opera
				x = evt.offsetX;
				y = evt.offsetY;
			}

			this.currentTool && this.currentTool[evt.type]({
				_x: x,
				_y: y
			});

			if (evt.type == "mouseup") {
				this.contextT.drawImage(canvas, 0, 0);
				this.context.clearRect(0, 0, canvas.width, canvas.height);
			}
		},
		pickTool: function(index) {
			this.currentTool = this.tools[index];
		},
		clear: function() {
			this.contextT.clearRect(0, 0, 800, 400);
		}
	};

	window.onload = function() {
		document.getElementById("pen").onclick = function() {
			App.pickTool(0);
		};

		document.getElementById("rect").onclick = function() {
			App.pickTool(1);
		};

		document.getElementById("eraser").onclick = function() {
			App.pickTool(2);
		};

		document.getElementById("clear").onclick = function() {
			App.clear();
		};

		App.init();
	};
})();