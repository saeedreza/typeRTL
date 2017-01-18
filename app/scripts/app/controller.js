app.controller('typertlCtrl', function($scope, $http, $timeout) {

	$scope.textAlignments = [
		{
			name: 'Center',
			value: 'center'
		},
		{
			name: 'Right',
			value: 'right'
		},
		{
			name: 'Left',
			value: 'left'
		}
	];

	$scope.tags = [{
		type : 'H1',
		value: 'h1',
		font: '',
		size: 32,
		weight: 900,
		lineHeight: 1,
		marginTop: 0,
		marginBottom: 10,
		opacity: 1,
		wordSpacing: 0,
		textAlign: 'right'
	}, {
		type : 'H2',
		value: 'h2',
		font: '',
		size: 24,
		weight: 900,
		lineHeight: 1,
		marginTop: 30,
		marginBottom: 5,
		opacity: 1,
		wordSpacing: 0,
		textAlign: 'right'
	}, {
		type : 'H3',
		value: 'h3',
		font: '',
		size: 18,
		weight: 900,
		lineHeight: 1,
		marginTop: 30,
		marginBottom: 5,
		opacity: 1,
		wordSpacing: 0,
		textAlign: 'right'
	}, {
		type : 'P',
		value: 'p',
		font: '',
		size: 17,
		weight: 400,
		lineHeight: 1.5,
		marginTop: 0,
		marginBottom: 25,
		opacity: 0.7,
		wordSpacing: -0.10,
		textAlign: 'right'
	}];

	$http.get('scripts/app/data.json').success(function(response) {
		$scope.fonts = response;
		//Set Default font for all tags and select first font on dropdown
		$scope.tags.forEach(function(tag){
			$scope.currentSelectedFont = tag.font = response[0].value
		});
	});

	$scope.fontURl = [];

	$scope.currentSelectedTag = 'h1';
	$scope.currentSelectedFont = '';
	//Set Default font value of selected h1 which is 32
	$scope.currentSelectedFontSize = $scope.tags[0].size;
	$scope.currentSelectedFontWeight = $scope.tags[0].weight;
	$scope.currentSelectedLineHeight = $scope.tags[0].lineHeight;
	$scope.currentSelectedMarginTop = $scope.tags[0].marginTop;
	$scope.currentSelectedMarginBottom = $scope.tags[0].marginBottom;
	$scope.currentSelectedOpacity = $scope.tags[0].opacity;
	$scope.currentSelectedWordSpacing = $scope.tags[0].wordSpacing;
	$scope.currentSelectedAlignment = $scope.tags[0].textAlign;

	$scope.selectTag = function(tag){
		$scope.currentSelectedTag = tag.value;
		$scope.currentSelectedFont = tag.font;
		$scope.currentSelectedFontSize = tag.size;
		$scope.currentSelectedFontWeight = tag.weight;
		$scope.currentSelectedLineHeight = tag.lineHeight;
		$scope.currentSelectedMarginTop = tag.marginTop;
		$scope.currentSelectedMarginBottom = tag.marginBottom;
		$scope.currentSelectedOpacity = tag.opacity;
		$scope.currentSelectedWordSpacing = tag.wordSpacing;
		$scope.currentSelectedAlignment = tag.textAlign;
	};

	$scope.selectFont = function(){
		var index = indexOfObject($scope.currentSelectedTag);
		$scope.tags[index].font = $scope.currentSelectedFont;

		//pick the font family value of current selected tag
		//and push it in array named($scope.fontURl) with respect to its index/order

		angular.forEach($scope.tags, function (obj, key) {
			if($scope.tags[index].value == obj.value) {
				$scope.fontURl[key] = $scope.tags[index].font;
			}
		});
		updateHrefFonts();
	};

	$scope.selectFontSize = function() {
		var index = indexOfObject($scope.currentSelectedTag);
		$scope.tags[index].size = $scope.currentSelectedFontSize;
	};

	var updateHrefFonts = function(){
		// get all used fonts from tags
		var fontsValue = $scope.tags.map(function(tag) {
			return tag.font;
		});
		// we have duplicate values and here we making them unique
		var uniqueFontsValue = fontsValue.filter(function(item, pos) {
			return fontsValue.indexOf(item) == pos;
		});

		var usedFonts = $scope.fonts.filter(function(font){
			return uniqueFontsValue.indexOf(font.value) != -1;
		});

		var usedFontsHref = usedFonts.map(function(font) {
			return font.href;
		});

		$scope.$emit('fonts:update', usedFontsHref);
	};

	var findTagWhere = function(value){
		return $scope.tags.filter(function(tag){
			return tag.value == value;
		})
	};

	var indexOfObject = function(value){
		return $scope.tags.map(function(tag) {
			return tag.value;
		}).indexOf(value)
	};

	$scope.getFont = function(value){
		return findTagWhere(value)[0].font;
	};

	$scope.getFontSize = function(value){
		return findTagWhere(value)[0].size + 'px';
	};

	$scope.selectFontWeight = function(){
		var index = indexOfObject($scope.currentSelectedTag);
		$scope.tags[index].weight = $scope.currentSelectedFontWeight;
	};

	$scope.getFontWeight = function(value){
		return findTagWhere(value)[0].weight;
	};

	$scope.selectLineHeight = function(){
		var index = indexOfObject($scope.currentSelectedTag);
		$scope.tags[index].lineHeight = $scope.currentSelectedLineHeight;
	};

	$scope.getLineHeight = function(value){
		return findTagWhere(value)[0].lineHeight;
	};

	$scope.selectMarginTop = function(){
		var index = indexOfObject($scope.currentSelectedTag);
		$scope.tags[index].marginTop = $scope.currentSelectedMarginTop;
	};

	$scope.getMarginTop = function(value){
		return findTagWhere(value)[0].marginTop + 'px';
	};

	$scope.selectMarginBottom = function(){
		var index = indexOfObject($scope.currentSelectedTag);
		$scope.tags[index].marginBottom = $scope.currentSelectedMarginBottom;
	};

	$scope.getMarginBottom = function(value){
		return findTagWhere(value)[0].marginBottom + 'px';
	};

	$scope.selectOpacity = function(){
		var index = indexOfObject($scope.currentSelectedTag);
		$scope.tags[index].opacity = $scope.currentSelectedOpacity;
	};

	$scope.getOpacity = function(value){
		return findTagWhere(value)[0].opacity;
	};

	$scope.selectWordSpacing = function(){
		var index = indexOfObject($scope.currentSelectedTag);
		$scope.tags[index].wordSpacing = $scope.currentSelectedWordSpacing;
	};

	$scope.getWordSpacing = function(value){
		return findTagWhere(value)[0].wordSpacing + 'px';
	};

	$scope.selectTextAlignment = function(){
		var index = indexOfObject($scope.currentSelectedTag);
		$scope.tags[index].textAlign = $scope.currentSelectedAlignment;
	};

	$scope.getTextAlignment = function(value){
		return findTagWhere(value)[0].textAlign;
	};


	$scope.h1 = '';
	$scope.h2 = '';
	$scope.h3 = '';
	$scope.p = '';
	$scope.isCopyStyle = false;

	$scope.resetToCopy = function(){
		//reset copy text
		$timeout(function(){
			$scope.isCopyStyle = false;
		},1500);
	};


	$scope.fontFamilyURL = [];

	$scope.getCssCode = function() {

		//get computed style of each tag and save into a variable with the same tag name

		$scope.h1 = getTagStyle('h1');
		$scope.h2 = getTagStyle('h2');
		$scope.h3 = getTagStyle('h3');
		$scope.p = getTagStyle('p');

		//add object in sequence of order in new array named($scope.fontFamilyURL)
		//e.g we have arr[0] = someObj0, arr[1] and arr[2] are undefined, arr [3] = someObj3
		//and $scope.fontFamilyURL array contain objects like arr[0] = someObj0, arr[1] = someObj3 and so on...

		angular.forEach($scope.fontURl, function (obj, key) {
			$scope.fontFamilyURL.push({url: obj + '|'});
		});

		//remove '|' character/sign from last object_value of an array named($scope.fontFamilyURL)
		//and replace the updated last index value into its orignal array

		$scope.fontFamilyURL[$scope.fontFamilyURL.length-1].url =
			$scope.fontFamilyURL[$scope.fontFamilyURL.length-1].url.slice(0, $scope.fontFamilyURL[$scope.fontFamilyURL.length-1].url.length-1);
	};

	function getTagStyle(tagName){

		//get the each css property value of tag of what we pass to parameter

		var setTagStyle = {};
		var tag = document.getElementsByTagName(tagName)[0];
		setTagStyle.fontFamily = window.getComputedStyle(tag, null).getPropertyValue('font-family');
		setTagStyle.fontSize = window.getComputedStyle(tag, null).getPropertyValue('font-size');
		setTagStyle.fontWeight = window.getComputedStyle(tag, null).getPropertyValue('font-weight');
		setTagStyle.lineHeight = window.getComputedStyle(tag, null).getPropertyValue('line-height');
		setTagStyle.marginTop = window.getComputedStyle(tag, null).getPropertyValue('margin-top');
		setTagStyle.marginBottom = window.getComputedStyle(tag, null).getPropertyValue('margin-bottom');
		setTagStyle.opacity = window.getComputedStyle(tag, null).getPropertyValue('opacity');
		setTagStyle.wordSpacing = window.getComputedStyle(tag, null).getPropertyValue('word-spacing');
		setTagStyle.textAlign = window.getComputedStyle(tag, null).getPropertyValue('text-align');

		return setTagStyle;
	}
});
