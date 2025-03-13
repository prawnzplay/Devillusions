// Function to load lovenotes from localStorage and display them
function loadLovenotes() {
  const messagesDiv = document.getElementById('messages');
  messagesDiv.innerHTML = ""; // Clear current messages
  const lovenotes = JSON.parse(localStorage.getItem('lovenotes') || '[]');
  
  lovenotes.forEach(note => {
    const msgContainer = document.createElement('div');
    msgContainer.style.backgroundColor = '#fff0f4';
    msgContainer.style.padding = '10px';
    msgContainer.style.marginBottom = '10px';
    msgContainer.style.borderRadius = '5px';

    const msgText = document.createElement('p');
    msgText.textContent = `"${note.message}"`;

    const meta = document.createElement('p');
    meta.style.fontSize = '0.8rem';
    meta.style.textAlign = 'right';
    meta.style.color = '#555';
    meta.textContent = `${note.name} | ${note.date}`;

    msgContainer.appendChild(msgText);
    msgContainer.appendChild(meta);
    messagesDiv.appendChild(msgContainer);
  });
}

// Event listener for the lovenote form submission
document.getElementById('lovenote-form').addEventListener('submit', function(e) {
  e.preventDefault();

  // Create an animated heart element
  const heart = document.createElement('div');
  heart.style.position = 'fixed';
  heart.style.color = '#ff69b4';
  heart.style.fontSize = '2rem';
  heart.style.animation = 'float 2s ease-out forwards';
  heart.style.pointerEvents = 'none';
  heart.textContent = '💖';

  const formRect = e.target.getBoundingClientRect();
  heart.style.left = (formRect.left + formRect.width / 2) + 'px';
  heart.style.top = formRect.top + 'px';

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 2000);

  // Get the lovenote details from the form
  const name = document.getElementById('name').value || 'Anonymous';
  const message = document.getElementById('message').value.trim();
  
  if (message !== '') {
    const now = new Date().toLocaleDateString();
    // Retrieve existing lovenotes from localStorage
    const lovenotes = JSON.parse(localStorage.getItem('lovenotes') || '[]');
    // Create a new lovenote object
    const newNote = {
      name: name,
      message: message,
      date: now
    };
    // Add the new note to the beginning of the array
    lovenotes.unshift(newNote);
    // Save the updated array back to localStorage
    localStorage.setItem('lovenotes', JSON.stringify(lovenotes));
    // Reload the lovenotes display
    loadLovenotes();
  }

  // Reset the form fields
  e.target.reset();
});

// Load lovenotes when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
  loadLovenotes();
});

// Append the keyframes for the heart animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes float {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-100px) scale(1.5);
  }
}
`;
document.head.appendChild(style);
