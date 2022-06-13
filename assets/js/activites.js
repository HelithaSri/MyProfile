//featured item/img is video
//rsrc --> Resource

/**
 * @name isVideo
 * @description Fetch the JSON file and the featured item in the relevant activity is a video; Dynamically add the CODE BLOCK containing the relevant video.
 * @param {string} rsrcPath
 * @param {array} rsrcNames 
 * @param {string} filePath 
 * @param {string} filePath 
 * @param {string} fileName 
 * @param {string} title 
 * @param {int} key 
 * @param {array} tags 
 * @param {boolean} setTitle 
 */
function isVideo(rsrcPath, rsrcNames, filePath, fileName, title, currentIndex, tags, setTitle) {
    let activeTitle;
    let sourceArray = [];

    // Check title is full or half and assign it to ActiveTitle
    if (setTitle) {
        activeTitle = folder + " - " + title;
    } else {
        activeTitle = title;
    }

    // add paths to the sources
    for (const i in rsrcNames) {
        let source;
        let path = rsrcPath + rsrcNames[i];
        let fileExtention = rsrcNames[i].split(".")[1];

        if (fileExtention == "webm") {
            source = `<source src="${path}" type="video/webm"></source>`;
        } else{
            source = `<source src="${path}" type="video/mp4"></source>`;
        }
        
        sourceArray.push(source);
    }



}
