
// Önce seçme işlemini yapalım
const formWrapper = document.querySelector(".formWrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector(".searchInput");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const buttonWrapper = document.querySelector(".buttonWrapper");
const imageList = document.querySelector(".imageListWrapper");

// Eventları yazalım
// Önce çağırıp çalıştırıyoruz
runEvent();


function runEvent() {
    form.addEventListener("submit", search)
    clearButton.addEventListener("click",clear);
}

function clear(){
    searchInput.value= "";   // inputun içini temizledik
    imageList.innerHTML= "";
}



function search(e) {
    // Input'un içindeki değeri yakalayalım ve boşlukları trimle kurtaralım
    const value = searchInput.value.trim();

    // Artık yakaladığımız value'yi dinamik olarak geçip API'den görselleri çekelim
    fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
        method: "GET",
        headers: {
            Authorization: "Client-ID 88vFaFv1Ui7AjXJWHyDOF53G9_CFj_OGpJ2loLUpuQY"
        }
    })
        .then((res) => {

            return res.json();
        })
        .then((data) => {
            Array.from(data.results).forEach((img) => {

                // burda artık istediğim url'lerimi yakaladım, bunu başka yerde
                //kullanmak için function içine vericem ki başka yere çağırabileyim
                // /console.log(img.urls.small);

                addImageToUI(img.urls.small)
            })
        })
        .catch((err) => {
            console.log(err);
        });

    e.preventDefault();
}


function addImageToUI(imageUrl){
 // burda çektiğimiz small boyuttaki img'lerimi bir divin içindeki
 // img'ye koymak için create kullanıyorum  yani şunu elde ediyorum
 /* <div>
 <img src="" alt="">
 </div>
*/
const div= document.createElement("div")
div.className="card";

const img = document.createElement("img");
img.setAttribute("src",imageUrl);
img.height= '400';
img.width= '400';

div.appendChild(img);   //burda img etiketini div'in içine koyduk.(önce büyük sonra küçük)
//şimdi imgWrapperın içine de bu etiketi koyalım.
imageList.appendChild(div);
}







