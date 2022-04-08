const url = "https://dev.to/api/articles?tags=string";

const itemsContainer = document.querySelector(".items-container");
const searchField = document.querySelector(".search");
const select = document.querySelector(".select");

function useState() {
    let _state = null;

    function getState() {
        return _state;
    }

    function setState(data) {
        _state = [...data];
    }

    return [getState, setState];
}

const [getState, setState] = useState();

function cardTemplate(data) {
    const {
        title,
        url,
        cover_image,
        tags

    } = data;
    return `
    <article class="col items-container transform hover:scale-125 duration-300 ease-in-out">
      <div class="col ">
        <div class="card h-100">
          <div class="card-header d-flex justify-content-between">
           <h3>${title}</h3>
          </div>
          <a href="${url}">
          <img src="${cover_image}" class="card-img-top " alt="article">
          </a>
          <div class="card-body">
          <p class="text-muted">${tags}</p>
          </div>
        </div>
      </div>
    </article>
  `;
}


async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


function renderProjectsToDom(data) {
    let items = data.map((item) => cardTemplate(item)).join("");
    itemsContainer.innerHTML = items;
}


async function handleInitialLoad() {
    const data = await getData(url);
    setState(data);
    renderProjectsToDom(getState());
}



window.addEventListener("DOMContentLoaded", handleInitialLoad);
