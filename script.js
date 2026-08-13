document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. MOBILE NAVIGATION TOGGLE
  // ==========================================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }


  // ==========================================
  // 2. CONTACT FORM HANDLING (contact.html)
  // ==========================================
  const contactForm = document.getElementById('contactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;

      formFeedback.textContent = 'Sending message...';
      formFeedback.style.color = '#2b6cb0';

      setTimeout(() => {
        formFeedback.textContent = `Thank you, ${name}! Your message has been sent successfully. We will reply to ${email} shortly.`;
        formFeedback.style.color = '#2f855a'; // Green success text
        contactForm.reset();
      }, 1000);
    });
  }


  // ==========================================
  // 3. ADMISSIONS APPLICATION FORM (admissions.html)
  // ==========================================
  const admissionsForm = document.getElementById('admissionsForm');
  const admissionsFeedback = document.getElementById('admissionsFeedback');

  if (admissionsForm) {
    admissionsForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // File size validation check (5MB limit per file)
      const birthCert = document.getElementById('birthCertificate').files[0];
      const reportCard = document.getElementById('reportCard').files[0];
      const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

      if ((birthCert && birthCert.size > maxFileSize) || (reportCard && reportCard.size > maxFileSize)) {
        admissionsFeedback.textContent = 'Error: Individual file sizes must be under 5MB.';
        admissionsFeedback.style.color = '#e53e3e';
        return;
      }

      // Collect form values
      const studentFirstName = document.getElementById('studentFirstName').value;
      const studentLastName = document.getElementById('studentLastName').value;
      const studentName = `${studentFirstName} ${studentLastName}`;
      const parentEmail = document.getElementById('parentEmail').value;
      const grade = document.getElementById('gradeApplying').value;

      // Processing feedback
      admissionsFeedback.textContent = 'Processing application and verifying documents...';
      admissionsFeedback.style.color = '#2b6cb0';

      setTimeout(() => {
        const referenceId = 'APX-' + Math.floor(100000 + Math.random() * 900000);

        // Replace form with confirmation card
        admissionsForm.innerHTML = `
          <div class="success-card">
            <h3>Application Submitted Successfully!</h3>
            <p>Thank you for applying to Apex Academy for <strong>${studentName}</strong> (${grade} level).</p>
            <p>Your unique application reference code is:</p>
            <div class="ref-code">${referenceId}</div>
            <p>A confirmation notice and further instructions have been dispatched to <strong>${parentEmail}</strong>.</p>
          </div>
        `;
      }, 1500);
    });
  }


  // ==========================================
  // 4. DYNAMIC EVENTS CALENDAR (index.html)
  // ==========================================
  const eventsData = [
    {
      id: 1,
      title: "Annual Sports Meet 2026",
      category: "sports",
      day: "15",
      month: "Sep",
      description: "Track and field competitions, team sports, and awards presentation."
    },
    {
      id: 2,
      title: "Fall Open House & School Tour",
      category: "admissions",
      day: "28",
      month: "Sep",
      description: "Interactive session for prospective students and parents."
    },
    {
      id: 3,
      title: "Science & Innovation Fair",
      category: "academic",
      day: "10",
      month: "Oct",
      description: "Exhibition of student projects in robotics, biology, and chemistry."
    },
    {
      id: 4,
      title: "Drama Club Production: The Crucible",
      category: "arts",
      day: "22",
      month: "Oct",
      description: "Evening theatrical performance by the high school drama ensemble."
    },
    {
      id: 5,
      title: "Mid-Term Examination Week",
      category: "academic",
      day: "05",
      month: "Nov",
      description: "Comprehensive mid-term evaluations for grades 6 through 12."
    }
  ];

  const eventsContainer = document.getElementById('eventsContainer');
  const filterBtns = document.querySelectorAll('.filter-btn');

  // Render events function
  function renderEvents(filter = 'all') {
    if (!eventsContainer) return;

    const filteredEvents = filter === 'all'
      ? eventsData
      : eventsData.filter(e => e.category === filter);

    if (filteredEvents.length === 0) {
      eventsContainer.innerHTML = `<p class="no-events">No events found for this category.</p>`;
      return;
    }

    eventsContainer.innerHTML = filteredEvents.map(event => `
      <div class="event-card" data-category="${event.category}">
        <div class="event-date">
          <span class="day">${event.day}</span>
          <span class="month">${event.month}</span>
        </div>
        <div class="event-details">
          <span class="event-badge">${event.category}</span>
          <h3>${event.title}</h3>
          <p>${event.description}</p>
        </div>
      </div>
    `).join('');
  }

  // Initial render (runs only if eventsContainer exists on current page)
  if (eventsContainer) {
    renderEvents();

    // Attach click listeners to filter buttons
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-category');
        renderEvents(category);
      });
    });
  }


  // ==========================================
  // 5. PORTAL TABS, MODAL & LOGIN FUNCTIONALITY (portal.html / Modal)
  // ==========================================

  // Role Tab Switching (Page & Modal)
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Filter tabs based on modal vs page container
      const parentContainer = btn.closest('.portal-card') || btn.closest('.modal-content');
      if (!parentContainer) return;

      const siblingBtns = parentContainer.querySelectorAll('.tab-btn');
      const siblingForms = parentContainer.querySelectorAll('.portal-form');

      siblingBtns.forEach(b => b.classList.remove('active'));
      siblingForms.forEach(f => f.classList.remove('active'));

      btn.classList.add('active');

      if (targetTab === 'studentTab') {
        document.getElementById('studentForm')?.classList.add('active');
      } else if (targetTab === 'parentTab') {
        document.getElementById('parentForm')?.classList.add('active');
      } else if (targetTab === 'modalStudentTab') {
        document.getElementById('modalStudentForm')?.classList.add('active');
      } else if (targetTab === 'modalParentTab') {
        document.getElementById('modalParentForm')?.classList.add('active');
      }
    });
  });

  // Toggle Password Visibility
  const togglePassBtns = document.querySelectorAll('.toggle-password');
  togglePassBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (input) {
        if (input.type === 'password') {
          input.type = 'text';
          btn.textContent = 'Hide';
        } else {
          input.type = 'password';
          btn.textContent = 'Show';
        }
      }
    });
  });

  // Portal Modal Open/Close Controls
  const openModalBtn = document.getElementById('openPortalModal');
  const closeModalBtn = document.getElementById('closePortalModal');
  const portalModal = document.getElementById('portalModal');

  if (openModalBtn && portalModal) {
    openModalBtn.addEventListener('click', () => portalModal.classList.add('open'));
  }

  if (closeModalBtn && portalModal) {
    closeModalBtn.addEventListener('click', () => portalModal.classList.remove('open'));
  }

  // Close modal when clicking dark backdrop
  if (portalModal) {
    portalModal.addEventListener('click', (e) => {
      if (e.target === portalModal) {
        portalModal.classList.remove('open');
      }
    });
  }

  // Generic Login Form Submission Handler
  const handlePortalSubmit = (formId, feedbackId, role) => {
    const form = document.getElementById(formId);
    const feedback = document.getElementById(feedbackId);

    if (form && feedback) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        feedback.textContent = 'Authenticating credentials...';
        feedback.style.color = '#2b6cb0';

        setTimeout(() => {
          feedback.textContent = `Success! Redirecting to your ${role} Dashboard...`;
          feedback.style.color = '#2f855a';
        }, 1200);
      });
    }
  };

  handlePortalSubmit('studentForm', 'studentFeedback', 'Student');
  handlePortalSubmit('parentForm', 'parentFeedback', 'Parent');
  handlePortalSubmit('modalStudentForm', 'mStudentFeedback', 'Student');
  handlePortalSubmit('modalParentForm', 'mParentFeedback', 'Parent');

});