var allMembers = data.results[0].members; //allows us to access just the members of the representative API


function memberTable(allMembers) {
    var tBody = document.getElementById("tBody");

    var partyNode = document.querySelectorAll('input[type=checkbox]:checked'); //finds the values of all checkboxes on the page, places into a node

    var partyArr = Array.from(partyNode); //converts the node into an Array type variable 


    console.log(partyArr.length > 0);

    if (partyArr.length > 0) {
        tBody.innerHTML = "";
        tBody.insertRow("tRow");
        for (var i = 0; i < allMembers.length; i++) {
            for (var j = 0; j < partyArr.length; j++) {
                if (allMembers[i].party == partyArr[j].value) {

                    var tRow = tBody.insertRow();

                    tRow.insertCell().innerHTML = i + 1 + ".";

                    if (allMembers[i].middle_name == null) { //accounts for members w/o middle names
                        var repName =
                            allMembers[i].last_name + ", " + allMembers[i].first_name;
                        tRow.insertCell().innerHTML =
                            repName.link(allMembers[i].url); //uses the result to hyperlink the string 
                    } else {
                        var repName =
                            allMembers[i].last_name +
                            ", " + allMembers[i].first_name +
                            " " + allMembers[i].middle_name;
                        tRow.insertCell().innerHTML =
                            repName.link(allMembers[i].url); //uses the result to hyperlink the string
                    }

                    tRow.insertCell().innerHTML = allMembers[i].party;
                    tRow.insertCell().innerHTML = allMembers[i].state;

                    if (allMembers[i].seniority == 1) {
                        tRow.insertCell().innerHTML = allMembers[i].seniority + " year";
                    } else {
                        tRow.insertCell().innerHTML = allMembers[i].seniority + " years";
                    }

                    tRow.insertCell().innerHTML = allMembers[i].votes_with_party_pct + "%";
                }
            }
        }
    } else {
        tBody.innerHTML = "";
        for (var i = 0; i < allMembers.length; i++) {
            tBody.insertRow("tRow");
            var tRow = tBody.insertRow();
            tRow.insertCell().innerHTML = i + 1 + ".";
            if (allMembers[i].middle_name == null) { //accounts for members w/o middle names
                var repName =
                    allMembers[i].last_name + ", " + allMembers[i].first_name;
                tRow.insertCell().innerHTML =
                    repName.link(allMembers[i].url); //uses the result to hyperlink the string 
            } else {
                var repName =
                    allMembers[i].last_name +
                    ", " + allMembers[i].first_name +
                    " " + allMembers[i].middle_name;
                tRow.insertCell().innerHTML =
                    repName.link(allMembers[i].url); //uses the result to hyperlink the string
            }

            tRow.insertCell().innerHTML = allMembers[i].party;
            tRow.insertCell().innerHTML = allMembers[i].state;

            if (allMembers[i].seniority == 1) {
                tRow.insertCell().innerHTML = allMembers[i].seniority + " year";
            } else {
                tRow.insertCell().innerHTML = allMembers[i].seniority + " years";
            }
            
            tRow.insertCell().innerHTML = allMembers[i].votes_with_party_pct + "%";
        }
    }
}
memberTable(allMembers);


function stateDrop() {

    for (var i = 0; i < usStates.length; i++) {
        var option = document.createElement("option");
        option.text = usStates[i].name + ' [' + usStates[i].abbreviation + ']';
        option.value = i;
        var select = document.getElementById("state");
        select.appendChild(option);
    }
}

stateDrop();

function partySelect() {


}
