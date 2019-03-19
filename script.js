function createAlbum(albumId = 1)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            var objData = JSON.parse(this.responseText);
            generateMarkup(objData, listenEvents);
        }
    }
    xmlHttp.open("GET", "https://jsonplaceholder.typicode.com/photos?albumId=" + albumId, true);
    xmlHttp.send();
}

function generateMarkup(album, callback)
{
    var
    elemContainer = document.getElementsByClassName("container")[0] ,
    elemAlbum     = document.createElement("div") ,
    elemTitle     = document.createElement("div") ,
    elemLgPhoto   = document.createElement("div") ,
    elemNavbar    = document.createElement("ul") ,
    elemBtnPrev   = document.createElement("button") ,
    elemBtnNext   = document.createElement("button") ,
    albumId       = parseInt(album[0].albumId)
    ;

    elemAlbum.className   = "album"         ;
    elemTitle.className   = "album__title"  ;
    elemLgPhoto.className = "album__photo"  ;
    elemNavbar.className  = "album__navbar" ;
    elemBtnPrev.className = "active";
    elemBtnNext.className = "active";

    if (albumId <= 1)
    {
        elemBtnPrev.className = "not-active";
        elemBtnPrev.disabled = true;
    }

    elemBtnPrev.setAttribute("onclick", `createAlbum(${albumId - 1})`);
    elemBtnNext.setAttribute("onclick", `createAlbum(${albumId + 1})`);

    elemBtnPrev.textContent = "Prev";
    elemBtnNext.textContent = "Next";

    for (photo in album)
    {
        var elemPhoto = document.createElement("li");
        var trimmedTitle = trimTitle(album[photo].title);
        elemPhoto.innerHTML = `<li><a href="${album[photo].url}" title="${trimmedTitle}"><img src="${album[photo].thumbnailUrl}"></a></li>`;
        elemNavbar.appendChild(elemPhoto);
    }

    elemContainer.innerHTML = '';
    elemTitle.innerHTML     = elemBtnPrev.outerHTML + `<h1>Album ${albumId}</h1>` + elemBtnNext.outerHTML;
    elemLgPhoto.innerHTML   = `<img id="lgImage" src="${album[0].url}"><span id="lgImageTitle">${trimmedTitle}</span>`;
    elemAlbum.appendChild(elemTitle);
    elemAlbum.appendChild(elemLgPhoto);
    elemAlbum.appendChild(elemNavbar);
    elemContainer.appendChild(elemAlbum);

    callback();

}

function listenEvents()
{
    var photos = document.getElementsByClassName("album__navbar")[0];
    photos.onclick = function(event)
    {
        var target = event.target;
        while (target != this)
        {
            if (target.nodeName == 'A') 
            {
                changeLgPhoto(target.href, target.title);
                return false;
            }
            target = target.parentNode;
        }
    }
}

function changeLgPhoto(href, title)
{
    var lgImage = document.getElementById("lgImage");
    var lgImageTitle = document.getElementById("lgImageTitle");
    lgImage.src = href;
    lgImageTitle.innerText = title;
}