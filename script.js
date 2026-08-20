document.addEventListener("DOMContentLoaded", () => {
  const galleryNav = document.getElementById("nav-gallery");
  const gallerySection = document.getElementById("gallery");
  const galleryContainer = document.getElementById("gallery-container");
  const slideLeft = document.getElementById("slide-left");
  const slideRight = document.getElementById("slide-right");

  // 1. Smooth Scroll for Gallery Navigation Link
  if (galleryNav && gallerySection) {
    galleryNav.addEventListener("click", (e) => {
      e.preventDefault();

      // Highlight active link
      document.querySelectorAll("nav a").forEach((link) => link.classList.remove("active"));
      galleryNav.classList.add("active");

      // Scroll smoothly to gallery section
      gallerySection.scrollIntoView({ behavior: "smooth" });
    });
  }

  // 2. Horizontal Scroll Arrow Controls
  if (slideRight && galleryContainer) {
    slideRight.addEventListener("click", () => {
      galleryContainer.scrollBy({ left: 160, behavior: "smooth" });
    });
  }

  if (slideLeft && galleryContainer) {
    slideLeft.addEventListener("click", () => {
      galleryContainer.scrollBy({ left: -160, behavior: "smooth" });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("reservation-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const resForm = document.getElementById("reservation-form");
  const sendOtpBtn = document.getElementById("send-otp-btn");
  const step1 = document.getElementById("step-1");
  const step2 = document.getElementById("step-2");
  const formContainer = document.getElementById("form-container");
  const successContainer = document.getElementById("res-success");
  const successDetails = document.getElementById("success-details");
  const doneBtn = document.getElementById("done-btn");

  const navResBtn = document.getElementById("nav-reservation");
  const bottomBarBtn = document.querySelector(".reserve-btn");

  // Enter your 10-digit phone number here (with country code like 91 for India)
  const OWNER_PHONE = "919876543210"; 

  let generatedOTP = null;

  const openModal = (e) => {
    if (e) e.preventDefault();
    modal.classList.add("active");
  };

  const closeModal = () => {
    modal.classList.remove("active");
    setTimeout(() => {
      step1.style.display = "block";
      step2.style.display = "none";
      formContainer.style.display = "block";
      successContainer.style.display = "none";
      resForm.reset();
    }, 300);
  };

  if (navResBtn) navResBtn.addEventListener("click", openModal);
  if (bottomBarBtn) bottomBarBtn.addEventListener("click", openModal);
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (doneBtn) doneBtn.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // STEP 1: Generate & Send OTP
  if (sendOtpBtn) {
    sendOtpBtn.addEventListener("click", () => {
      const name = document.getElementById("res-name").value;
      const phone = document.getElementById("res-phone").value;
      const date = document.getElementById("res-date").value;
      const time = document.getElementById("res-time").value;

      if (!name || !phone || !date || !time) {
        alert("Please fill in all details before requesting OTP.");
        return;
      }

      generatedOTP = Math.floor(1000 + Math.random() * 9000);
      alert(`[AMCHI COFFEE] Your OTP for table reservation is: ${generatedOTP}`);

      step1.style.display = "none";
      step2.style.display = "block";
    });
  }

  // STEP 2: Verify OTP & Send to WhatsApp / LocalStorage
  if (resForm) {
    resForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const userOTP = document.getElementById("res-otp").value;

      if (parseInt(userOTP) !== generatedOTP) {
        alert("Invalid OTP! Please enter the correct code.");
        return;
      }

      const name = document.getElementById("res-name").value;
      const phone = document.getElementById("res-phone").value;
      const date = document.getElementById("res-date").value;
      const time = document.getElementById("res-time").value;
      const guests = document.getElementById("res-guests").value;

      const reservationData = { name, phone, date, time, guests, timestamp: new Date().toLocaleString() };

      let bookings = JSON.parse(localStorage.getItem("amchi_bookings")) || [];
      bookings.push(reservationData);
      localStorage.setItem("amchi_bookings", JSON.stringify(bookings));

      successDetails.innerText = `Table for ${guests} reserved under ${name} on ${date} at ${time}.`;
      formContainer.style.display = "none";
      successContainer.style.display = "block";

      const message = `New Reservation at Amchi Coffee!%0A%0A` +
                      `*Name:* ${name}%0A` +
                      `*Phone:* ${phone}%0A` +
                      `*Date:* ${date}%0A` +
                      `*Time:* ${time}%0A` +
                      `*Guests:* ${guests}`;

      window.open(`https://wa.me/${OWNER_PHONE}?text=${message}`, "_blank");
    });
  }
});
    // Category Filter Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const selectedCategory = btn.getAttribute('data-category');

    menuItems.forEach(item => {
      if (selectedCategory === 'all' || item.getAttribute('data-category') === selectedCategory) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

