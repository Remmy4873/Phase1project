document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/videos')
        .then(response => response.json())
        .then(videos => {
            const videoData = videos;

            function displayHighlights(category) {
                const highlightsContainer = document.getElementById('highlights');
                highlightsContainer.innerHTML = '';

                videoData.forEach(video => {
                    if (category === 'All' || video.category === category) {
                        const videoElement = document.createElement('div');
                        videoElement.className = 'col-md-4';
                        videoElement.innerHTML = `
                            <div class="card mb-4 shadow-sm">
                                <video class="card-img-top" controls>
                                    <source src="${video.url}" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                                <div class="card-body">
                                    <p class="card-text">${video.title}</p>
                                </div>
                            </div>
                        `;
                        highlightsContainer.appendChild(videoElement);
                    }
                });
            }

            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const category = e.target.getAttribute('data-category');
                    displayHighlights(category);
                });
            });

            // Search functionality
            const searchForm = document.querySelector('form.form-inline');
            searchForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const searchTerm = e.target.querySelector('input').value.toLowerCase();

                const highlightsContainer = document.getElementById('highlights');
                highlightsContainer.innerHTML = '';

                videoData.forEach(video => {
                    if (video.title.toLowerCase().includes(searchTerm)) {
                        const videoElement = document.createElement('div');
                        videoElement.className = 'col-md-4';
                        videoElement.innerHTML = `
                            <div class="card mb-4 shadow-sm">
                                <video class="card-img-top" controls>
                                    <source src="${video.url}" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video>
                                <div class="card-body">
                                    <p class="card-text">${video.title}</p>
                                </div>
                            </div>
                        `;
                        highlightsContainer.appendChild(videoElement);
                    }
                });
            });

            displayHighlights('All'); // Default to "All" category on load
        });

    // Sign-Up functionality
    const signUpForm = document.getElementById('signUpForm');
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(user => {
            alert('Sign-Up Successful!');
            $('#signUpModal').modal('hide');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    // Sign-In functionality
    const signInForm = document.getElementById('signInForm');
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('signInEmail').value;
        const password = document.getElementById('signInPassword').value;

        fetch('http://localhost:3000/users')
            .then(response => response.json())
            .then(users => {
                const user = users.find(user => user.email === email && user.password === password);
                if (user) {
                    alert('Sign-In Successful!');
                    $('#signInModal').modal('hide');
                } else {
                    alert('Invalid email or password.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});
