//div & button
const main = document.getElementById('main')
const dostupni = document.getElementById('dostupni')
const btnSlobodni = document.getElementById('btnSlobodni')
const btnPopuni = document.getElementById('btnPopuni')

var aAutomobil = [];
oDbAutomobil.on('value', function (oOdgovorPosluzitelja) {
    aAutomobil = [];
    oOdgovorPosluzitelja.forEach(function (oAutomobilSnapshot) {
        var aAutomobilKey = oAutomobilSnapshot.key;
        var oAutomobil = oAutomobilSnapshot.val();
        aAutomobil.push({
            ID_aKey: aAutomobilKey,
            Marka: oAutomobil.Marka,
            Model: oAutomobil.Model,
            Oznaka: oAutomobil.Oznaka,
            DatumRegistracije: oAutomobil.DatumRegistracije,
            CijenaNajma: oAutomobil.CijenaNajma,
            DatumOdNajam: oAutomobil.DaDatumOdNajamtumOd,
            DatumDoNajam: oAutomobil.DatumDoNajam,
            Mjenjac: oAutomobil.Mjenjac,
            Motor: oAutomobil.Motor,
            Slika: oAutomobil.Slika,
            Posuden: oAutomobil.Posuden
        });
    });
    PopuniAutomobile()
});

var aKorisnik = [];
oDbKorisnik.on('value', function (oOdgovorPosluzitelja) {
    aKorisnik = [];
    oOdgovorPosluzitelja.forEach(function (oKorisnikSnapshot) {
        var kKorisnikSnapshotKey = oKorisnikSnapshot.key;
        var oKorisnik = oKorisnikSnapshot.val();
        aKorisnik.push({
            ID_kKey: kKorisnikSnapshotKey,
            Ime: oKorisnik.Ime,
            Prezime: oKorisnik.Prezime,
            OIB: oKorisnik.OIB,
            Mobitel: oKorisnik.Mobitel,
            Email: oKorisnik.Email,
        });
    });
});

var aRezervacije = [];
oDbRezervacije.on('value', function (oOdgovorPosluzitelja) {
    aRezervacije = [];
    oOdgovorPosluzitelja.forEach(function (oRezervacijeSnapshot) {
        var rRezervacijeSnapshotKey = oRezervacijeSnapshot.key;
        var oRezervacije = oRezervacijeSnapshot.val();
        aRezervacije.push({
            ID_rKey: rRezervacijeSnapshotKey,
            OIB_Korisnika: oRezervacije.OIB_Korisnika,
            ID_Auta: oRezervacije.ID_Auta
        });
    });
});

function SlobodniAutomobili() {
    dostupni.innerHTML = ''
    aAutomobil.forEach(function (oAutomobil) {
        const {
            ID_aKey,
            Marka,
            Model,
            Oznaka,
            DatumRegistracije,
            CijenaNajma,
            DatumOdNajam,
            DatumDoNajam,
            Mjenjac,
            Motor,
            Slika,
            Posuden
        } = oAutomobil

        let autoEl = document.createElement('div')

        if (Posuden === 0) {
            autoEl = document.createElement('div')
            autoEl.classList.add('vozilo')
            autoEl.innerHTML = `
        <img src="${Slika}" alt="${Marka+Model}">
        <div class="info">

        <div class="namemodel">
            <div class="name">${Marka}</div>
            <div class="model">${Model}</div>
        </div>
        <div class="infomodel">
        <div class="motor">${Mjenjac}</div>
        <div class="mjenjac">${Motor}</div>
        </div>

        <div class="cijena">
            <div class="left">
                <span>Po danu:</span>
                ${CijenaNajma} HRK
            </div>
        </div>



        <button id="odaberi" class="odaberi" onclick="RezervirajForm('${ID_aKey}')">ODABERI</button>
    </div>
    `
        } else {

            console.log('blank')
        }
        dostupni.appendChild(autoEl)
    });
}

function PopuniAutomobile() {
    dostupni.innerHTML = ''
    aAutomobil.forEach(function (oAutomobil) {
        const {
            ID_aKey,
            Marka,
            Model,
            Oznaka,
            DatumRegistracije,
            CijenaNajma,
            DatumOdNajam,
            DatumDoNajam,
            Mjenjac,
            Motor,
            Slika,
            Posuden
        } = oAutomobil
        const autoEl = document.createElement('div')
        autoEl.className = 'vozilo'
        if (Posuden === 1) {
            autoEl.innerHTML = `
            <img src="${Slika}" alt="${Marka+Model}">
            <div class="info">
    
            <div class="namemodel">
                <div class="name">${Marka}</div>
                <div class="model">${Model}</div>
            </div>

            <div class="infomodel">
            <div class="motor">${Mjenjac}</div>
            <div class="mjenjac">${Motor}</div>
            </div>
    
            <div class="cijena">
                <div class="left">
                    <span>Po danu:</span>
                    ${CijenaNajma} HRK
                </div>
            </div>
    
             <button class="odaberi" disabled>NEDOSTUPNO</button>
        </div>
            `
        } else {
            autoEl.innerHTML = `
        <img src="${Slika}" alt="${Marka+Model}">
        <div class="info">

        <div class="namemodel">
            <div class="name">${Marka}</div>
            <div class="model">${Model}</div>
        </div>
        <div class="infomodel">
        <div class="motor">${Mjenjac}</div>
        <div class="mjenjac">${Motor}</div>
        </div>

        <div class="cijena">
            <div class="left">
                <span>Po danu:</span>
                ${CijenaNajma} HRK
            </div>
        </div>



        <button id="odaberi" class="odaberi" onclick="RezervirajForm('${ID_aKey}',' ${Marka}', '${CijenaNajma}')">ODABERI</button>
    </div>
        `
        }
        dostupni.appendChild(autoEl)
    });
}

function RezervirajForm(_vKey, _Marka, _Cijena) {
    let modalAdd = document.getElementById("rezervirajAuto")
    modalAdd.style.display = "block"

    $("#rezerviraj-automobil-forma").append('<button class="dodaj" onclick="Rezerviraj(' + "'" + _vKey + "'" + ')">REZERVIRAJ VOZILO</button>')

    aAutomobil.forEach((oAutomobil) => {
        const {
            ID_aKey,
            Marka,
            Model,
            Oznaka,
            DatumRegistracije,
            CijenaNajma,
            Mjenjac,
            Motor,
            Slika,
            Posuden
        } = oAutomobil

        if (ID_aKey === _vKey) {
            $('#rezervacijaVozilo').val(_Marka);
            $('#rezervacijaCijena').val(_Cijena);
        }
    })

    window.onclick = function (event) {
        if (event.target == modalAdd) {
            modalAdd.style.display = "none"
            window.location.reload()
        }
    }
}

function Rezerviraj(_vKey) {
    let _Ime = document.getElementById('rezervacijaIme').value;
    let _Prezime = document.getElementById('rezervacijaPrezime').value;
    let _Oib = document.getElementById('rezervacijaOIB').value;
    let _Mobitel = document.getElementById('rezervacijaMobitel').value;
    let _Mail = document.getElementById('rezervacijaEmail').value;
    let _sKey = firebase.database().ref().child('Korisnik').push().key;

    let _postojiOIB = false

    let oKorisnik = {
        ID_kKey: _sKey,
        Ime: _Ime,
        Prezime: _Prezime,
        OIB: _Oib,
        Mobitel: _Mobitel,
        Email: _Mail
    };

    firebase.database().ref().child('Korisnik').orderByChild('OIB').equalTo(_Oib).on("value", function (snapshot) {
        snapshot.forEach(function (data) {
            childData = data.val()
            if (childData.OIB == _Oib) {
                _postojiOIB = true
            }
        })
    })

    if (_postojiOIB == true) {
        console.log("postoji ovaj oib")
    } else if (_postojiOIB == false) {
        //zapisi novog korisnika
        let oZapis = {};
        oZapis[_sKey] = oKorisnik;
        oDbKorisnik.update(oZapis);
    }

    //Zapiši posudbu u 1
    firebase.database().ref().child('Automobil').orderByChild('ID_aKey').equalTo(_vKey).on("value", function (snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function (data) {
            childData = data.val()
            let Posuden = childData.Posuden = 1
            data = {
                Posuden
            }
            firebase.database().ref().child('Automobil/' + _vKey).update(data)
        })
    })

    //ZAPIS REZERVACIJE
    ZapisRezervacije(_vKey, _Oib)
}

function ZapisRezervacije(vozilo, oib) {
    let _rKey = firebase.database().ref().child('Rezervacije').push().key;
    let rezervacija = 1

    let oRezervacija = {
        OIB_Korisnika: oib,
        ID_Auta: vozilo,
        ID_rKey: _rKey,
        Rezervacija: rezervacija
    }

    let oZapis = {};
    oZapis[_rKey] = oRezervacija;
    oDbRezervacije.update(oZapis);
}