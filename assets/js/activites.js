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
function isVideo(rsrcPath, rsrcNames, folderPath, folderName ,fileName, title, currentIndex, tags, setTitle) {
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

    let code_block = `<a href="${folderPath + folderName + "/" + fileName}">
    <div class="portfolio_card">
      
      <video id="${currentIndex}" autoplay loop muted playsinline  class="portfolio_img videos">
      Sorry, your browser doesn't support embedded videos.
      </video>
      
      <span><i class="fas fa-tag"></i>${tags}</span>
      <div class="port_title">${activeTitle}</div>
    </div>
  </a>`

  $(".flex").append(code_block);    // code_block append to div
  $(`.flex > a:nth-child(${currentIndex}) >.portfolio_card>video`).append(sourceArray);     //  append sources to video tag

}
