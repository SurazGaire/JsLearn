import $ from 'jquery';

class Search{
    // Section 1 : describe and create/initiate our object
    constructor(){
        this.resultsDiv = $("#search-overlay__results");
        console.dir(this.resultsDiv);
        this.openButton = $(".js-search-trigger");
        this.closeButton = $(".search-overlay__close");
        this.searchOverlay = $(".search-overlay");
        // this.searchOverlay = document.getElementsByClassName("search-overlay");
        // console.log("Hey this is test file");

        this.searchField = $('#search-term');
        this.events();
        this.isOverlayOpen = false;
        this.typeTimeout;
        this.previousValue;
        this.spinnerTimeout = false;

    }

    // Section 2 : events
    events(){
        this.openButton.on("click", this.openOverlay.bind(this));
        this.closeButton.on("click", this.closeOverlay.bind(this));
        $(document).on("keydown",this.keyPressDispatcher.bind(this));
        this.searchField.on("keyup",this.typeLogic.bind(this));
    }


    // Section 2 : methods(function,action)
    typeLogic(){
        if(this.searchField.val() != this.previousValue ){
            clearTimeout(this.typeTimeout);
            if(this.searchField.val()){
                if(!this.spinnerTimeout)
                {
                    this.resultsDiv.html("<div class='spinner-loader'></div>");
                    this.spinnerTimeout = true;
                }
                this.typeTimeout = setTimeout(this.getResults.bind(this),2000);

            }
            else{
                this.resultsDiv.html("");
                this.spinnerTimeout = false;
            }
        }

        this.previousValue = this.searchField.val();
        // console.log(this.previousValue);
    }
    getResults(){
        this.resultsDiv.html("This is an imaginary search result");
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
        this.searchOverlay.addClass("search-overlay--active");
        $("body").addClass("body-no-scroll");
        this.isOverlayOpen = true;

    }
    closeOverlay(){
        this.searchOverlay.removeClass("search-overlay--active");
        $("body").removeClass("body-no-scroll");
        this.isOverlayOpen = false;

    }
}


export default Search;