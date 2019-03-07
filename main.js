
/* console.log(data)
console.log(data.results)
console.log(data.results[0])
console.log(data.results[0].members) */

var allMembers = data.results[0].members; //allows us to access just the members of the representative API

function memberTable(allMembers) {
    for(var i = 0; i < allMembers.length; i++) {
        //should insert a TR
        //should insert a TD for TR 
        if (allMembers[i].middle_name == null) {
            allMembers[i].last_name + ", " + allMembers[i].first_name;
        } else {
            allMembers[i].last_name + ", " + allMembers[i].first_name + " " + allMembers[i].middle_name;
    }
        //should insert a TD for TR
        allMembers[i].party;
        //should insert a TD for TR 
        allMembers[i].state;
        //should insert a TD for TR
        allMembers[i].seniority + " years";
        //should insert a TD for TR
        allMembers[i].votes_with_party_pct + "%";
    }
}

console.log(memberTable(allMembers));
    