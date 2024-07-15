document.addEventListener('DOMContentLoaded', () => {
  const filmDetails = document.querySelector('#film-details');
  const filmsList = document.querySelector('#films');
  let currentFilm = null;

  // Fetch the first movie's details and display them
  fetch('http://localhost:3000/films/1')
      .then(response => response.json())
      .then(film => displayFilmDetails(film));

  // Fetch all movies and populate the movie list
  fetch('http://localhost:3000/films')
      .then(response => response.json())
      .then(films => populateFilmList(films));

  function displayFilmDetails(film) {
      const { id, poster, title, runtime, showtime, capacity, tickets_sold, description } = film;
      currentFilm = film;
      filmDetails.querySelector('#poster').src = poster;
      filmDetails.querySelector('#title').textContent = title;
      filmDetails.querySelector('#runtime').textContent = `Runtime: ${runtime} minutes`;
      filmDetails.querySelector('#showtime').textContent = `Showtime: ${showtime}`;
      filmDetails.querySelector('#available-tickets').textContent = `Available Tickets: ${capacity - tickets_sold}`;
      filmDetails.querySelector('#description').textContent = description;

      const buyTicketButton = filmDetails.querySelector('#buy-ticket');
      updateBuyButton(buyTicketButton, capacity, tickets_sold);

      buyTicketButton.onclick = () => {
          if (currentFilm.tickets_sold < currentFilm.capacity) {
              currentFilm.tickets_sold++;
              filmDetails.querySelector('#available-tickets').textContent = `Available Tickets: ${currentFilm.capacity - currentFilm.tickets_sold}`;
              updateBuyButton(buyTicketButton, currentFilm.capacity, currentFilm.tickets_sold);
              updateSoldOutClass(currentFilm);
          }
      };
  }

  function updateBuyButton(button, capacity, tickets_sold) {
      if (tickets_sold >= capacity) {
          button.textContent = 'Sold Out';
          button.disabled = true;
      } else {
          button.textContent = 'Buy Ticket';
          button.disabled = false;
      }
  }

  function populateFilmList(films) {
      filmsList.innerHTML = ''; // Clear existing list
      films.forEach(film => {
          const li = document.createElement('li');
          li.classList.add('film', 'item');
          li.textContent = film.title;

          if (film.tickets_sold >= film.capacity) {
              li.classList.add('sold-out');
          }

          li.onclick = () => {
              fetch(`http://localhost:3000/films/${film.id}`)
                  .then(response => response.json())
                  .then(film => displayFilmDetails(film));
          };

          filmsList.appendChild(li);
      });
  }

  function updateSoldOutClass(updatedFilm) {
      const filmItems = filmsList.querySelectorAll('li');
      filmItems.forEach(item => {
          if (item.textContent === updatedFilm.title) {
              if (updatedFilm.tickets_sold >= updatedFilm.capacity) {
                  item.classList.add('sold-out');
              } else {
                  item.classList.remove('sold-out');
              }
          }
      });
  }
});
