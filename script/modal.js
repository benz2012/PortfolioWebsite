$(function(){

	var contentURL = "";
	var contentCode = "";

	$(".modal-launcher").click(function(){
		// OPEN MODAL
		// Populate the modal window and display it
		contentURL = this.href;
		contentCode = this.id;
		var date = $(this).find("h4").text();

		loadContent(contentCode, contentURL, date);
		
		var location = $(window).scrollTop();
        $(".modal-content").css("top", location+100);

		$("#modal-background").toggleClass("active", true);
		$(".modal-content").toggleClass("active", true);
		return false;
	});

	$(".link-out").click(function(){
		// Navigate to Content Link in another browser window
		window.open(contentURL);
		if (contentCode.indexOf("v") >= 0) {
			var videoURL = $(".modal-content iframe").attr("src");
			$(".modal-content iframe").attr("");
			$(".modal-content iframe").attr("src", videoURL);
		}
		return false;
	});

	$(".modal-graphic").hover(function(){
		//When the mouse enters the Modal-Graphic DIV
		$(".navigate-modal").fadeIn(100);
	}, function(){
		//When the mouse leaves the Modal-Graphic DIV
		$(".navigate-modal").fadeOut(100);
	});

	$(".navigate-modal").click(function(){
		// Change content to next or previous based on arrow clicked
		var contentCodeChar = contentCode.slice(2,4);
		if (this.className.indexOf("left") >= 0) {
			var contentCodeNum = parseInt(contentCodeChar) - 1;
		} else if (this.className.indexOf("right") >= 0) {
			var contentCodeNum = (parseInt(contentCodeChar)) + 1;
		}
		var firstLauncherCode = $(".modal-launcher").first().attr("id");
		var firstLauncherNum = firstLauncherCode.slice(2,4);
		var numImages = $(".modal-launcher").length + parseInt(firstLauncherNum) - 1;
		console.log(numImages);
		console.log(contentCodeNum);
		if (contentCodeNum == numImages+1) {
			contentCodeNum = firstLauncherNum;
		} else if (contentCodeNum == firstLauncherNum-1) {
			contentCodeNum = numImages;
		}
		contentCode = contentCode.slice(0,2) + pad(contentCodeNum, 2);
		var newLauncher = $(".modal-launcher#" + contentCode);
		contentURL = newLauncher.attr("href");
		var date = newLauncher.find("h4").text();

		loadContent(contentCode, contentURL, date);
	});

	$("#modal-background, .modal-close").click(function(){
		// CLOSE MODAL
		// Close the Modal Window
		$("#modal-background").toggleClass("active", false);
		$(".modal-content").toggleClass("active", false);
		$('.modal-content img').attr("src", "");
		$('.modal-content iframe').attr("src", "");
		$("#include-TITLE").empty();
		$("#include-DESCRIPTION").empty();
		$("#include-DATE").empty();
	});

}); // End of DOM Ready 

function loadContent(contentCode, contentURL, date){
	if (contentCode.indexOf("g") >= 0) {
		// Specific for Graphics
		var externalURL = "modal/graphicData.html #" + contentCode;
		$('.modal-content img').attr("src", contentURL);
		$("#include-TITLE").load(externalURL + " .title");
		$("#include-DESCRIPTION").load(externalURL + " .description");
		date = "Graphic Created: " + date;

	} else if (contentCode.indexOf("v") >= 0) {
		// Specific for Videos
		var externalURL = "modal/videoData.html #" + contentCode;
		var videoURL = contentURL.slice(17,28);
		$(".modal-content iframe").attr("src", "https://www.youtube.com/embed/" + videoURL);
		$("#include-TITLE").load(externalURL + " .title");
		date = "Video Created: " + date;

	} else if (contentCode.indexOf("p") >= 0) {
		// Specific for Projects
		var externalURL = "modal/projectData.html #" + contentCode;
		var projectContainer = $(".modal-launcher#" + contentCode).closest(".row");
		date = projectContainer.find("h3.grab-date").text()
		$('.modal-content img').attr("src", contentURL);
		$("#include-TITLE").text(projectContainer.find("h2").text());
		$("#include-DESCRIPTION").load(externalURL + " .description");
		date = "Project Completed During: " + date;
	}

	$("#include-DATE").text(date);
}

function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}