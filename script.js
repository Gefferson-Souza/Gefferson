document.addEventListener("DOMContentLoaded", () => {
  const img = document.querySelectorAll(".smartphone");

  img.forEach((element) => {
    element.addEventListener("touch", pauseAnimation);
    element.addEventListener("click", pauseAnimation);
  });

  function pauseAnimation() {
    this.style.animationPlayState =
      this.style.animationPlayState === "paused" ? "running" : "paused";
  }

  const email = document.querySelector(".email");
  email.addEventListener("click", copyEmail);
  function copyEmail() {
    navigator.clipboard.writeText(this.getAttribute("value"));
    this.dataset.state = "copied";
    setTimeout(() => {
      this.dataset.state = "initial";
    }, 2000);
  }

  const buttons = document.querySelectorAll("button");
  const inicial = document.querySelectorAll(".skills i");
  const final = document.querySelectorAll(".tec i");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.value === "tec") {
        final.forEach((element, index) => {
          var finalRect = element.getBoundingClientRect();
          var inicialRect = inicial[index].getBoundingClientRect();
          var x = inicialRect.x - finalRect.x;
          var y = inicialRect.y - finalRect.y;
          element.style.setProperty("--x", `${x}px`);
          element.style.setProperty("--y", `${y}px`);
          element.classList.add("animated");
        });
      }else{
        final.forEach((element) => {
          element.classList.remove("animated");
        });
      }
    });
  });

  if (window.innerWidth > 767) {
    const parentTablet = document.querySelector(".div-tablet");
    const tablet = document.querySelector(".tablet");
    const led = document.querySelector(".led");

    tablet.addEventListener("mouseenter", tabletOnMouseIn);
    tablet.addEventListener("touchstart", tabletOnMouseIn);

    function tabletOnMouseIn() {
      parentTablet.style.animation = "toggleTablet 1s ease-in-out both";
      led.style.backgroundColor = "green";
      led.style.animation = "ledGreen 1s infinite";

      parentTablet.addEventListener("animationend", () => {
        tablet.addEventListener("mouseleave", tabletOnMouseLeave);
      });
    }

    function tabletOnMouseLeave() {
      parentTablet.style.animation = "toggleTabletOut 1s ease-in-out both";
      led.style.backgroundColor = "red";
      led.style.animation = "ledRed 1s infinite";
      tablet.removeEventListener("mouseleave", tabletOnMouseLeave);
    }
  }
});

function render(event) {
  var buttonValue = event.target.value;
  var elements = {
    sobre: document.querySelector(".sobre"),
    con: document.querySelector(".con"),
    tec: document.querySelector(".tec"),
  };
  const buttons = document.querySelectorAll(".options button");

  buttons.forEach((button) => {
    button.dataset.state = button.value === buttonValue ? "active" : "initial";
  });

  const skills = document.querySelectorAll(".skills i");
  skills.forEach((skill) => {
    skill.style.opacity = buttonValue !== "tec" ? "1" : "0.3";
  });

  for (var key in elements) {
    var element = elements[key];
    element.classList.toggle("disable", buttonValue !== key);
  }
}
