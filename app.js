const API_URL = "https://script.google.com/macros/s/AKfycbwHNdTlDchoC6JMk-_-4kFQBZ2ir7sgksbBJV79KHCDI1VvIVLw_Y_6UMHTQBy6ys146A/exec";


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

        alert("Please enter your name");

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
        "FINDING YOUR TABLE...";


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

            alert("Guest not found");

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









        // Same table guests

        const sameTable =
            data.party.filter(person =>

                person.name !== data.guest &&

                String(person.table)
                ===
                String(data.table)

            );






        // Family/friends on other tables

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

            YOUR TABLE

        </div>




        <div class="number">

            ${data.table}

        </div>





        ${
            sameTable.length

            ?

            `

            <div class="party-title">

                SEATED WITH

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
            otherTables.length

            ?

            `

            <div class="party-title family-title">

                FAMILY & FRIENDS

            </div>



            <div class="family-subtitle">

                Other tables

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

            Enjoy the evening

        </p>


        `;




    } catch(error){


        console.error(
            "Lookup error:",
            error
        );


        alert(
            "Something went wrong. Please try again."
        );



    } finally {


        button.innerText =
            "VIEW TABLE";


        button.disabled =
            false;


    }



}
