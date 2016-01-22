$(function(){

	var contentCode = "";

	$(".text-launcher").click(function(){

		contentCode = $(this).closest(".row").attr("id");
		var project = $(".row#" + contentCode);

		if ($(this).hasClass("open-project")) {
			// Close the Project
			project.find(".column-text").empty();
			project.find(".call-to-read").text("Read About This Project");
			project.find(".gray-bar").css("display", "none");
			$(this).toggleClass("open-project", false);

		} else {
			// Open the Project
			var externalURL = "modal/projectData.html #" + contentCode;
			project.find(".column-text").load(externalURL + " .read-more");
			project.find(".call-to-read").text("Close This Project");
			project.find(".gray-bar").css("display", "inline");
			$(this).toggleClass("open-project", true);
		}

		project.find(".icon-mini").toggleClass("text-icon");
		project.find(".icon-mini").toggleClass("close-icon");
	});
	
});