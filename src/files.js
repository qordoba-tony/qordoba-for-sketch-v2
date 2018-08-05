var fileHelper = {
	createFolderAtPath: function(context, pathString){
        var fileManager = NSFileManager.defaultManager;
    	if(fileManager.fileExistsAtPath(pathString)){
    		return true
    	} else {
    		// return [fileManager createDirectoryAtPath:pathString withIntermediateDirectories:true attributes:nil error:nil]
    		return fileManager.createDirectoryAtPath(pathString, true, null, null);
    	}
    },

    readTextFromFile: function(context,filePath){
        // var fileManager = [NSFileManager defaultManager]
        var fileManager = NSFileManager.defaultManager;
	    // if([fileManager fileExistsAtPath:filePath]) {
	    	if (fileManager.fileExistsAtPath(filePath)) {
	    	// var log = [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:nil];
	    	var log = NSString.stringWithContentsOfFile(filePath, NSUTF8StringEncoding, null);
	    	if(log){
	    		return log
	    	} 
	    	NSLog("Could not get log file data");
	    	return false
	    }
	    return false
    },

    removeFileOrFolder: function(filePath){
    	// [[NSFileManager defaultManager] removeItemAtPath:filePath error:nil];
    	NSFileManager.defaultManager.removeItemAtPath(filePath, null);
    },

	exportPageToPng: function(context, page){
		if(!context){
			NSLog("No context and text was provided for log")
			return false
		}

		if(!page){
			NSLog("No text was provided for log")
			return false
		}

		var doc = context.document;
		// var frame = [page contentBounds];
		var frame = page.contentBounds;
		// var fileName = [page name];
		var fileName = page.name;
		// var exportRequest = [MSExportRequest new]
		var exportRequest = new MSExportRequest;
		//exportRequest.rect  = frame;
		var tmpPath = NSTemporaryDirectory()
		var fileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase() + ".png"
		//just remove the file to make sure
		this.removeFile(tmpPath  + fileName,context)
		
		if(frame.size.width <= 10000 || frame.size.height <= 10000){
			exportRequest.rect  = frame;
		} else if(page.artboards().count() > 0) {
			//get the first artboards
		    var layer = page.artboards().firstObject();
		    exportRequest = MSExportRequest.exportRequestsFromExportableLayer(layer).firstObject()
		} else {
			var layers = page.containedLayers()
		    var layer = null;
		    for (var i = 0; i < layers.count(); i++) {
		        if(layers[i].isVisible() && layers[i].class() == MSLayerGroup){
		            layer = layers[i];
		            break;
		        }
		    }
		    
		    exportRequest.rect  = layer.absoluteRect();//CGRectMake(layer.absoluteRect().x, layer.absoluteRect().y, 10000,10000);
		}

		exportRequest.scale  = 1;
		if(this.createFolderAtPath(context, tmpPath)){
			var filePath= tmpPath + fileName
			doc.saveArtboardOrSlice_toFile(exportRequest, filePath)
			return filePath;
		}else{
			NSLog("Unable to create forlder at " + tmpPath  + fileName)
			return false;
		}
    },
    writeStringToFile: function(context, text, filePath){
    	var aFileHandle
		var aFile
		var t
		// t = [NSString stringWithFormat:@"%@", text],
		t = NSString.stringWithFormat("%@", text),
		// aFile = [NSString stringWithFormat:"%@", filePath]
		aFile = NSString.stringWithFormat("%@", filePath);

		// aFileHandle = [NSFileHandle fileHandleForWritingAtPath:aFile]
		aFileHandle = NSFileHandle.fileHandleForWritingAtPath(aFile);
			
		if(aFileHandle){
			// [aFileHandle truncateFileAtOffset:[aFileHandle seekToEndOfFile]]
			// [aFileHandle writeData:[t dataUsingEncoding:NSUTF8StringEncoding]]
			aFileHandle.truncateFileAtOffset(aFileHandle.seekToEndOfFile());
			aFileHandle.writeData(t.dataUsingEncoding(NSUTF8StringEncoding))
		} else {
			// [t writeToFile:aFile atomically:true encoding:NSUTF8StringEncoding error:nil]
			t.writeToFile(aFile, true, NSUTF8StringEncoding, null);
		}
    },

    generateFile: function(context,text,fileName){
		if(!context){
			if(text){
				NSLog("No context was provided for log : " + text)
			} else {
				NSLog("No context and text was provided for log")
			}

			return false
		}

		if(!text){
			NSLog("No text was provided for log")
			return false
		}

		var tmpPath = NSTemporaryDirectory()
		var fileName = fileName.replace(/[^a-z0-9]/gi, '_').toLowerCase() + ".csv"
		//just remove the file to make sure
		this.removeFile(tmpPath  + fileName,context)
		
		if(this.createFolderAtPath(context, tmpPath)){
			this.writeStringToFile(context, text, tmpPath  + fileName)
			return tmpPath + fileName
		}
    },

    getTmpDirectory: function(context){
		return NSTemporaryDirectory()
	},

	getCurrentTime: function(){
		// var DateFormatter=[[NSDateFormatter alloc] init]
		var DateFormatter = NSDateFormatter.alloc().init();
		DateFormatter.setDateFormat("yyyy-MM-dd hh:mm:ss");
		// return [DateFormatter stringFromDate:[NSDate date]]
		return DateFormatter.stringFromDate(NSDate.date)
	},
	copyFile: function(srcPath, dstPath,context){
		//just remove the file, in case it's there
		this.removeFile(dstPath,context)
		// return [[NSFileManager defaultManager] copyItemAtPath:srcPath toPath:dstPath error:nil];
		return NSFileManager.defaultManager.copyItemAtPath(srcPath, dstPath, null);
	},
	removeFile: function(filePath,context) {
		// return [[NSFileManager defaultManager] removeItemAtPath:filePath error:nil];
		return NSFileManager.defaultManager.removeItemAtPath(filePath, null);
	},
	csvToJson: function(csv){
		var str = csv;
		var regexp = /([\s\S]*?):q:q:q:q:s:([\s\S]*?):q:q:q:q:e:/gm
		//var regexp = /^([\s\S]*?):q:q:q:q:m:([\s\S]*?)$/gm;
		var jsonObj = {};
		var matches_array = str.replace(regexp, function (match, key, val) {
			//key = key.replace(/^\n/, '');
			jsonObj[key] = val;
		});
		return jsonObj;
	},
	jsonToCsv: function(json) {
		var seperator = ":q:q:q:q:s:"
		var endOfLine = ":q:q:q:q:e:"
		var str = "";
		for (var key in json) {
			if (json.hasOwnProperty(key)) {
                str += key + seperator + json[key] + endOfLine;
            }
        }
        return str;
	}
}

export default fileHelper;
