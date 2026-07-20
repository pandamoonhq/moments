import { wedding } from "./config/wedding.js";


// =============================
// LOAD WEDDING THEME
// =============================

const root = document.documentElement;


root.style.setProperty(
    "--background",
    wedding.theme.background
);

root.style.setProperty(
    "--text",
    wedding.theme.text
);

root.style.setProperty(
    "--muted-text",
    wedding.theme.mutedText
);

root.style.setProperty(
    "--light-text",
    wedding.theme.lightText
);

root.style.setProperty(
    "--accent",
    wedding.theme.accent
);

root.style.setProperty(
    "--accent-light",
    wedding.theme.accentLight
);

root.style.setProperty(
    "--card",
    wedding.theme.card
);

root.style.setProperty(
    "--border",
    wedding.theme.border
);



// =============================
// LOAD WEDDING FONTS
// =============================

root.style.setProperty(
    "--body-font",
    wedding.fonts.body
);

root.style.setProperty(
    "--heading-font",
    wedding.fonts.heading
);

root.style.setProperty(
    "--script-font",
    wedding.fonts.script
);



// =============================
// LOAD WEDDING CONTENT
// =============================

document.title =
wedding.pageTitle;


const initials = wedding.coupleInitials.split("+");

document.getElementById("coupleInitials").innerHTML = `
    <span class="initial">${initials[0].trim()}</span>
    <span class="plus">+</span>
    <span class="initial">${initials[1].trim()}</span>
`;

document.getElementById("weddingDate").innerHTML =
wedding.weddingDate;


document.getElementById("welcomeTitle").innerHTML =
wedding.welcome.title;


document.getElementById("welcomeSubtitle").innerHTML =
wedding.welcome.subtitle;


document.getElementById("searchLabel").innerHTML =
wedding.search.label;


document.getElementById("guestName").placeholder =
wedding.search.placeholder;


document.getElementById("searchButton").innerHTML =
wedding.buttons.default;




// =============================
// CONFIGURATION
// =============================

const API_URL = wedding.apiUrl;


console.log(
    `${wedding.coupleNames} Wedding Seating Finder Loaded`
);



const input = document.getElementById("guestName");
const form = document.querySelector(".search-area");

let selectedGuest = "";
let searchTimer;



// =============================
// FORM SUBMIT (BUTTON + MOBILE ENTER)
// =============================

form.addEventListener("submit", async (event) => {


    event.preventDefault();


    const firstSuggestion =
        document.querySelector(".suggestions div");



    if(!selectedGuest && firstSuggestion){

        selectedGuest = firstSuggestion.innerText;

        input.value = selectedGuest;

    }




    if(!selectedGuest && input.value.trim()){

        selectedGuest = input.value.trim();

    }





    if(!selectedGuest){

        alert(
            wedding.messages.emptyName
        );

        return;

    }




    const suggestionBox =
        document.querySelector(".suggestions");


    if(suggestionBox){

        suggestionBox.remove();

    }



    await findTable();


});






// =============================
// AUTOCOMPLETE SEARCH
// =============================

input.addEventListener("input", () => {


    const search =
        input.value.trim().toLowerCase();



    selectedGuest = "";



    const oldList =
        document.querySelector(".suggestions");



    if(oldList){

        oldList.remove();

    }



    clearTimeout(searchTimer);




    if(search.length < 3){

        return;

    }




    searchTimer = setTimeout(async () => {


        try {


            const response = await fetch(

                `${API_URL}?search=${encodeURIComponent(search)}`

            );


            const results =
                await response.json();


            showSuggestions(results);



        } catch(error){


            console.error(
                "Search error:",
                error
            );


        }



    },400);



});







// =============================
// SHOW NAME OPTIONS
// =============================

function showSuggestions(results){


    const oldList =
        document.querySelector(".suggestions");



    if(oldList){

        oldList.remove();

    }



    if(!results.length){

        return;

    }



    const list =
        document.createElement("div");


    list.className =
        "suggestions";





    results.slice(0,5).forEach(person => {


        const item =
            document.createElement("div");


        item.innerText =
            person.name;




        item.addEventListener("click", () => {


            input.value =
                person.name;


            selectedGuest =
                person.name;


            list.remove();


        });



        list.appendChild(item);


    });



    input.parentElement.appendChild(list);



}








// =============================
// FIND TABLE
// =============================

async function findTable(){



    const button =
        form.querySelector("button");



    button.innerText =
        wedding.buttons.searching;


    button.disabled = true;




    try {



        const response = await fetch(

            API_URL,

            {

                method:"POST",

                body:JSON.stringify({

                    name:selectedGuest

                })

            }

        );



        const data =
            await response.json();





        if(!data.found){

            alert(
                wedding.messages.guestNotFound
            );

            return;

        }





// =========================
// SHOW RESULTS
// =========================


        const result =
            document.querySelector(".result");



        result.classList.remove(
            "hidden"
        );



        result.style.animation =
            "none";



        setTimeout(() => {

            result.style.animation =
                "";

        },10);









        const sameTable =
            data.party.filter(person =>

                person.name !== data.guest &&

                String(person.table)
                ===
                String(data.table)

            );






        const otherTables =
            data.party.filter(person =>

                person.name !== data.guest &&

                String(person.table)
                !==
                String(data.table)

            );








        result.innerHTML = `


        <div class="guest-name">

            ${data.guest}

        </div>




        <div class="divider"></div>




        <div class="label">

            ${wedding.labels.yourTable}

        </div>




        <div class="number">

            ${data.table}

        </div>





        ${
            wedding.features.showSameTableGuests &&
            sameTable.length

            ?

            `

            <div class="party-title">

                ${wedding.labels.seatedWith}

            </div>


            <div class="party">

                ${
                    sameTable
                    .map(person => person.name)
                    .join("<br>")
                }

            </div>

            `

            :

            ""

        }






        ${
            wedding.features.showOtherTables &&
            otherTables.length

            ?

            `

            <div class="party-title family-title">

                ${wedding.labels.familyFriends}

            </div>



            <div class="family-subtitle">

                ${wedding.labels.otherTables}

            </div>



            <div class="party">

                ${
                    otherTables
                    .map(person =>
                        `${person.name} — Table ${person.table}`
                    )
                    .join("<br>")
                }

            </div>

            `

            :

            ""

        }





        <p class="closing">

            ${wedding.labels.closing}

        </p>


        `;




    } catch(error){


        console.error(
            "Lookup error:",
            error
        );


        alert(
            wedding.messages.error
        );



    } finally {


        button.innerText =
            wedding.buttons.default;


        button.disabled =
            false;


    }
    



}
