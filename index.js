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
      console.log(settings.data);
      // settings.data.targets.target = "Tristan"
      
      $.ajax(settings).done(function (response) {
        console.log(response);
      });

    },
    makeRequest : function( url )
    {
        $.ajax( {method: "GET", url: url, complete: PageManager.getResponse} );
        
    },
    getResponse : function ( response )
    {
        console.log("Response received");
        if( response.status == '200' )
        {
            var object = JSON.parse(response.responseText);
            var str = object.lyrics;
            //this line replaces escape characters returned from the API so that the HTML can read and format looks nice
            str = str.replace(/(?:\r\n|\r|\n)/g, '<br>')
            document.getElementById("output").innerHTML = str;
            console.log(response.responseText);
        }
        else if( response.status == '404' )
        {
            console.log("error");
            document.getElementById("output").innerHTML = "Song not found, try again";
        }
    }
}
window.onload = PageManager.init;







// Postman API cmopatible

// var settings = {
  //     "url": "https://gpdb.name-coach.com/api/public/v1/pronunciations/search",
  //     "method": "POST",
  //     "timeout": 0,
  //     "headers": {
  //       "Accept": "application/json",
  //       "Authorization": "Bearer:eyJhbGciOiJIUzI1NiIsImFjY2Vzc19rZXlfaWQiOiJ5QVdVVXJPeDhyUzZTelZMazFvQ1lOSXlvckdzZFA2NSJ9.eyJ0cyI6MTYwMzMwMDg0MjAwMH0.rpf19E30sT3K_N8hD8UnqKEE8gA_uqRVU2HUuSNBlrE",
  //       "Content-Type": "application/json"
  //     },
  //     "data": JSON.stringify({"user_context":{"signature":"a_user_sig","email":"tristan15thompson@gmail.com"},"targets":[{"target":"David","target_type_sig":"person_first_name","target_owner_context":{"signature":"a_target_owner_context"},"target_id":"a_target_id"}],"application_context":{"instance_sig":"a_curl_command_line","app_type_sig":"curl"}}),
  //   };
    
  //   $.ajax(settings).done(function (response) {
  //     console.log(response);
  //   });






// old JS code

          // let txtArtist = document.getElementById("Artist").value;
        // let txtSong = document.getElementById("Song").value;
        // let url = "https://gpdb.name-coach.com/api/public/v1/pronunciations/search"
        // url += txtArtist + "/";
        // url += txtSong;
        // try {
        //     PageManager.makeRequest(url);
        // }
        // catch( e )
        // {
        //     console.error( "Request Error:", e.message );
        // }