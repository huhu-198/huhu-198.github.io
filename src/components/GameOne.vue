<template>
	<div class="container">
		<div class="heading">
			<h1 class="title">2048</h1>
			<div class="scores-container">
				<div class="score-container">0</div>
				<div class="best-container">0</div>
			</div>
		</div>

		<div class="above-game">
			<p class="game-intro">
				使用方向键移动方块 <strong>用vue框架跑的2048</strong>
			</p>
			<a class="restart-button">New Game</a>
		</div>

		<div class="game-container">
			<div class="game-message">
				<p></p>
				<div class="lower">
					<a class="keep-playing-button">Keep going</a>
					<a class="retry-button">Try again</a>
				</div>
			</div>

			<div class="grid-container">
				<div class="grid-row">
					<div class="grid-cell"></div>
					<div class="grid-cell"></div>
					<div class="grid-cell"></div>
					<div class="grid-cell"></div>
				</div>
				<div class="grid-row">
					<div class="grid-cell"></div>
					<div class="grid-cell"></div>
					<div class="grid-cell"></div>
					<div class="grid-cell"></div>
				</div>
				<div class="grid-row">
					<div class="grid-cell"></div>
					<div class="grid-cell"></div>
					<div class="grid-cell"></div>
					<div class="grid-cell"></div>
				</div>
				<div class="grid-row">
					<div class="grid-cell"></div>
					<div class="grid-cell"></div>
					<div class="grid-cell"></div>
					<div class="grid-cell"></div>
				</div>
			</div>
			<div class="tile-container"></div>
		</div>
	</div>
</template>

<script>
	// import '../../oneGame-js/application';

	import { KeyboardInputManager } from '../../oneGame-js/keyboard_input_manager';
	import { HTMLActuator } from '../../oneGame-js/html_actuator.js';
	import { LocalStorageManager } from '../../oneGame-js/local_storage_manager.js';
	import { GameManager } from '../../oneGame-js/game_manager.js';

	export default {
		name: 'GameOne',
		mounted() {
			window.requestAnimationFrame(function () {
				new GameManager(
					4,
					KeyboardInputManager,
					HTMLActuator,
					LocalStorageManager
				);
			});
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
