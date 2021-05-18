class Wallet {
    constructor(wallet, chain) {
        this.wallet = wallet;
        this.chain = chain;
    }
}

class User {
    constructor() {
        if (localStorage.getItem("wallets") == null) {
            this.wallets = [];
            console.log("new user/wallet");
        } else {
            console.log("known user/wallet");
            this.wallets = this.retrieveWallets();
            console.log(this.wallets);
       }
    }

    retrieveWallets() {
        var wallets = [];
        wallets = JSON.parse(localStorage.getItem("wallets"));
        console.log()
        return wallets;
    }

    addWalletToUserWallets(wallet) {
        this.wallets.push(wallet);
        localStorage.setItem("wallets", JSON.stringify(this.wallets));
    }
    


    




    
    walletValidation() {
        var walletElement = document.getElementById("wallet-id");
        var wallet = walletElement.value;
        var chainId = document.getElementById("chain-id");
        var chain = chainId.value;
        console.log("Wallet validation ici:", wallet, chain);
        
        var walletObject = new Wallet(wallet, chain);

        this.addWalletToUserWallets(walletObject);
        
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
        this.content.innerHTML = content;
        if (url == "seewallets.html") {
            this.displayUserWallets();
            //let form = user.generateForm();
            //document.getElementsByTagName("body")[0].appendChild(form);
        }
    }

    displayUserWallets() {
        var list = document.getElementById("wallets-list-id");        
        
        for (var i = 0; i < user.wallets.length; i++){
            var listElement = document.createElement("li");
            list.appendChild(listElement);
            listElement.textContent = user.wallets[i].wallet + " / (" + user.wallets[i].chain + ")";

            console.log("ici");
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





