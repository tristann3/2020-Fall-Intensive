/* This JavaScript file will handle the API requests from the NameCoach API */
// 

let PageManager = {

  init : function()
  {
      let btnAPIRequest = document.getElementById("btnAPIRequest");
      btnAPIRequest.addEventListener("click", PageManager.onAPIRequest);

      let txtFirstName = document.getElementById("first-name");
      txtFirstName.addEventListener("change", PageManager.onAPIRequest);

      let txtLastName = document.getElementById("last-name");
      txtLastName.addEventListener("change", PageManager.onAPIRequest);

      console.log("Page Loaded!");
  },
  onAPIRequest : function() {
    console.log("Click!");
    let txtName = document.getElementById("first-name").value.toString();
    var settings = {
      "url": "https://gpdb.name-coach.com/api/public/v1/pronunciations/search",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Accept": "application/json",
        "Authorization": "Bearer:eyJhbGciOiJIUzI1NiIsImFjY2Vzc19rZXlfaWQiOiJ5QVdVVXJPeDhyUzZTelZMazFvQ1lOSXlvckdzZFA2NSJ9.eyJ0cyI6MTYwMzMwMDg0MjAwMH0.rpf19E30sT3K_N8hD8UnqKEE8gA_uqRVU2HUuSNBlrE",
        "Content-Type": "application/json"
      },
      "data": JSON.stringify({"user_context":{"signature":"a_user_sig","email":"tristan15thompson@gmail.com"},"targets":[{"target":txtName,"target_type_sig":"person_first_name","target_owner_context":{"signature":"a_target_owner_context"},"target_id":"a_target_id"}],"application_context":{"instance_sig":"a_curl_command_line","app_type_sig":"curl"}}),
    };
    
    $.ajax(settings).done(function (response) {
      PageManager.buildOrigins(response);
      console.log(response);
    });
  },
  buildOrigins : function (response) {
    // This function will retrieve all of the possible pronunciations of the typed name and update the dropdown accordingly
    var pronunciations = response.target_results[0].pronunciations;
    let originsArray = [];
    for (x=0 ; x < pronunciations.length; x++) {
      originsArray.push(pronunciations[x].language_metadata.origin_language[0].language)
    }
    
  }

}
window.onload = PageManager.init;
