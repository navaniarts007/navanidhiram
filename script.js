$(document).ready(function () {

  function navigateTo(url) {
      window.location.href = url;
  }

  // Sticky header
  $(window).scroll(function () {
      if ($(this).scrollTop() > 1) {
          $(".header-area").addClass("sticky");
      } else {
          $(".header-area").removeClass("sticky");
      }

      // Update the active section in the header
      updateActiveSection();
  });

  // Initial content revealing with ScrollReveal.js
  ScrollReveal({
      distance: "100px",
      duration: 2000,
      delay: 200
  });

  ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
      origin: "left"
  });
  ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
      origin: "right"
  });
  ScrollReveal().reveal(".project-title, .contact-title", {
      origin: "top"
  });
  ScrollReveal().reveal(".projects, .contact", {
      origin: "bottom"
  });


  function updateActiveSection() {
      var scrollPosition = $(window).scrollTop();

      // Checking if scroll position is at the top of the page
      if (scrollPosition === 0) {
          $(".controls .control").removeClass("active-btn");
          $(".controls .control[data-id='home']").addClass("active-btn");
          return;
      }

      // Iterate through each section and update the active class in the header
      $("section").each(function () {
          var target = $(this).attr("id");
          var offset = $(this).offset().top;
          var height = $(this).outerHeight();

          if (
              scrollPosition >= offset - 40 &&
              scrollPosition < offset + height - 40
          ) {
              $(".controls .control").removeClass("active-btn");
              $(".controls .control[data-id='" + target + "']").addClass("active-btn");
          }
      });
  }

  // Typing effect with Typed.js
  var typeData = new Typed(".role", {
      strings: [
          "Blogger",
          "Web Developer",
          "UI-UX Designer",
          "Video Editor",
          "Coder",
      ],
      loop: true,
      typeSpeed: 100,
      backSpeed: 80,
      backDelay: 1000,
  });

  // VanillaTilt effect for image movement
  document.addEventListener('DOMContentLoaded', function () {
      const element = document.querySelector(".profile-photo img");

      VanillaTilt.init(element, {
          max: 10,
          speed: 400,
          glare: true,
          "max-glare": 0.2
      });

      let tiltX = 0;
      let tiltY = 0;
      let directionX = 1;
      let directionY = 1;

      function autoTilt() {
          tiltX += directionX * 0.15;
          tiltY += directionY * 0.15;

          if (tiltX > 10 || tiltX < -10) directionX *= -1;
          if (tiltY > 10 || tiltY < -10) directionY *= -1;

          element.style.transform = `rotateX(${tiltY}deg) rotateY(${tiltX}deg)`;

          requestAnimationFrame(autoTilt);
      }

      autoTilt();
  });

  // Text typing effect
  document.addEventListener("DOMContentLoaded", function () {
      const element = document.getElementById('typewriter');
      const cursor = document.createElement('span');
      cursor.className = 'Typewriter__cursor';
      element.appendChild(cursor);

      let content = element.innerHTML;
      element.innerHTML = '';

      let i = 0;

      function type() {
          if (i < content.length) {
              element.innerHTML = content.substring(0, i + 1);
              i++;
              setTimeout(type, 9);
          } else {
              element.appendChild(cursor);
          }
      }
      type();
  });

});


const filterItems = document.querySelectorAll('.filter-item');
const portfolioItems = document.querySelectorAll('.card');

filterItems.forEach(item => {
    item.addEventListener('click', () => {
        // 1. Remove 'active' class from all filter items
        filterItems.forEach(item => item.classList.remove('active'));
        // 2. Add 'active' class to the clicked filter item
        item.classList.add('active'); 

        // 3. Get the category to filter by
        const targetCategory = item.getAttribute('data-target');

        // 4. Filter and show/hide portfolio items
        portfolioItems.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            if (targetCategory === 'all' || cardCategory === targetCategory) {
                card.style.display = 'block'; // Show the card
            } else {
                card.style.display = 'none'; // Hide the card
            }
        });
    });
});
