import $ from 'jquery';
class Search{
    // Section 1 : describe and create/initiate our object
    constructor(){
        this.addSearchOverlay();
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
                this.typeTimeout = setTimeout(this.getResults.bind(this),750);

            }
            else{
                this.resultsDiv.innerHTML = "";
                this.spinnerTimeout = false;
            }
        }

        this.previousValue = this.searchField.value;
        // console.log(this.previousValue);
    }
    getResults(){
        
        // this.spinnerTimeout = false;
        $.getJSON('http://localhost/wordpress/wp-json/wp/v2/posts?search=' + this.searchField.value, posts => {
            $.getJSON('http://localhost/wordpress/wp-json/wp/v2/pages?search=' + this.searchField.value , pages=>{
                var combinedResults = posts.concat(pages);
            this.resultsDiv.innerHTML=`<h2 class="search-overlay__section-title">General Information</h2>
            ${combinedResults.length?'<ul class="link-list min-list">':'No general information match the search.'}
            ${combinedResults.map(item=>`<li><a href="${item.link}">${item.title.rendered}</a></li>`).join('')}
            ${combinedResults.length?'</ul>':''}
            `;
            this.spinnerTimeout = false;
        }) });
        
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
        this.searchField.value = '';
        this.resultsDiv.innerHTML = "";
        setTimeout(()=> (this.searchField.focus()),301)
        this.isOverlayOpen = true;

    }
    closeOverlay(){
        this.searchOverlay.classList.remove("search-overlay--active");
        this.body.classList.remove("body-no-scroll");
        this.isOverlayOpen = false;

    }

    addSearchOverlay(){
        $('body').append(`
        <div class="search-overlay">    
        <div class="search-overlay_top">
            <div class="container">
                <i class="fa fa-search search-overlay__icon" area-hidden="true"></i>
                <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term" autocomplete="off">
                <i class="fa fa-window-close search-overlay__close" id="close" area-hidden="true"></i>
            </div>
        </div>
        <div class="container">
            <div id="search-overlay__results"></div>
        </div>
    
    </div>
    `);
    }
}


export default Search;