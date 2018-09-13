
let event,
    modtager = document.querySelector("#eventcontainer"),
    retFilter = "alle",
    modal = document.querySelector("#modal");
document.addEventListener("DOMContentLoaded", getJson);

async function getJson(){

    //HENT Json
    let jsonObject = await fetch("menu.json");
    event = await jsonObject.json();
    console.log(event);

    visRetter();
}
//EVENTLISTENERES PÅ ALLE KNAPPER
document.querySelectorAll(".menu-item").forEach( knap =>{
    knap.addEventListener("click", filtrering)
});
function filtrering(){
    modtager.textContent = "";
    retFilter=this.getAttribute("data-kategori");
    visRetter();
    console.log("filter");
}

function visRetter() {
    let myTemplate = document.querySelector("#event-template");
    document.querySelector("#side_navn h1").textContent = retFilter;
    event.forEach( ret => {
    if(ret.kategori==retFilter || retFilter=="alle"){
        console.log(myTemplate);

        let klon = myTemplate.cloneNode(true).content;
        klon.querySelector("#data-ret").textContent = ret.navn;
        klon.querySelector("#data-billede").src = "imgs/small/" + ret.billede + "-sm.jpg";
        klon.querySelector("#data-billede").addEventListener("click",() => {

            visModal(ret);
        });
        klon.querySelector("#data-beskrivelse").textContent = ret.kortbeskrivelse;
        klon.querySelector("#data-pris").textContent = ret.pris + "kr DKK";
        modtager.appendChild(klon);

    }

    });
}
       //Funktioner til at vise og fjerne modal vinduet
       function visModal(ret) {
           console.log(ret);
           modal.classList.add("vis");
           modal.querySelector("#modal-navn").textContent = ret.navn;
           modal.querySelector("#modal-billede").src = "imgs/small/" + ret.billede + "-sm.jpg";
           modal.querySelector("#modal-billede").alt = "Foto af " + ret.navn;
           modal.querySelector("#langBeskrivelse").textContent = ret.langbeskrivelse;
           modal.querySelector("#oprindelse").textContent = ret.oprindelsesregion;
           modal.querySelector("button").addEventListener("click", skjulModal);
       }
       function skjulModal() {

           modal.classList.remove("vis");
           //window.scrollTo(0);
       }
