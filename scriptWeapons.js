(function getWeapons() {
    fetch('https://valorant-api.com/v1/weapons')
        .then((response) => response.json())
        .then((response) => {
            const weapons = response.data;
            updateWeapons(weapons);
        })
})();

function updateWeapons(weapons) {
    let cardWeapons = '';
    weapons.forEach((weapons) => {
        cardWeapons += showCardsWeapon(weapons);
    });
    const cards = document.querySelector('.row-weapons');
    cards.innerHTML = cardWeapons;
}

//event binding
document.body.addEventListener('click', function (e) {
    if (e.target.classList.contains('btn-detail-weapon')) {
        getModalWeapon(e);
    }
})

function getModalWeapon(e) {
    return fetch('https://valorant-api.com/v1/weapons/' + e.target.getAttribute('data-weapon'))
        .then((response) => response.json())
        .then((response) => {
            console.log(response.data)
            updateModalWeapon(response.data)
        })
}

function updateModalWeapon(weapon) {
    const modalWeapon = document.querySelector('#weaponsModal')
    modalWeapon.innerHTML = showModalsWeapon(weapon);
}





function showCardsWeapon(weapons) {
    return `<div class="col mb-4">
                <div class="card" style="width: 18rem;">
                    <img src="${weapons.displayIcon}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title">${weapons.displayName}</h5>
                        <p class="card-text">${weapons.category.split('::').pop()}</p>
                        <a href="#" class="btn btn-primary btn-detail-weapon" data-bs-toggle="modal" data-bs-target="#weaponsModal" data-weapon="${weapons.uuid}">Detail Weapon</a>
                    </div>
                </div>
            </div>`
}

function showModalsWeapon(weapon) {
    return `
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Detail Weapon</h1>
                    </div>
                    <div class="modal-body">
                        <div class="container-fluid">
                            <div class="row">
                                <div class="col-md-2" style="width: auto; height: auto">
                                    <img src="${weapon.displayIcon}" alt="" class="weapon" style="width: auto; height: auto">
                                </div>
                                <div class="col-md">
                                    <ul class="list-group">
                                        <li class="list-group-item"><h4>${weapon.displayName}</h4></li>
                                        <li class="list-group-item"><strong>Category:  </strong>${weapon?.shopData?.category != undefined ? weapon?.shopData?.category : 'Melee'}</li>
                                        <li class="list-group-item"><strong>Cost: </strong>${weapon?.shopData?.cost != null ? weapon?.shopData?.cost : '0'} Credits</li>
                                        <li class="list-group-item"><strong>Magazine Size: </strong>${weapon.weaponStats != null ? weapon.weaponStats.magazineSize != null ? weapon.weaponStats.magazineSize : '0' : '0'}</li>
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