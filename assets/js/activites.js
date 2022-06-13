//featured item/img is video
//rsrc --> Resource



/**
 * @name isVideo
 * @description Fetch the JSON file and the featured item in the relevant activity is a video; Dynamically add the CODE BLOCK containing the relevant video.
 * @param {string} rsrcPath
 * @param {array} rsrcNames 
 * @param {string} folderPath 
 * @param {string} folderName 
 * @param {string} fileName 
 * @param {string} title 
 * @param {int} key 
 * @param {array} tags 
 * @param {boolean} setTitle 
 */

function isVideo(rsrcPath, rsrcNames, folderPath, folderName, fileName, title, currentIndex, tags, setTitle) {
    let activeTitle;
    let sourceArray = [];
    console.log("currentI " + currentIndex);
    // Check title is full or half and assign it to ActiveTitle
    if (setTitle) {
        activeTitle = folderName + " - " + title;
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
        } else {
            source = `<source src="${path}" type="video/mp4"></source>`;
        }

        sourceArray.push(source);
        console.log(sourceArray);
    }

    let code_block = `<a href="${folderPath + folderName + "/" + fileName}">
    <div class="portfolio_card">
      
      <video id="${currentIndex}" autoplay loop muted playsinline  class="portfolio_img videos">
      <p>Sorry, your browser doesn't support embedded videos.</p>
      </video>
      
      <span><i class="fas fa-tag"></i>${tags}</span>
      <div class="port_title">${activeTitle}</div>
    </div>
  </a>`

    $(".flex").append(code_block);    // code_block append to div
    $(`.flex > a:nth-child(${currentIndex}) >.portfolio_card>video`).append(sourceArray);     //  append sources to video tag

}

/**
 * @name isImage
 * @description Fetch the JSON file and the featured item in the relevant activity is a video; Dynamically add the CODE BLOCK containing the relevant video.
 * @param {string} rsrcPath
 * @param {array} rsrcNames 
 * @param {string} folderPath 
 * @param {string} folderName 
 * @param {string} fileName 
 * @param {string} title 
 * @param {int} key 
 * @param {array} tags 
 * @param {boolean} setTitle 
 */
function isImage(rsrcPath, rsrcNames, folderPath, folderName, fileName, title, currentIndex, tags, setTitle) {
    let activeTitle;
    let elementID = "port_img" + "" + currentIndex;
    let path = rsrcPath + rsrcNames;

    // Check title is full or half and assign it to ActiveTitle
    if (setTitle) {
        activeTitle = folderName + " - " + title;
    } else {
        activeTitle = title;
    }

    let code_block = `<a href="${folderPath + folderName + "/" + fileName}">
  <div class="portfolio_card">
    <div id="${elementID}" class="portfolio_img"></div>
    <span><i class="fas fa-tag"></i>${tags}</span>
    <div class="port_title">${activeTitle}</div>
  </div>
</a>`

    $(".flex").append(code_block);
    injectCssRule(elementID, path);

}

/**
 * @name injectCssRule
 * @description Dynamically added CSS ID selector
 * @param {string} elementID 
 * @param {string} path 
 */
function injectCssRule(elementID, path) {
    document.styleSheets[0].insertRule(`#${elementID} {\
          background: url(${path})\
      }`, 0)
}

$.ajax({
    url: "/projects.json",
    method: "GET",
    cache: false, //can disable cash 
    success: function (resp) {
        const activity = resp.activity;
        const rsrc_path = activity.resources_path;
        const folder_path = activity.folder_path;

        for (const key in activity.data) {
            let folder = activity.data[key].folder;
            let file = activity.data[key].file;
            let title = activity.data[key].title;
            let setFullTitle = activity.data[key].setFullTitle;
            let resources = activity.data[key].resources;
            let setVideo = activity.data[key].setVideo;
            let tags = activity.data[key].tags;


            if (setVideo) {
                isVideo(rsrc_path, resources, folder_path, folder, file, title, parseInt(key) + 1, tags, setFullTitle);

            } else {
                isImage(rsrc_path, resources, folder_path, folder, file, title, parseInt(key) + 1, tags, setFullTitle);
            }
        }

    }
});