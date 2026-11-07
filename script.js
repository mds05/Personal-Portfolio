const phrases = [
    "Hi! It's Shahriar.",
    "Computer Science Student",
    "Aspiring Software Engineer.",
    "Exploring Artificial Intelligence."
];
const intro = document.getElementById("intro");
let phraseIndex = 0;
let letterIndex=0;

function type(){
    if(letterIndex<phrases[phraseIndex].length){
        intro.textContent +=phrases[phraseIndex][letterIndex];
        letterIndex++;
        setTimeout(type,100);
    }
    else{
        setTimeout(()=>{
            intro.textContent="";
            letterIndex=0;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            type();
        },1500)
    }
}
type();

const sections=document.querySelectorAll('main > section');
const navLinks=document.querySelectorAll('nav a');
function updateActiveSection(){
    let activeId=sections[0].id;
for(let i=0;i<sections.length;i++){
    let section=sections[i];
    if(section.getBoundingClientRect().top<=150){
        activeId=section.id;
    }
}
 for(let j=0;j<navLinks.length;j++){
                let link=navLinks[j];
                if(link.getAttribute("href") === "#"+activeId){
                    link.classList.add("active");
                }
                else{
                    link.classList.remove("active");
                }
            }
}
window.addEventListener("scroll",updateActiveSection);
window.addEventListener("resize",updateActiveSection);
updateActiveSection();