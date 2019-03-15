var allMembers = data.results[0].members; //allows us to access just the members of the representative API

function stateDrop() {

    for (var i = 0; i < usStates.length; i++) {
        var option = document.createElement("option");
        option.text = usStates[i].abbreviation;
        option.value = i;
        var select = document.getElementById("state");
        select.appendChild(option);
    }
    return option.value;
}

stateDrop();

function memberTable(allMembers) {
    var tBody = document.getElementById("tBody");
    var partyNode = document.querySelectorAll('input[type=checkbox]:checked'); //finds the values of all checkboxes on the page, places into a node
    var partyArr = Array.from(partyNode); //converts the node into an Array type variable 
    var dropdown = document.getElementById("state");

    if (dropdown.selectedIndex != 0 && partyArr.length > 0) {

        tBody.innerHTML = "";
        tBody.insertRow("tRow");
        for (var i = 0; i < allMembers.length; i++) {
            for (var j = 0; j < partyArr.length; j++) {
                if (allMembers[i].party == partyArr[j].value &&
                    allMembers[i].state == usStates[dropdown.selectedIndex].abbreviation) {
                    buildRow(allMembers[i]);
                }
            }
        }
    } else if (partyArr.length > 0) {
        tBody.innerHTML = "";
        tBody.insertRow("tRow");
        for (var i = 0; i < allMembers.length; i++) {
            for (var j = 0; j < partyArr.length; j++) {
                if (allMembers[i].party == partyArr[j].value) {
                    buildRow(allMembers[i]);
                }
            }
        }
    } else if (dropdown.selectedIndex != 0) {
        tBody.innerHTML = "";
        tBody.insertRow("tRow");
        for (var i = 0; i < allMembers.length; i++) {
            if (allMembers[i].state == usStates[dropdown.selectedIndex].abbreviation) {
                buildRow(allMembers[i]);
            }
        }
    } else {
        tBody.innerHTML = "";
        for (var i = 0; i < allMembers.length; i++) {
        buildRow(allMembers[i]);
        }
    }
}
memberTable(allMembers);


function buildRow(allMembers) {
    var tBody = document.getElementById("tBody");
    var tRow = tBody.insertRow();

    tBody.insertRow("tRow");
    tRow.insertCell().innerHTML =  allMembers.title;

    if (allMembers.middle_name == null) { //accounts for members w/o middle names
        var repName =
            allMembers.last_name + ", " + allMembers.first_name;
        tRow.insertCell().innerHTML =
            repName.link(allMembers.url); //uses the result to hyperlink the string 
    } else {
        var repName =
            allMembers.last_name +
            ", " + allMembers.first_name +
            " " + allMembers.middle_name;
        tRow.insertCell().innerHTML =
            repName.link(allMembers.url); //uses the result to hyperlink the string
    }

    tRow.insertCell().innerHTML = allMembers.party;
    tRow.insertCell().innerHTML = allMembers.state;

    if (allMembers.seniority == 1) {
        tRow.insertCell().innerHTML = allMembers.seniority + " year";
    } else {
        tRow.insertCell().innerHTML = allMembers.seniority + " years";
    }

    tRow.insertCell().innerHTML = allMembers.votes_with_party_pct + "%";
}
