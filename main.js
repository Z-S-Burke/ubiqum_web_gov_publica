var allMembers = data.results[0].members; //allows us to access just the members of the representative API

function memberTable(allMembers) {
    var tBody = document.getElementById("tBody");
    if (document.querySelectorAll('input[type=checkbox]:checked') == true) {
    
    } else {
        for (var i = 0; i < allMembers.length; i++) {

            var tRow = tBody.insertRow("tRow");
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
            tBody.append(tRow);
        }
    }
}

memberTable(allMembers);

function partySelect() {
    var partyNode = document.querySelectorAll('input[type=checkbox]:checked');
    var partyArr = Array.from(partyNode);
    
    for (i = 0; i < partyArr.length; i++) {
        console.log(partyArr[i].value);
    }

}
