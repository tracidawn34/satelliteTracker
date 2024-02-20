const geoKeyLink = `https://geocode.maps.co/search?q=&api_key=${apiKey}`

const satelliteKey = 'https://satellites.fly.dev/'

const button = document.querySelector('button')

button.addEventListener('click', ()=>{
    const address = document.getElementById('location').value;
    const norad = document.getElementById('norad').value;
    const geocodeUrl = `https://geocode.maps.co/search?q=${encodeURIComponent(address)}&api_key=${apiKey}`;
        
    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            const latitude = data[0].lat;
            const longitude = data[0].lon;

            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);

            const satelliteUrl = `https://satellites.fly.dev/passes/${norad}?lat=${latitude}&lon=${longitude}&limit=1&days=15&visible_only=true`;

            fetch(satelliteUrl)
                .then(response => response.json())
                .then(satelliteData => {
                    console.log('Satellite Pass Information:', satelliteData);
                    const outputDiv = document.createElement('div');
                    outputDiv.innerHTML = `
                        <h3>Satellite Pass Information</h3>
                        <p>Rise Time: ${satelliteData[0].rise.utc_datetime}</p>
                        <p>Culmination Time: ${satelliteData[0].culmination.utc_datetime}</p>
                        <p>Set Time: ${satelliteData[0].set.utc_datetime}</p>
                    `;
                    document.body.appendChild(outputDiv);
                })
                .catch(error => console.error('Error fetching satellite data:', error));
        })
        
})
