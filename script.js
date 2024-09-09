fetch('https://valorant-api.com/v1/agents')
    .then((response) => response.json())
    .then((response) => {
        const agents = response.data;
        let cardAgents = '';
        agents.forEach((agents) => {
            if (agents.isPlayableCharacter === true) {
                cardAgents += showCards(agents);
            }
        })
        const cards = document.querySelector('.row');
        cards.innerHTML = cardAgents;

    })

    function showCards(agents) {
        return `<div class="col mb-4">
                <div class="card" style="width: 18rem;">
                    <img src="${agents.displayIcon}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${agents.displayName}</h5>
                        <p class="card-text">${agents.description}</p>
                        <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#agentsModal">Go somewhere</a>
                    </div>
                </div>
            </div>`
    }