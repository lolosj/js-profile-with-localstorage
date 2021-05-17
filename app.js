class User {
    constructor() {
        if (localStorage.getItem("userName") == null) {
            console.log("new user");
        } else {
            console.log("user = ", localStorage.getItem("userName"));
       }
    }

    generateForm() {
                    
        var formElement = document.createElement("form");
        var nameElement = document.createElement("input");
        var br = document.createElement("br");
        var buttonElement = document.createElement("input");
        var i = document.createElement("i")

        formElement.setAttribute("method", "post");
        formElement.setAttribute("id", "form1");
        formElement.setAttribute("action", "submit.php");
       
        nameElement.setAttribute("type", "text");
        nameElement.setAttribute("name", "username");
        nameElement.setAttribute("id", "username");
        nameElement.setAttribute("placeholder", "Full Name");
    
        buttonElement.setAttribute("type", "button");
        buttonElement.setAttribute("value", "");
        buttonElement.setAttribute("onclick", "user.formulaire()");
        buttonElement.innerHTML = 'ici<i class="fa fa-close"></i>';            

        
        formElement.appendChild(nameElement); 
        formElement.appendChild(br);
        formElement.appendChild(buttonElement);

        return formElement;
        
           
    }
    

    formulaire() {
        var n = document.getElementById("username");
        console.log(n.value);
        localStorage.setItem("userName", n.value);
        this.userName = n.value;
    }
    
};



class IndexView {
    constructor() {
        window.addEventListener("hashchange", e => this.onRoute());
        this.content = document.querySelector("#contenu");
        window.location = "#home"
        this.onRoute();
        
        
    }

    
    onRoute() {
        var hashlocation = window.location.hash;
        console.log("On route : ", hashlocation);
        this.fetchContent(hashlocation);
    }

    fetchContent(hashlocation) {
        var url = this.hashToUrl(hashlocation);
        console.log("fetchContent url : ", url);
        fetch(url).
            then( r => r.text()).
            then(content => this.updateContent(content, url));
    }    

    updateContent(content, url) {
        this.content.innerHTML = url + ": " + content;
        if (url == "page1.html") {
            let form = user.generateForm();
            document.getElementsByTagName("body")[0].appendChild(form);
        }
    }

    hashToUrl(hash) {
        var url = hash.substring(1)+".html"
        console.log("hash2url ", hash, " --> ", url)
        return url;
    }
}

new IndexView();
var user = new User();





