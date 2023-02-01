// -------------- Variable declerations

// Get elements for first person
var playerOne = document.getElementById('playerOne');
var playerOneWeeks = document.getElementById('playerOneWeeks');

// Get elements for second person
var playerTwo = document.getElementById('playerTwo');
var playerTwoWeeks = document.getElementById('playerTwoWeeks');

// Get element for theme display
var theme = document.getElementById('theme');

// Get element for week display
var weekCounter = document.getElementById('weekCounter');

// list of standard themes
var standardThemes = [
    ["70-talet", 0],
    ["80-talet", 0],
    ["Disco", 0],
    ["Rock&Roll", 0]
];

// List for all themes, will fetch content from local storage
var themesArray = [];

// List for all people, will fetch content from local storage
var peopleArray = [];

//Theme display Object
var themeList = document.getElementById('themeList');

//Player display Object
var playerList = document.getElementById('personList');

//Remover Selected objects
var personToRemove = null;
var themeToRemove = null;

// -------------- Data handeling functions

// Save themes and people arrays to local storage
function saveJSON() {
    localStorage.setItem("people", JSON.stringify(peopleArray));
    localStorage.setItem("themes", JSON.stringify(themesArray));
}
// Check for data in local storage and load it to local arrays
function loadJSON() {
    if (localStorage.people) {
        console.log("loaded people")
        peopleArray = JSON.parse(localStorage.getItem("people"));
    } else {
        peopleArray = [];
    }

    if (localStorage.themes) {
        console.log("loaded themes")
        themesArray = JSON.parse(localStorage.getItem("themes"));
    } else {
        localStorage.setItem("themes", JSON.stringify(standardThemes));

        themesArray = standardThemes.slice();
    }

    if (localStorage.user1) {

    var temp1 = JSON.parse(localStorage.getItem("user1"));
    var temp2 = JSON.parse(localStorage.getItem("user2"));
    var temp3 = JSON.parse(localStorage.getItem("curTheme"));


            document.getElementById('playerOne').innerHTML = temp1[0];
            document.getElementById('playerOneWeeks').innerHTML = "Weeks hosted: " + temp1[1];

            document.getElementById('playerTwo').innerHTML = temp2[0];
            document.getElementById('playerTwoWeeks').innerHTML = "Weeks hosted: " + temp2[1];

            document.getElementById('theme').innerHTML = temp3[0];
    }
}

// -------------- Navbar Button event listeners

// Show Edit page / Hide This Week page
document.getElementById("EditBtn").addEventListener("click", function () {
    document.getElementById("EditPage").hidden = false;
    document.getElementById("ThisWeekPage").hidden = true;
});

// Show This Week page / Hide Edit page
document.getElementById("ThisWeekBtn").addEventListener("click", function () {
    document.getElementById("ThisWeekPage").hidden = false;
    document.getElementById("EditPage").hidden = true;
});

// -------------- This week page functions


//Set correct week based on computer calender
currentDate = new Date();
startDate = new Date(currentDate.getFullYear(), 0, 1);
var days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

weekCounter.innerHTML = "Week " + Math.ceil(days / 7);



// -------------- Edit page functions

function addPerson(name) {
    if (peopleArray == null || peopleArray == "null") {
        peopleArray = [];
        peopleArray[0] = name;
    } else(
        peopleArray.push([name, 0, 0])
    )
}

function displayPerson(name) {
    const newEntry = document.createElement('li');
    newEntry.classList.add("relative", "ml-[5%]", "mt-[5%]", "bg-col1", "w-[90%]", "h-[3vh]", "pt-[1%]", "rounded-lg");

    const newName = document.createElement('p');
    newName.classList.add("ml-[5%]", "text-xl", "font-bold", "text-col4", "float-left");
    newName.innerText = name;
    newEntry.appendChild(newName);

    const newScore = document.createElement('p');
    newScore.classList.add("mr-[5%]", "text-lg", "font-bold", "text-col4", "float-right");
    newScore.innerText = "Selected 0 times";
    newEntry.appendChild(newScore);

    playerList.appendChild(newEntry);
}

// Add to lists
document.getElementById('peopleAdd').addEventListener("click", function () {
    if (document.getElementById('personInput').value) {
        var name = document.getElementById('personInput').value;
        addPerson(name);
        displayPerson(name);
        document.getElementById('personInput').innerHTML = "";
        saveJSON();
    }
})

function addTheme(name) {
    if (themesArray == null || themesArray == "null") {
        themesArray = [];
        themesArray[0] = name;
    } else(
        themesArray.push([name, 0, 0])
    )
}

function displayTheme(name, amount) {
    const newEntry = document.createElement('li');
    newEntry.classList.add("relative", "ml-[5%]", "mt-[5%]", "bg-col1", "w-[90%]", "h-[3vh]", "pt-[1%]", "rounded-lg");

    const newName = document.createElement('p');
    newName.classList.add("ml-[5%]", "text-xl", "font-bold", "text-col4", "float-left");
    newName.innerText = name;
    newEntry.appendChild(newName);

    document.getElementById('themeInput').innerHTML = "";

    const newScore = document.createElement('p');
    newScore.classList.add("mr-[5%]", "text-lg", "font-bold", "text-col4", "float-right");
    newScore.innerText = "Selected " + amount + " times";
    newEntry.appendChild(newScore);

    themeList.appendChild(newEntry);
}

// Add to lists
document.getElementById('themeAdd').addEventListener("click", function () {
    if (document.getElementById('themeInput').value) {
        var name = document.getElementById('themeInput').value;
        addTheme(name);
        displayTheme(name, 0);
        document.getElementById('themeInput').innerHTML = "";
        saveJSON();
    }
})


// Clear Lists
document.getElementById('peopleClear').addEventListener("click", function () {

    localStorage.removeItem("people");

    while (playerList.firstChild) {
        playerList.removeChild(playerList.firstChild);
    }

    peopleArray = [];

});

document.getElementById('themeClear').addEventListener("click", function () {

    localStorage.removeItem("themes");

    while (themeList.firstChild) {
        themeList.removeChild(themeList.firstChild);
    }

    themesArray = [];

});

//Reset Themes to Default
document.getElementById('themeReset').addEventListener("click", function () {

    while (themeList.firstChild) {
        themeList.removeChild(themeList.firstChild);
    }

    localStorage.setItem("themes", JSON.stringify(standardThemes));

    themesArray = standardThemes.slice();


    for (let i = 0; i < themesArray.length; i++) {
        const element = themesArray[i];
        displayTheme(element[0], themesArray[i][1]);
    }

    console.log("reset");

});

// Remove Person
document.getElementById('peopleRemove').addEventListener("click", function () {

    for (let i = 0; i < peopleArray.length; i++) {
        const element = peopleArray[i];

        if (element[0] == document.getElementById('personInput').value) {
            peopleArray.splice(i, 1);
            playerList.childNodes[i].remove();
            console.log("sliced")
            saveJSON();
        }

    }

});

// Remove Theme
document.getElementById('themeRemove').addEventListener("click", function () {
    for (let i = 0; i < themesArray.length; i++) {
        const element = themesArray[i];

        if (element[0] == document.getElementById('themeInput').value) {
            themesArray.splice(i, 1);
            themeList.childNodes[i].remove();
            console.log("sliced")
            saveJSON();
        }
    }
});


// Choose two random people and a random theme, then save them to localstorage
document.getElementById('randomBtn').addEventListener("click", function () {

// Jag har en animation men den gör att sista riktiga valen är fel på displayen

    // const sleep = (time) => {
    //     return new Promise((resolve) => setTimeout(resolve, time))
    // }

    // const animation = async () => {
    //     for (let i = 0; i < 15; i++) {
    //         await sleep(100)
    //         var randomName1 = peopleArray[Math.floor(Math.random() * peopleArray.length)];
    //         var randomName2 = peopleArray[Math.floor(Math.random() * peopleArray.length)];

    //         var randomTheme = themesArray[Math.floor(Math.random() * themesArray.length)];

    //         document.getElementById('playerOne').innerHTML = randomName1[0];
    //         document.getElementById('playerOneWeeks').innerHTML = "Weeks hosted: " + randomName1[1];

    //         document.getElementById('playerTwo').innerHTML = randomName2[0];
    //         document.getElementById('playerTwoWeeks').innerHTML = "Weeks hosted: " + randomName2[1];

    //         document.getElementById('theme').innerHTML = randomTheme[0];

    //     }
    // }
    // animation();
   

    var randomName1 = "";
    var randomName2 = "";

    var lowestTimer = 100;

    for (let i = 0; i < peopleArray.length; i++) {
        
        if (peopleArray[i][2] < lowestTimer) {
            lowestTimer = peopleArray[i][2];
        }
        
    }

    console.log(lowestTimer);

    while (randomName1 == randomName2 || randomName1[2] > lowestTimer || randomName2[2] > lowestTimer) {
        randomName1 = peopleArray[Math.floor(Math.random() * peopleArray.length)];
        randomName2 = peopleArray[Math.floor(Math.random() * peopleArray.length)];
    }

    var randomTheme = themesArray[Math.floor(Math.random() * themesArray.length)];

    for (let i = 0; i < peopleArray.length; i++) {
        if (peopleArray[i][2] > 0) {
            peopleArray[i][2]--;
        }
    }

    randomName1[2] = 3;
    randomName2[2] = 3;

    console.log(randomName1[0])
    console.log(randomName2[0])

    document.getElementById('playerOne').innerHTML = randomName1[0];
    document.getElementById('playerOneWeeks').innerHTML = "Weeks hosted: " + randomName1[1];

    document.getElementById('playerTwo').innerHTML = randomName2[0];
    document.getElementById('playerTwoWeeks').innerHTML = "Weeks hosted: " + randomName2[1];

    document.getElementById('theme').innerHTML = randomTheme[0];

    localStorage.setItem("user1", JSON.stringify(randomName1));
    localStorage.setItem("user2", JSON.stringify(randomName2));
    localStorage.setItem("curTheme", JSON.stringify(randomTheme));
    saveJSON();

});

// -------------- Function Calls

//Load data on page load
loadJSON();

for (let i = 0; i < peopleArray.length; i++) {
    displayPerson(peopleArray[i][0]);
}

for (let i = 0; i < themesArray.length; i++) {
    displayTheme(themesArray[i][0], themesArray[i][1]);
}

document.getElementById("EditPage").hidden = true;