var allMembers = data.results[0].members; //allows us to access just the members of the representative API

var demSort = function (property) {
    return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
    };
};

var demArray = demArr();
demArray = demArray.sort(demSort('missed_votes_pct'));

var demLoyal = demArr();
demLoyal = demLoyal.sort(demSort('votes_with_party_pct'));

var repubSort = function (property) {
    return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
    };
};

var repubArray = repArr();
repubArray = repubArray.sort(repubSort('missed_votes_pct'));

var repLoyal = repArr();
repLoyal = repLoyal.sort(repubSort('votes_with_party_pct'));

var indSort = function (property) {
    return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
    };
};

var indArray = indArr();
indArray = indArray.sort(indSort('missed_votes_pct'));

var memSort = function (property) {
    return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
    };
};

var memArray = memArr();
memArray = memArray.sort(memSort('missed_votes_pct'));
console.log(memArray);

var memLoyal = allMembers;
memLoyal = memLoyal.sort(memSort('votes_with_party_pct'));
console.log(memLoyal);


function demArr() {
    var demArray = [];
    for (var i = 0; i < allMembers.length; i++) {
        if (allMembers[i].party == "D") {
            demArray.push(allMembers[i]);
        }
    }
    return demArray;
}

function repArr() {
    var repubArray = [];
    for (var i = 0; i < allMembers.length; i++) {
        if (allMembers[i].party == "R") {
            repubArray.push(allMembers[i]);
        }
    }
    return repubArray;
}

function indArr() {
    var indArray = [];
    for (var i = 0; i < allMembers.length; i++) {
        if (allMembers[i].party == "I") {
            indArray.push(allMembers[i]);
        }
    }
    return indArray;
}

function memArr() {
    var memArray = [];
    for (var i = 0; i < allMembers.length; i++) {
        memArray.push(allMembers[i]);
    }

    return memArray;
}

function glancePercent(arr) {
    var x = 0;
    for (var i = 0; i < arr.length; i++) {
        x += arr[i].missed_votes_pct;
    }
    x = x / arr.length;
    x = x.toFixed(2);

    return x;
}

function glanceTable(allMembers) {
    var tBody = document.getElementById("glanceBody");

    var tRow1 = tBody.insertRow();
    tRow1.insertCell().innerHTML = "Democrats:";
    tRow1.insertCell().innerHTML = demArray.length;
    tRow1.insertCell().innerHTML = 100 - glancePercent(demArray) + "%";

    var tRow2 = tBody.insertRow();
    tRow2.insertCell().innerHTML = "Republicans:";
    tRow2.insertCell().innerHTML = repubArray.length;
    tRow2.insertCell().innerHTML = 100 - glancePercent(repubArray) + "%";

    console.log(indArray.length);
    var tRow3 = tBody.insertRow();
    if (indArray.length != 0) {
        tRow3.insertCell().innerHTML = "Independents:";
        tRow3.insertCell().innerHTML = indArray.length;
        tRow3.insertCell().innerHTML = 100 - glancePercent(indArray) + "%";

        var averageLoyalty = 100 - parseFloat(glancePercent(demArray), 10);
        averageLoyalty += 100 - parseFloat(glancePercent(repubArray), 10);
        averageLoyalty += 100 - parseFloat(glancePercent(indArray), 10);
        averageLoyalty = averageLoyalty / 3;
        averageLoyalty = averageLoyalty.toFixed(2);

        var tRow4 = tBody.insertRow();
        tRow4.insertCell().innerHTML = "Total:";
        tRow4.insertCell().innerHTML = allMembers.length;
        tRow4.insertCell().innerHTML = averageLoyalty + "%";
    } else {
        tRow3.insertCell().innerHTML = "Independents:";
        tRow3.insertCell().innerHTML = "N/A";
        tRow3.insertCell().innerHTML = "N/A";

        var averageLoyalty = 100 - parseFloat(glancePercent(demArray), 10);
        averageLoyalty += 100 - parseFloat(glancePercent(repubArray), 10);
        averageLoyalty = averageLoyalty / 2;
        averageLoyalty = averageLoyalty.toFixed(2);

        var tRow4 = tBody.insertRow();
        tRow4.insertCell().innerHTML = "Total:";
        tRow4.insertCell().innerHTML = allMembers.length;
        tRow4.insertCell().innerHTML = averageLoyalty + "%";
    }

}


function bestAttendRes(arrValue) {
    var numArray = [];
    for (var i = 0; i < arrValue.length; i++) {
        numArray.push(arrValue[i].missed_votes_pct);
    }
    numArray = numArray.sort();

    return numArray;
}

function mostLoyalRes(arrValue) {
    var numArray = [];
    for (var i = 0; i < arrValue.length; i++) {
        numArray.push(arrValue[i].votes_with_party_pct);
    }
    numArray = numArray.sort();

    return numArray;
}

function topAttendTableDem() {

    var tBody = document.getElementById("mostAttendBodyDem");
    var dArray = bestAttendRes(demArr());

    var topTenDem = demArr().length / 10;
    topTenDem = Math.floor(topTenDem);

    for (var i = 0; i < topTenDem; i++) {
        var tRow1 = tBody.insertRow();
        if (demArray[i].middle_name == null) {
            tRow1.insertCell().innerHTML = demArray[i].last_name + ", " + demArray[i].first_name;
        } else {
            tRow1.insertCell().innerHTML = demArray[i].last_name + ", " + demArray[i].first_name + " " + demArray[i].middle_name;
        }
        tRow1.insertCell().innerHTML = demArray[i].state;
        tRow1.insertCell().innerHTML = demArray[i].seniority;
        tRow1.insertCell().innerHTML = demArray[i].missed_votes;
        tRow1.insertCell().innerHTML = demArray[i].missed_votes_pct;
    }
}

function topLoyalTableDem() {

    var tBody = document.getElementById("mostLoyalBodyDem");
    var dArray = mostLoyalRes(demArr());

    var topTenDem = demArr().length / 10;
    topTenDem = Math.floor(topTenDem);
    console.log(topTenDem);

    for (var i = demLoyal.length - 1; i > demLoyal.length - topTenDem; i--) {
        var tRow1 = tBody.insertRow();
        if (demLoyal[i].middle_name == null) {
            tRow1.insertCell().innerHTML = demLoyal[i].last_name + ", " + demLoyal[i].first_name;
        } else {
            tRow1.insertCell().innerHTML = demLoyal[i].last_name + ", " + demLoyal[i].first_name + " " + demLoyal[i].middle_name;
        }
        tRow1.insertCell().innerHTML = demLoyal[i].state;
        tRow1.insertCell().innerHTML = demLoyal[i].seniority;
        tRow1.insertCell().innerHTML = demLoyal[i].total_votes;
        tRow1.insertCell().innerHTML = demLoyal[i].votes_with_party_pct;
    }
}

function topAttendTableRep() {

    var tBody = document.getElementById("mostAttendBodyRep");
    var topTenRep = repArr().length / 10;
    topTenRep = Math.floor(topTenRep);

    for (var i = 0; i < topTenRep; i++) {
        var tRow1 = tBody.insertRow();
        if (repubArray[i].middle_name == null) {
            tRow1.insertCell().innerHTML = repubArray[i].last_name + ", " + repubArray[i].first_name;
        } else {
            tRow1.insertCell().innerHTML = repubArray[i].last_name + ", " + repubArray[i].first_name + " " + repubArray[i].middle_name;
        }
        tRow1.insertCell().innerHTML = repubArray[i].state;
        tRow1.insertCell().innerHTML = repubArray[i].seniority;
        tRow1.insertCell().innerHTML = repubArray[i].missed_votes;
        tRow1.insertCell().innerHTML = repubArray[i].missed_votes_pct;
    }
}

function topLoyalTableRep() {

    var tBody = document.getElementById("mostLoyalBodyRep");
    var topTenRep = repArr().length / 10;
    topTenRep = Math.floor(topTenRep);

    for (var i = repLoyal.length - 1; i > repLoyal.length - topTenRep; i--) {
        var tRow1 = tBody.insertRow();
        if (repLoyal[i].middle_name == null) {
            tRow1.insertCell().innerHTML = repLoyal[i].last_name + ", " + repLoyal[i].first_name;
        } else {
            tRow1.insertCell().innerHTML = repLoyal[i].last_name + ", " + repLoyal[i].first_name + " " + repLoyal[i].middle_name;
        }
        tRow1.insertCell().innerHTML = repLoyal[i].state;
        tRow1.insertCell().innerHTML = repLoyal[i].seniority;
        tRow1.insertCell().innerHTML = repLoyal[i].missed_votes;
        tRow1.insertCell().innerHTML = repLoyal[i].votes_with_party_pct;
    }
}

function topAttendTableInd() {

    var tBody = document.getElementById("mostAttendBodyInd");
    var tRow1 = tBody.insertRow();
    tRow1.insertCell().innerHTML = "There are no Independent representatives to display.";
}


function topLoyalTableInd() {

    var tBody = document.getElementById("mostLoyalBodyInd");
    var tRow1 = tBody.insertRow();
    tRow1.insertCell().innerHTML = "There are no Independent representatives to display.";
}

function topAttendTable() {

    var tBody = document.getElementById("mostAttendBody");
    var topTen = memArray.length / 10;
    topTen = Math.floor(topTen);

    for (var i = 0; i < topTen; i++) {
        var tRow1 = tBody.insertRow();
        if (memArray[i].middle_name == null) {
            tRow1.insertCell().innerHTML = memArray[i].last_name + ", " + memArray[i].first_name;
        } else {
            tRow1.insertCell().innerHTML = memArray[i].last_name + ", " + memArray[i].first_name + " " + memArray[i].middle_name;
        }
        tRow1.insertCell().innerHTML = memArray[i].party;
        tRow1.insertCell().innerHTML = memArray[i].state;
        tRow1.insertCell().innerHTML = memArray[i].seniority;
        tRow1.insertCell().innerHTML = memArray[i].missed_votes;
        tRow1.insertCell().innerHTML = memArray[i].missed_votes_pct;
    }
}

function topLoyalTable() {

    var tBody = document.getElementById("mostLoyalBody");
    var topTen = memLoyal.length / 10;
    topTen = Math.floor(topTen);

    for (var i = memLoyal.length - 1; i > memLoyal.length - topTen; i--) {
        var tRow1 = tBody.insertRow();
        if (memLoyal[i].middle_name == null) {
            tRow1.insertCell().innerHTML = memLoyal[i].last_name + ", " + memLoyal[i].first_name;
        } else {
            tRow1.insertCell().innerHTML = memLoyal[i].last_name + ", " + memLoyal[i].first_name + " " + memLoyal[i].middle_name;
        }
        tRow1.insertCell().innerHTML = memLoyal[i].party;
        tRow1.insertCell().innerHTML = memLoyal[i].state;
        tRow1.insertCell().innerHTML = memLoyal[i].seniority;
        tRow1.insertCell().innerHTML = memLoyal[i].missed_votes;
        tRow1.insertCell().innerHTML = memLoyal[i].votes_with_party_pct;
    }
}

function leastAttendTable() {
    var tBody = document.getElementById("leastAttendBody");
    var topTen = memArray.length / 10;
    topTen = Math.floor(topTen);
    console.log(memArray);
    for (var i = memArray.length - 1; i > memArray.length - topTen; i--) {
        var tRow1 = tBody.insertRow();
        if (memArray[i].middle_name == null) {
            tRow1.insertCell().innerHTML = memArray[i].last_name + ", " + memArray[i].first_name;
        } else {
            tRow1.insertCell().innerHTML = memArray[i].last_name + ", " + memArray[i].first_name + " " + memArray[i].middle_name;
        }
        tRow1.insertCell().innerHTML = memArray[i].party;
        tRow1.insertCell().innerHTML = memArray[i].state;
        tRow1.insertCell().innerHTML = memArray[i].seniority;
        tRow1.insertCell().innerHTML = memArray[i].missed_votes;
        tRow1.insertCell().innerHTML = memArray[i].missed_votes_pct;
    }
}

function leastLoyalTable() {

    var tBody = document.getElementById("leastLoyalBody");
    var topTen = memLoyal.length / 10;
    topTen = Math.floor(topTen);

    for (var i = 0; i < topTen; i++) {
        var tRow1 = tBody.insertRow();
        if (memLoyal[i].middle_name == null) {
            tRow1.insertCell().innerHTML = memLoyal[i].last_name + ", " + memLoyal[i].first_name;
        } else {
            tRow1.insertCell().innerHTML = memLoyal[i].last_name + ", " + memLoyal[i].first_name + " " + memLoyal[i].middle_name;
        }
        tRow1.insertCell().innerHTML = memLoyal[i].party;
        tRow1.insertCell().innerHTML = memLoyal[i].state;
        tRow1.insertCell().innerHTML = memLoyal[i].seniority;
        tRow1.insertCell().innerHTML = memLoyal[i].missed_votes;
        tRow1.insertCell().innerHTML = memLoyal[i].votes_with_party_pct;
    }
}

function leastAttendTableDem() {

    var tBody = document.getElementById("leastAttendBodyDem");
    var dArray = bestAttendRes(demArr());

    var topTenDem = demArr().length / 10;
    topTenDem = Math.floor(topTenDem);

    for (var i = demArray.length - 1; i > demArray.length - topTenDem; i--) {
        var tRow1 = tBody.insertRow();
        if (demArray[i].middle_name == null) {
            tRow1.insertCell().innerHTML = demArray[i].last_name + ", " + demArray[i].first_name;
        } else {
            tRow1.insertCell().innerHTML = demArray[i].last_name + ", " + demArray[i].first_name + " " + demArray[i].middle_name;
        }
        tRow1.insertCell().innerHTML = demArray[i].state;
        tRow1.insertCell().innerHTML = demArray[i].seniority;
        tRow1.insertCell().innerHTML = demArray[i].missed_votes;
        tRow1.insertCell().innerHTML = demArray[i].missed_votes_pct;
    }
}

function leastLoyalTableDem() {

    var tBody = document.getElementById("leastLoyalBodyDem");
    var dArray = bestAttendRes(demArr());

    var topTenDem = demArr().length / 10;
    topTenDem = Math.floor(topTenDem);

    for (var i = 0; i < topTenDem; i++) {
        var tRow1 = tBody.insertRow();
        if (demLoyal[i].middle_name == null) {
            tRow1.insertCell().innerHTML = demLoyal[i].last_name + ", " + demLoyal[i].first_name;
        } else {
            tRow1.insertCell().innerHTML = demLoyal[i].last_name + ", " + demLoyal[i].first_name + " " + demLoyal[i].middle_name;
        }
        tRow1.insertCell().innerHTML = demLoyal[i].state;
        tRow1.insertCell().innerHTML = demLoyal[i].seniority;
        tRow1.insertCell().innerHTML = demLoyal[i].missed_votes;
        tRow1.insertCell().innerHTML = demLoyal[i].votes_with_party_pct;
    }
}

function leastAttendTableRep() {

    var tBody = document.getElementById("leastAttendBodyRep");
    var topTenRep = repArr().length / 10;
    topTenRep = Math.floor(topTenRep);

    for (var i = repubArray.length - 1; i > repubArray.length - topTenRep; i--) {
        var tRow1 = tBody.insertRow();
        if (repubArray[i].middle_name == null) {
            tRow1.insertCell().innerHTML = repubArray[i].last_name + ", " + repubArray[i].first_name;
        } else {
            tRow1.insertCell().innerHTML = repubArray[i].last_name + ", " + repubArray[i].first_name + " " + repubArray[i].middle_name;
        }
        tRow1.insertCell().innerHTML = repubArray[i].state;
        tRow1.insertCell().innerHTML = repubArray[i].seniority;
        tRow1.insertCell().innerHTML = repubArray[i].missed_votes;
        tRow1.insertCell().innerHTML = repubArray[i].missed_votes_pct;
    }
}

function leastLoyalTableRep() {

    var tBody = document.getElementById("leastLoyalBodyRep");
    var topTenRep = repArr().length / 10;
    topTenRep = Math.floor(topTenRep);

    for (var i = 0; i < topTenRep; i++) {
        var tRow1 = tBody.insertRow();
        if (repLoyal[i].middle_name == null) {
            tRow1.insertCell().innerHTML = repLoyal[i].last_name + ", " + repubArray[i].first_name;
        } else {
            tRow1.insertCell().innerHTML = repLoyal[i].last_name + ", " + repLoyal[i].first_name + " " + repLoyal[i].middle_name;
        }
        tRow1.insertCell().innerHTML = repLoyal[i].state;
        tRow1.insertCell().innerHTML = repLoyal[i].seniority;
        tRow1.insertCell().innerHTML = repLoyal[i].missed_votes;
        tRow1.insertCell().innerHTML = repLoyal[i].votes_with_party_pct;
    }
}

function leastAttendTableInd() {

    var tBody = document.getElementById("leastAttendBodyInd");
    var tRow1 = tBody.insertRow();
    tRow1.insertCell().innerHTML = "There are no Independent representatives to display.";
}

function leastLoyalTableInd() {
    var tBody = document.getElementById("leastLoyalBodyInd");
    var tRow1 = tBody.insertRow();
    tRow1.insertCell().innerHTML = "There are no Independent representatives to display.";
}
