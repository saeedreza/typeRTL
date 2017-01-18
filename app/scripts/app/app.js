var app = angular.module('typertlApp', []);
app.run(function($rootScope){
	$rootScope.$on('fonts:update', function(e, fonts){
		$rootScope.hrefFonts = fonts;
	})
});
