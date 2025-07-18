// Mobile Navigation Toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  hamburger.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    hamburger.classList.remove("active")
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  let current = ""
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".skill-category, .project-card, .cert-card, .timeline-item, .highlight-item",
  )
  animatedElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
})

// Download Resume functionality
document.getElementById("download-resume").addEventListener("click", (e) => {
  e.preventDefault()

  // Since we don't have an actual resume file, let's create a better user experience
  // Option 1: Show a message to upload resume
  showResumeMessage()

  // Option 2: If you have a resume file, uncomment and modify the path below:
   downloadActualResume()
})

function showResumeMessage() {
  const button = this.event.target.closest(".btn")
  const originalText = button.innerHTML

  // Show a helpful message
  button.innerHTML = '<i class="fas fa-info-circle"></i> Please upload your resume file'
  button.style.background = "#f59e0b"
  button.style.cursor = "default"

  // Create a temporary notification
  const notification = document.createElement("div")
  notification.innerHTML = 
  document.body.appendChild(notification)

  // Auto remove notification after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)

  // Reset button after 3 seconds
  setTimeout(() => {
    button.innerHTML = originalText
    button.style.background = ""
    button.style.cursor = ""
  }, 3000)
}

// Function to use when you have an actual resume file
function downloadActualResume() {
  // Replace 'path/to/your/resume.pdf' with the actual path to your resume
const resumePath = "Bhakti_Parsaniya_Resume.pdf"
  // Create a temporary link element
  const link = document.createElement("a")
  link.href = resumePath
  link.download = "Bhakti_Parsaniya_Resume.pdf"

  // Check if file exists before attempting download
  fetch(resumePath, { method: "HEAD" })
    .then((response) => {
      if (response.ok) {
        // File exists, proceed with download
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Show success feedback
        const button = document.getElementById("download-resume")
        const originalText = button.innerHTML
        button.innerHTML = '<i class="fas fa-check"></i> Downloaded!'
        button.style.background = "#10b981"

        setTimeout(() => {
          button.innerHTML = originalText
          button.style.background = ""
        }, 2000)
      } else {
        // File doesn't exist
        showResumeMessage()
      }
    })
    .catch(() => {
      // Error checking file
      showResumeMessage()
    })
}

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize typing effect when page loads
window.addEventListener("load", () => {
  const subtitle = document.querySelector(".hero-subtitle")
  const originalText = subtitle.textContent
  typeWriter(subtitle, originalText, 50)
})

// Contact form functionality (if you want to add a contact form later)
function handleContactForm(event) {
  event.preventDefault()
  // Add your contact form handling logic here
  alert("Thank you for your message! I will get back to you soon.")
}

// Add some interactive hover effects
document.querySelectorAll(".project-card, .cert-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px)"
    this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.3)"
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)"
    this.style.boxShadow = ""
  })
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Add scroll progress indicator
function updateScrollProgress() {
  const scrollTop = document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  const scrollProgress = (scrollTop / scrollHeight) * 100

  // You can add a progress bar element and update its width here
  // document.querySelector('.scroll-progress').style.width = scrollProgress + '%';
}

window.addEventListener("scroll", updateScrollProgress)

// Add some console easter egg
console.log(`
🚀 Welcome to Bhakti Parsaniya's Portfolio!
📧 Contact: parsaniyabhakti29@gmail.com
📱 Phone: +91 7016685268
💼 LinkedIn: https://www.linkedin.com/in/bhakti-parsaniya-492234267/

Thanks for checking out the code! 
Built with HTML, CSS, and JavaScript.
`)
