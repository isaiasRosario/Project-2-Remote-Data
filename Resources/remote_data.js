// Variables
var url = "http://api.reddit.com/";
var table = Ti.UI.createTableView({top:40,backgroundColor:"#3399FF"});
var tableData = [];
var json, reddit, i, row, authorLabel, titleLabel, thumbImg;

// HTTP Onload Function
var remoteOnload = function() {
    Ti.API.debug(this.responseText);
 
    json = JSON.parse(this.responseText);
    for (i = 0; i < json.data.children.length; i++) {
        reddit = json.data.children[i].data;
        row = Ti.UI.createTableViewRow({
            height:'85',
            hasChild: true
        });
        authorLabel = Ti.UI.createLabel({
            text: "Author: "+ reddit.author,
            font:{fontSize:15,fontWeight:'bold'},
	        height:'auto',
	        left:15,
	        bottom:5,
	        color:'#000',
	        touchEnabled:false
        });
        titleLabel = Ti.UI.createLabel({
        	text:"Title: "+ reddit.title,
	        font:{fontSize:8},
	        height:'auto',
	        left:15,
	        right:55,
	        top:10,
	        color:'#000',
	        touchEnabled:false
        });
        
        thumbImg = Ti.UI.createImageView({
        	image:reddit.thumbnail,
        	right: 5,
        	height: 40, width: 40,
        	top: 5
        });
        view = Ti.UI.createView({
        	backgroundColor:"#fff",
        	right: 0,
        	height: 50, width: 50,
        	top: 15
        	//opacity:.5
        });
 		view.add(thumbImg);
        row.add(authorLabel, titleLabel, view);
        tableData.push(row);
        }
 
    table.setData(tableData);
};

// HTTP Error Function
var remoteError = function(e) {
	    Ti.API.debug("STATUS: " + this.status);
	    Ti.API.debug("TEXT:   " + this.responseText);
	    Ti.API.debug("ERROR:  " + e.error);
	    alert('Error getting data. Try again.');
};

// XHR Remote Data Call
var xhr = Ti.Network.createHTTPClient({
    onload: remoteOnload,
    onerror: remoteError,
    timeout:5000
});
 
xhr.open("GET", url);
xhr.send();

exports.data = table;