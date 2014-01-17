// Table Data
var table = require('remote_data');

// Main Window
var win = Ti.UI.createWindow({backgroundColor:"#fff"});

// Title View
var titleView = Ti.UI.createView({
	backgroundColor:"#FFCC66",
	top: 20,
	height: 20
});

// Title Label
var titleLabel = Ti.UI.createLabel({
	text: "Reddit API Data"
});

titleView.add(titleLabel);
win.add(table.data, titleView);
win.open();