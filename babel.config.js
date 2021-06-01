module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
    	  'react-native-reanimated/plugin',
      	"module-resolver",
      	{
          "root": ["./src"],
          "alias":{
            "assets" : "./assets",
            "themes" : "./core/theme",
            "config" : "./core/config",
            "helpers" : "./core/helpers",
            "screens" : "./core/screens",
            "componets" : "./core/componets",
          }
      	}
    ]
  };
};
