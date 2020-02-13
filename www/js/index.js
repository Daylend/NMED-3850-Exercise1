var app = new Framework7({
    root: "#app",
    navbar: {
        mdCenterTitle: true,
        iosCenterTitle: true,
        auroraCenterTitle: true
    },
    routes: [
        {
            path: "/",
            url: "index.html"
        },
        {
            path: "/page2/",
            url: "pages/page2.html"
        },
        {
            path: "/page3/",
            url: "pages/page3.html"
        },
        {
            path: "/winner/",
            url: "pages/winner.html"
        }
    ]
});

// From w3schools.com
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}
// End from w3schools.com

function checkGameStatus(name){
    if(getCookie(name) == "")
        return false;
    else
        return true;
}

function applyGameStatus(pg, name, status){
    var color = "";
    if(status)
        color = "green";
    else
        color = "red";
    var e = pg.el.getElementsByClassName(name);
    for (var i = 0; i < e.length; i++) {
        e[i].style.color = color;
        if(status) e[i].innerHTML += " &#x2714;";
    }
}

function resetProgress(){
    setCookie('home', "", -1);
    setCookie('page2', "", -1);
    setCookie('page3', "", -1);
    location.reload();
}

var $$ = this.Dom7;
var pgname = "";
var p;

var waldo = {"home": ["img/waldo1.jpg",607,525,50], "page2": ["img/waldo4.jpg",542,415,20], "page3": ["img/waldo3.jpg",1278,99,50]};
function foundWaldo(clientX, clientY, waldoX, waldoY, radius){
    if(clientX>waldoX-radius && clientX<waldoX+radius)
    {
        if(clientY>waldoY-radius && clientY<waldoY+radius){
            return true;
        }
    }
    return false;
}

function waldoClick(e){
    console.log(e.offsetX + " " + e.offsetY + " " + foundWaldo(e.offsetX, e.offsetY, waldo[pgname][1], waldo[pgname][2], waldo[pgname][3]))
    if(foundWaldo(e.offsetX, e.offsetY, waldo[pgname][1], waldo[pgname][2], waldo[pgname][3])){
        //app.views.main.router.navigate('/winner/', {reloadCurrent: true});
        var toastIcon = app.toast.create({
            icon: '<i class="f7-icons">checkmark_seal_fill</i>',
            text: 'Congratulations! You found waldo!',
            position: 'center',
            closeTimeout: 2000,
        });
        toastIcon.open();
        setCookie(pgname, true, 999);
        applyGameStatus(p, pgname, true);
        window.navigator.vibrate([250,250,250,250,250,250]);
    }
    else {
        window.navigator.vibrate(100);
    }
}

$$(document).on('page:init', function(e, page){
    p = page;
    pgname = page.name;
    applyGameStatus(page, 'home', checkGameStatus('home'));
    applyGameStatus(page, 'page2', checkGameStatus('page2'));
    applyGameStatus(page, 'page3', checkGameStatus('page3'));
});

$$(document).on('page:afterin', function(e, page){
    //alert('test');
    //applyGameStatus('home', checkGameStatus('home'));
    //applyGameStatus('page2', checkGameStatus('page2'));
    //applyGameStatus('page3', checkGameStatus('page3'));
});

var mainView = app.views.create(".view-main");

window.ondragstart = function() {return false};