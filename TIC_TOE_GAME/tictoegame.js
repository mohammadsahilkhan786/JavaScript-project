// let a=document.querySelectorAll(".box");
// let b=a.innerHTML="<p>x</p>";
// let m=b
// a.addEventListener("click",()=>{
//     if(m===b){
//        b=a.innerHTML="<p>o</p>"; 
//     }
//     else{
//        b=a.innerHTML="<p>x</p>"; 

//     }
// })


let a = document.querySelectorAll(".box");
let tr = "x";

a.forEach(box => {
    box.addEventListener("click", () => {

        if (box.innerHTML === "") {   
            box.innerHTML = tr;

           
            if (tr === "x") {
                tr = "o";
            } else {
                tr = "x";
            }
        }

    });
});
