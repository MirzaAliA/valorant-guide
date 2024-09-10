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


        document.body.addEventListener('click', async function(e) {
            if(e.target.classList.contains('btn-detail-agent')) {
                await fetch('https://valorant-api.com/v1/agents/' + e.target.getAttribute('data-agent'))
                .then((response) => response.json())
                .then((response) => {
                    const agent = response.data;
                    const modalAgent = document.querySelector('.modal-agent')
                    console.log(agent)
                    modalAgent.innerHTML = showModals(agent);
                })
            }
        })
        
    })

    function showCards(agents) {
        return `<div class="col mb-4">
                <div class="card" style="width: 18rem;">
                    <img src="${agents.displayIcon}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${agents.displayName}</h5>
                        <p class="card-text">${agents.role.displayName}</p>
                        <a href="#" class="btn btn-primary btn-detail-agent" data-bs-toggle="modal" data-bs-target="#agentsModal" data-agent="${agents.uuid}">Detail Agent</a>
                    </div>
                </div>
            </div>`
    }

    function showModals(agent) {
        return `
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Detail Agent</h1>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-2" style="width: 307px; height: 279px">
                                    <img src="${agent.fullPortrait}" alt="" class="agent" style="width: 307px; height: 279px">
                                </div>
                                <div class="col-md">
                                    <ul class="list-group">
                                        <li class="list-group-item"><h4>${agent.displayName}</h4></li>
                                        <li class="list-group-item"><strong>Role: </strong>${agent.role.displayName}</li>
                                        <li class="list-group-item"><strong>Codename: </strong>${agent.developerName}</li>
                                        <li class="list-group-item"><strong>Description: </strong>${agent.description}</li>
                                    </ul>
                                    <br>
                                    <h4 style="margin-left: 45px">Abilities</h4>
                                    <ul class="list-group list-group-horizontal">
                                        <li class="list-group-item list-group-item flex-fill" style="padding-left: 20px"><img src="${agent.abilities[0].displayIcon}" style="width: 30px; height: 30px; margin-right: 10px; background-color: grey" class="rounded-circle">${agent.abilities[0].displayName}</li>
                                        <li class="list-group-item list-group-item flex-fill" style="padding-left: 20px"><img src="${agent.abilities[1].displayIcon}" style="width: 30px; height: 30px; margin-right: 10px; background-color: grey" class="rounded-circle">${agent.abilities[1].displayName}</li>
                                        <li class="list-group-item list-group-item flex-fill" style="padding-left: 20px"><img src="${agent.abilities[2].displayIcon}" style="width: 30px; height: 30px; margin-right: 10px; background-color: grey" class="rounded-circle">${agent.abilities[2].displayName}</li>
                                        <li class="list-group-item list-group-item flex-fill" style="padding-left: 20px"><img src="${agent.abilities[3].displayIcon}" style="width: 30px; height: 30px; margin-right: 10px; background-color: grey" class="rounded-circle">${agent.abilities[3].displayName}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        `
    }