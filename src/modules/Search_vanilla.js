class Search{
    // Section 1 : describe and create/initiate our object
    constructor(){
        this.body = document.getElementById("body");
        this.resultsDiv = document.getElementById("search-overlay__results");
        this.openButton = document.getElementById("js-search-trigger");
        this.closeButton = document.getElementById("close");
        // this.searchOverlay = $(".search-overlay");
        this.searchOverlay = document.querySelector(".search-overlay");
        console.log(this.searchOverlay);
        this.searchField = document.getElementById("search-term");
        console.log(this.searchField.value);
        this.events();
        this.isOverlayOpen = false;
        this.typeTimeout;
        this.previousValue;
        this.spinnerTimeout = false;

    }

    // Section 2 : events
    events(){
        this.openButton.addEventListener('click', ()=> { this.openOverlay() });
        this.closeButton.addEventListener('click', ()=> { this.closeOverlay() });
        document.addEventListener("keydown",() => this.keyPressDispatcher(event));
        this.searchField.addEventListener("keyup",() => this.typeLogic(event));
    }


    // Section 2 : methods(function,action)
    typeLogic(){
        if(this.searchField.value != this.previousValue ){
            clearTimeout(this.typeTimeout);
            if(this.searchField.value){
                if(!this.spinnerTimeout)
                {
                    this.resultsDiv.innerHTML="<div class='spinner-loader'></div>";
                    this.spinnerTimeout = true;
                }
                this.typeTimeout = setTimeout(this.getResults.bind(this),2000);

            }
            else{
                this.resultsDiv.html("");
                this.spinnerTimeout = false;
            }
        }

        this.previousValue = this.searchField.value;
        // console.log(this.previousValue);
    }
    getResults(){
        this.resultsDiv.innerHTML="This is an imaginary search result";
        this.spinnerTimeout = false;
    }
    keyPressDispatcher(event){
        if(event.keyCode == 83 && !this.isOverlayOpen && !$("input, textarea").is(':focus')){
            this.openOverlay();
        }
        if(event.keyCode == 27 && this.isOverlayOpen){
            this.closeOverlay();
        }

    }
    openOverlay(){
        this.searchOverlay.classList.add("search-overlay--active");
        this.body.classList.add("body-no-scroll");
        this.isOverlayOpen = true;

    }
    closeOverlay(){
        this.searchOverlay.classList.remove("search-overlay--active");
        this.body.classList.remove("body-no-scroll");
        this.isOverlayOpen = false;

    }
}


export default Search;