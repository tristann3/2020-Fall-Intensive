var firstNameObj = {}
var lastNameObj = {}
// text inputs
let txtFirstName = document.getElementById("first-name");
txtFirstName.addEventListener("change", firstName);
let txtLastName = document.getElementById("last-name");
txtLastName.addEventListener("change", lastName);
// button inputs
let btnPlayFirstAudio = document.getElementById("btn-first");
btnPlayFirstAudio.addEventListener("click", playAudio);
let btnPlayLastAudio = document.getElementById("btn-last");
btnPlayLastAudio.addEventListener("click", playAudio);


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

    if (pronunciationsObj.firstLast == "first"){
        firstNameObj = pronunciationsObj
    }
    else if (pronunciationsObj.firstLast == "last"){
        lastNameObj = pronunciationsObj
    }
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
    let index = ""
    let file = ""
    console.log("HEHEHE")
    if (this.id == "btn-first"){
        index = document.getElementById("first-name-languages").selectedIndex
        file = firstNameObj.url[index]
    }
    else if (this.id == "btn-last"){
        index = document.getElementById("last-name-languages").selectedIndex
        file = lastNameObj.url[index]
    }
    var audio = new Audio(file);  
    audio.type = 'audio/wav';
  
    try {
      await audio.play();
      console.log('Playing...');
    } catch (err) {
      console.log('Failed to play...' + err);
    }
  }