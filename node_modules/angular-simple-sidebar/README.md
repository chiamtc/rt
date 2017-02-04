## angular-simple-sidebar ##

With angular-simple-sidebar you will get a a very easy way to integrate a sidemenu in your AngularJS application without a lot of dependencies.
The side-menu is responsive and to use as AngularJS 1.x directive.

### Demo ###

[http://secanis.bitbucket.org/angular-simple-sidebar/index.html](http://secanis.bitbucket.org/angular-simple-sidebar/index.html)

### Bitbucket ###

[https://bitbucket.org/secanis/angular-simple-sidebar](https://bitbucket.org/secanis/angular-simple-sidebar)

### NPM ###

[![npm version](https://badge.fury.io/js/angular-simple-sidebar.svg)](https://badge.fury.io/js/angular-simple-sidebar)

[https://www.npmjs.com/package/angular-simple-sidebar](https://www.npmjs.com/package/angular-simple-sidebar)

### Installation ###

*final package:*

	npm install angular-simple-sidebar --save

*or build it yourself:*

	git clone https://bitbucket.org/secanis/angular-simple-sidebar.git
	npm install
	grunt

### Dependencies ###

- AngularJS 1.4+

If you wanna use Icons, you have to integrate Font-Awesome, Bootstrap or an other font library.

### Usage ###

1. add the `angular-simple-sidebar.js` JS file to your index.html
2. add the `angular-simple-sidebar.css` CSS file to your index.html
3. add dependency to your module `angular.module('demo', ['angular-simple-sidebar'])`

Add in your controller some data for the sidebar...

	$scope.state = true;
    $scope.menuTitle = "menu";
	$scope.settings = {
		close: true,
		closeIcon: "fa fa-times"
	};
    $scope.items = [
        {
            name: "first item",
            link: "//google.com",
            icon: "fa fa-google",
            target: "_blank"
        },
        {
            name: "second item",
            link: "",
            icon: "",
            target: ""
        }
    ];

... and integrate the directive in your HTML template:

	<angular-simple-sidebar state="state" items="items" title="menuTitle"></angular-simple-sidebar>

### CSS ###

For a better customization you are free to overwrite the existent CSS. For now I created a black theme of the sidebar.

	<link rel="stylesheet" href="angular-simple-sidebar/angular-simple-sidebar-black-theme.min.css">

When you wanna create own themes you can try it with the following css classes:

	.ass-menu-button {
	    color: #fff;
	}
	
	.ass-aside-menu {
	    background-color: #111;
	    color: #fff;
	}
	
	.ass-aside-menu-item {
	    border-bottom: 1px solid #555;
	}
	
	.ass-aside-menu-item:active, .ass-aside-menu-item:visited, .ass-aside-menu-item:link,
	.ass-aside-menu-close:active, .ass-aside-menu-close:visited, .ass-aside-menu-close:link {
	    color: #fff;
	}
	
	.ass-aside-menu-item:hover, .ass-aside-menu-close:hover {
	    color: #666;
	}
	
	.ass-aside-overlay {
	    background-color: rgba(0, 0, 0, 0.3);
	}

### Licence ###

MIT License

Copyright (c) 2016 secanis.ch

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.