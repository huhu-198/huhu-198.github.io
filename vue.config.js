const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: true,
	publicPath: '/dist/', //静态托管用，否则是  ./
});
