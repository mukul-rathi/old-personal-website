

//add smooth scrolling for nav button
for(let nav_button of document.getElementsByClassName("nav-button")){
    let link = nav_button.getAttribute("href");
    if(link.charAt(0)=== '#'){ //i.e. link is an internal link
        nav_button.onclick = () => {smoothScroll(link.slice(1))};
    }

}


function smoothScroll(targetID){
    let target = document.getElementById(targetID);
    let targetPos = 0;

    //get the total offset by recursively adding together the offsets of each
    //element within its parent container
    for(let element = target; element != document.body; element=element.offsetParent){
        targetPos += element.offsetTop;
    }


    //scrolling
    var startPos = self.pageYOffset;


    let distance =targetPos - startPos;
    //if the distance is small, then we can jump straight to the point.
    if (Math.abs(distance) < 10) { 
        scrollTo(0, targetPos); 
        return;
    }
    // set scroll speed + step size based on distance
    var speed = Math.max(20,Math.round(distance / 100)); //clamp so not too fast speed
    var step = Math.round(distance / 25);
    
    for(let i=0; i < distance/step; i++){
        setTimeout(()=> window.scrollTo(0,startPos+step*i), i*speed);
    }
    return false;
}