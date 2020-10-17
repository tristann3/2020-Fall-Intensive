let txtFirstName = document.getElementById("first-name");
txtFirstName.addEventListener("change", firstName);

let txtLastName = document.getElementById("last-name");
txtLastName.addEventListener("change", lastName);

let btnPlayAudio = document.getElementById("btn-first");
btnPlayAudio.addEventListener("click", playAudio);

console.log("Page Loaded!");

function firstName() {
    firstLast = "first";
    onAPIRequest(firstLast);
}
function lastName () {
    firstLast = "last";
    onAPIRequest(firstLast);
}
function onAPIRequest(firstLast) {
    console.log("Click!");
    let txtName 
    if (firstLast == "first") {
        txtName = document.getElementById("first-name").value.toString();
    }
    else if (firstLast == "last") {
        txtName = document.getElementById("last-name").value.toString();
    }
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
      buildPronunciations(response, firstLast);
      console.log(response);
    });
}
function buildPronunciations(response, firstLast) {
    // This function will build a Pronunciations objecet to use in another function
    let pronunciationsObj = {
      name: response.target_results[0].target_origin,
      firstLast: firstLast,
    };
    var pronunciations = response.target_results[0].pronunciations;
    let pronunciationURLArray = [];
    let pronunciationOriginArray = [];
    for (x=0 ; x < pronunciations.length; x++) {
      pronunciationURLArray.push(pronunciations[x].audio_url)
      pronunciationOriginArray.push(pronunciations[x].language_metadata.origin_language[0].language)
    }
    pronunciationsObj['url'] = pronunciationURLArray;
    pronunciationsObj['origin'] = pronunciationOriginArray;

    console.log(pronunciationsObj)
    
    updateDropdown(pronunciationsObj)
}
function updateDropdown(pronunciationsObj) {
    let dropdown = ""
    if (pronunciationsObj.firstLast == "first"){
        dropdown = document.getElementById("first-name-languages")
    }
    else if(pronunciationsObj.firstLast == "last"){
        dropdown = document.getElementById("last-name-languages")
      }
    console.log(dropdown)
    for ( x=0; x<pronunciationsObj.origin.length; x++ ){
        var option = document.createElement("option");
        option.text = pronunciationsObj.origin[x]
        dropdown.add(option)
      }
}
async function playAudio() {
    let file = "https://nc-library-recordings.s3.us-west-1.amazonaws.com/uploads/recording/raw_s3_location/c1c8e70c-54d9-4b19-abd9-a8c45038686a/192ff3b82dbd81662971d1eebb31266f.wav" //plays audio file of current name selection
    var audio = new Audio(file);  
    audio.type = 'audio/wav';
  
    try {
      await audio.play();
      console.log('Playing...');
    } catch (err) {
      console.log('Failed to play...' + err);
    }
  }