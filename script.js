window.onload = () => {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        loader.style.opacity = "0";

        setTimeout(() => {

            loader.style.display = "none";

        }, 600);

    }, 1500);

};

// Counter Animation

const counters = document.querySelectorAll(".counter");

const speed = 60;

const startCounter = () => {

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        const update = () => {

            const value = +counter.innerText;

            const increment = Math.ceil(target / speed);

            if (value < target) {

                counter.innerText = value + increment;

                setTimeout(update, 20);

            } else {

                counter.innerText = target + "+";

            }

        };

        update();

    });

};

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            startCounter();

            observer.disconnect();

        }

    });

});

observer.observe(document.querySelector(".stats"));

/* BMI CALCULATOR */


function calculateBMI(){

    let weight = document.getElementById("weight").value;

    let height = document.getElementById("height").value;


    if(weight === "" || height === ""){

        document.getElementById("bmi-result").innerHTML =
        "Please enter your weight and height";

        return;

    }


    height = height / 100;


    let bmi = weight / (height * height);


    let status;


    if(bmi < 18.5){

        status = "Underweight";

    }

    else if(bmi < 25){

        status = "Normal Weight";

    }

    else if(bmi < 30){

        status = "Overweight";

    }

    else{

        status = "High BMI";

    }


    document.getElementById("bmi-result").innerHTML =

    "Your BMI: " + bmi.toFixed(1) +
    "<br>" +
    status;


}

/* GALLERY LIGHTBOX */


const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightbox-img");

const closeLightbox = document.querySelector(".close");


galleryImages.forEach(image => {


    image.onclick = () => {

        lightbox.style.display = "flex";

        lightboxImg.src = image.src;

    };


});


closeLightbox.onclick = () => {

    lightbox.style.display = "none";

};



lightbox.onclick = (e)=>{

    if(e.target === lightbox){

        lightbox.style.display="none";

    }

};

/* TESTIMONIAL SLIDER */


const testimonials = document.querySelectorAll(".testimonial");

const nextBtn = document.getElementById("next");

const prevBtn = document.getElementById("prev");


let current = 0;



function showTestimonial(index){

    testimonials.forEach(item=>{

        item.classList.remove("active");

    });


    testimonials[index].classList.add("active");

}



nextBtn.onclick = ()=>{

    current++;

    if(current >= testimonials.length){

        current = 0;

    }

    showTestimonial(current);

};



prevBtn.onclick = ()=>{

    current--;

    if(current < 0){

        current = testimonials.length-1;

    }

    showTestimonial(current);

};



setInterval(()=>{

    current++;

    if(current >= testimonials.length){

        current=0;

    }

    showTestimonial(current);


},5000);

/* MOBILE MENU */


const menuBtn = document.querySelector(".menu-btn");

const nav = document.querySelector(".nav-links");


menuBtn.onclick = ()=>{

nav.classList.toggle("open");

};



/* BACK TO TOP */


const topBtn = document.getElementById("topBtn");


window.addEventListener("scroll",()=>{


    if(window.scrollY > 500){

        topBtn.style.display="block";

    }

    else{

        topBtn.style.display="none";

    }


});


topBtn.onclick = ()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};



/* SCROLL REVEAL */


const revealElements =
document.querySelectorAll(
".about, .program-card, .trainer-card, .price-card, .bmi-box, .gallery-item, .testimonial, .contact-container"
);



const revealObserver =
new IntersectionObserver((entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){

entry.target.classList.add("reveal");

setTimeout(()=>{

entry.target.classList.add("show");

},100);


}


});


});



revealElements.forEach(el=>{

el.classList.add("reveal");

revealObserver.observe(el);

});