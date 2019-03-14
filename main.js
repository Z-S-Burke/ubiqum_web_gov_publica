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

    console.log('selectedIndex', dropdown.selectedIndex)
    console.log('options', dropdown.options)
    console.log('selected')
    console.log(dropdown.selectedIndex);
    console.log(usStates[dropdown.selectedIndex].abbreviation)

    console.log(partyArr.length > 0);

    console.log(allMembers[0].state, usStates[dropdown.selectedIndex].abbreviation);

    if (dropdown.selectedIndex != 0 && partyArr.length > 0) {
        console.log('first if')
        
        tBody.innerHTML = "";
        tBody.insertRow("tRow");
        for (var i = 0; i < allMembers.length; i++) {
            for (var j = 0; j < partyArr.length; j++) {
                if (allMembers[i].party == partyArr[j].value &&
                    allMembers[i].state == usStates[dropdown.selectedIndex].abbreviation) {
        
                    var tRow = tBody.insertRow();
                    
                    tBody.insertRow("tRow");

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
    } else if (partyArr.length > 0) {
        console.log('else if 1')
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
    } else if (dropdown.selectedIndex != 0) {
        console.log('else if 2')
        tBody.innerHTML = "";
        tBody.insertRow("tRow");        
        for (var i = 0; i < allMembers.length; i++) {
            if (allMembers[i].state == usStates[dropdown.selectedIndex].abbreviation) {
                
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
    } else {
    console.log('else')
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
