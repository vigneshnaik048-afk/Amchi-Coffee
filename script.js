document.addEventListener("DOMContentLoaded", () => {
  // 1. Navigation & Gallery Setup
  const galleryNav = document.getElementById("nav-gallery");
  const gallerySection = document.getElementById("gallery");
  const galleryContainer = document.getElementById("gallery-container");
  const slideLeft = document.getElementById("slide-left");
  const slideRight = document.getElementById("slide-right");

  if (galleryNav && gallerySection) {
    galleryNav.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelectorAll(".nav-links a").forEach((link) => link.classList.remove("active"));
      galleryNav.classList.add("active");
      gallerySection.scrollIntoView({ behavior: "smooth" });
    });
  }

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

  // 2. Reservation & OTP System
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

  const OWNER_PHONE = "919876543210"; 
  let generatedOTP = null;

  const openModal = (e) => {
    if (e) e.preventDefault();
    if (modal) modal.classList.add("active");
  };

  const closeModal = () => {
    if (modal) modal.classList.remove("active");
    setTimeout(() => {
      if (step1) step1.style.display = "block";
      if (step2) step2.style.display = "none";
      if (formContainer) formContainer.style.display = "block";
      if (successContainer) successContainer.style.display = "none";
      if (resForm) resForm.reset();
    }, 300);
  };

  if (navResBtn) navResBtn.addEventListener("click", openModal);
  if (bottomBarBtn) bottomBarBtn.addEventListener("click", openModal);
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (doneBtn) doneBtn.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

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

  // 3. Category Filter Logic
  const tabBtns = document.querySelectorAll(".tab-btn");
  const menuItems = document.querySelectorAll(".menu-card");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedCategory = btn.getAttribute("data-category");

      menuItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");
        if (selectedCategory === "all" || itemCategory === selectedCategory) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});
