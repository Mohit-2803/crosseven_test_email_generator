// DOM Elements
const nameInput = document.getElementById("nameInput");
const generateBtn = document.getElementById("generateBtn");
const resultSection = document.getElementById("resultSection");
const generatedEmail = document.getElementById("generatedEmail");
const copyBtn = document.getElementById("copyBtn");
const successMessage = document.getElementById("successMessage");
const currentYear = document.getElementById("currentYear");

// Set current year in footer
currentYear.textContent = new Date().getFullYear();

// Generate random 5-digit number
function generateRandomNumber() {
  return Math.floor(10000 + Math.random() * 90000);
}

// Generate email based on name
function generateEmail(name) {
  // Clean the name: remove extra spaces, convert to lowercase
  const cleanName = name.trim().toLowerCase().replace(/\s+/g, "");

  if (!cleanName) {
    return null;
  }

  const randomNumber = generateRandomNumber();
  return `${cleanName}+${randomNumber}@crosseven.com`;
}

// Validate name input
function validateName(name) {
  const cleanName = name.trim();

  if (!cleanName) {
    showError("Please enter a name");
    return false;
  }

  if (cleanName.length < 2) {
    showError("Name must be at least 2 characters long");
    return false;
  }

  // Check for valid characters (letters, numbers, dots, hyphens, underscores)
  const validNameRegex = /^[a-zA-Z0-9._-]+$/;
  if (!validNameRegex.test(cleanName.replace(/\s+/g, ""))) {
    showError(
      "Name can only contain letters, numbers, dots, hyphens, and underscores"
    );
    return false;
  }

  return true;
}

// Show error message
function showError(message) {
  // Remove any existing error messages
  const existingError = document.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Create and show error message
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        ${message}
    `;

  // Add error styles
  errorDiv.style.cssText = `
        background: #fee2e2;
        color: #dc2626;
        padding: 12px 16px;
        border-radius: 8px;
        margin-top: 10px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 500;
        border: 1px solid #fecaca;
        animation: fadeInUp 0.3s ease-out;
    `;

  nameInput.parentElement.appendChild(errorDiv);

  // Focus on input
  nameInput.focus();
  nameInput.style.borderColor = "#dc2626";

  // Remove error after 3 seconds
  setTimeout(() => {
    if (errorDiv.parentElement) {
      errorDiv.remove();
    }
    nameInput.style.borderColor = "";
  }, 3000);
}

// Copy email to clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    showSuccessMessage();
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand("copy");
      showSuccessMessage();
    } catch (err) {
      console.error("Failed to copy: ", err);
      alert("Failed to copy email. Please select and copy manually.");
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

// Show success message
function showSuccessMessage() {
  successMessage.classList.add("show");

  // Hide success message after 2 seconds
  setTimeout(() => {
    successMessage.classList.remove("show");
  }, 2000);
}

// Handle generate button click
function handleGenerate() {
  const name = nameInput.value;

  // Remove any existing error messages
  const existingError = document.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Validate input
  if (!validateName(name)) {
    return;
  }

  // Generate email
  const email = generateEmail(name);

  if (email) {
    // Show generated email
    generatedEmail.textContent = email;
    resultSection.classList.add("show");

    // Add smooth scroll to result
    setTimeout(() => {
      resultSection.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 100);
  }
}

// Handle copy button click
function handleCopy() {
  const email = generatedEmail.textContent;
  if (email) {
    copyToClipboard(email);
  }
}

// Event Listeners
generateBtn.addEventListener("click", handleGenerate);
copyBtn.addEventListener("click", handleCopy);

// Enter key support for input
nameInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    handleGenerate();
  }
});

// Real-time input validation
nameInput.addEventListener("input", () => {
  // Remove error styling when user starts typing
  nameInput.style.borderColor = "";

  const existingError = document.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // Hide result section when input changes
  if (nameInput.value.trim() !== generatedEmail.textContent.split("+")[0]) {
    resultSection.classList.remove("show");
  }
});

// Prevent form submission on enter (if wrapped in form)
nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
  }
});

// Auto-focus on name input when page loads
window.addEventListener("load", () => {
  nameInput.focus();
});

// Add button loading state
function setLoadingState(loading) {
  if (loading) {
    generateBtn.disabled = true;
    generateBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            Generating...
        `;
  } else {
    generateBtn.disabled = false;
    generateBtn.innerHTML = `
            <i class="fas fa-magic"></i>
            Generate Email
        `;
  }
}

// Enhanced generate function with loading state
const originalHandleGenerate = handleGenerate;
handleGenerate = function () {
  setLoadingState(true);

  // Add small delay for better UX
  setTimeout(() => {
    originalHandleGenerate();
    setLoadingState(false);
  }, 300);
};

// Add keyboard shortcuts
document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + Enter to generate
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    handleGenerate();
  }

  // Ctrl/Cmd + C to copy (when result is visible)
  if (
    (e.ctrlKey || e.metaKey) &&
    e.key === "c" &&
    resultSection.classList.contains("show")
  ) {
    const selection = window.getSelection();
    if (selection.toString() === "") {
      e.preventDefault();
      handleCopy();
    }
  }
});

// Add tooltips for better UX
const tooltips = {
  generateBtn: "Click to generate a new test email (Ctrl+Enter)",
  copyBtn: "Copy email to clipboard (Ctrl+C)",
  nameInput: "Enter name (letters, numbers, dots, hyphens, underscores only)",
};

Object.keys(tooltips).forEach((id) => {
  const element = document.getElementById(id);
  if (element) {
    element.title = tooltips[id];
  }
});

// Analytics/Usage tracking (optional)
function trackUsage(action, data = {}) {
  // This is a placeholder for analytics
  console.log(`Action: ${action}`, data);
}

// Track when emails are generated
const originalGenerateEmail = generateEmail;
generateEmail = function (name) {
  const email = originalGenerateEmail(name);
  if (email) {
    trackUsage("email_generated", {
      nameLength: name.trim().length,
      timestamp: new Date().toISOString(),
    });
  }
  return email;
};

// Track copy actions
copyBtn.addEventListener("click", () => {
  trackUsage("email_copied", {
    timestamp: new Date().toISOString(),
  });
});

// Add PWA-like experience (save form state)
function saveFormState() {
  localStorage.setItem("crosseven_last_name", nameInput.value);
}

function loadFormState() {
  const savedName = localStorage.getItem("crosseven_last_name");
  if (savedName) {
    nameInput.value = savedName;
  }
}

// Save state on input
nameInput.addEventListener("input", saveFormState);

// Load state on page load
window.addEventListener("load", loadFormState);
