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

// Public DEV.to articles require no API key.
const articleList = document.getElementById("article-list");
const articleStatus = document.getElementById("article-status");
let loadingArticles = false;
async function loadArticles() {
    if (loadingArticles) return;
    loadingArticles = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
        const response = await fetch("https://dev.to/api/articles?username=mds05&per_page=3", {
            signal: controller.signal,
            cache: "no-store"
        });
        if (!response.ok) throw new Error("Articles unavailable");
        const articles = await response.json();
        if (!Array.isArray(articles)) throw new Error("Invalid response");
        const cards = document.createDocumentFragment();
        for (const article of articles.slice(0, 3)) {
            const url = new URL(article.url);
            if (url.protocol !== "https:" || url.hostname !== "dev.to") continue;
            const card = document.createElement("article");
            card.className = "article-card";
            const heading = document.createElement("h2");
            const link = document.createElement("a");
            link.href = url.href;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.textContent = article.title;
            heading.append(link);
            card.append(heading);
            const date = new Date(article.published_at);
            if (!Number.isNaN(date.getTime())) {
                const time = document.createElement("time");
                time.dateTime = date.toISOString();
                time.textContent = date.toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"});
                card.append(time);
            }
            const description = document.createElement("p");
            description.textContent = article.description || "Read this article on DEV.to.";
            card.append(description);
            cards.append(card);
        }
        const count = cards.childElementCount;
        articleList.replaceChildren(cards);
        articleStatus.textContent = count ? "" : "New articles will appear here when published. Explore my DEV.to profile below.";
    } catch (error) {
        articleStatus.textContent = articleList.childElementCount
            ? "Recent updates are unavailable. You can still read all my articles on DEV.to."
            : "Visit my DEV.to profile below to read my articles.";
    } finally {
        clearTimeout(timeout);
        loadingArticles = false;
    }
}
loadArticles();
setInterval(() => { if (!document.hidden) loadArticles(); }, 5 * 60 * 1000);
document.addEventListener("visibilitychange", () => { if (!document.hidden) loadArticles(); });
