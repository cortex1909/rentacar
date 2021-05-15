/* -----------------  VOZILA  ----------------- */

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
            DatumOdNajam: oAutomobil.DatumOdNajam,
            DatumDoNajam: oAutomobil.DatumDoNajam,
            Mjenjac: oAutomobil.Mjenjac,
            Motor: oAutomobil.Motor,
            Slika: oAutomobil.Slika,
            Posuden: oAutomobil.Posuden
        });
    });
    adminPopuniAutomobile()
});

function adminPopuniAutomobile() {
    let tableVozila
    aAutomobil.forEach(function (oAutomobil) {
        const {
            ID_aKey,
            Marka,
            Model,
            Oznaka,
            DatumRegistracije,
            CijenaNajma,
            Mjenjac,
            Motor,
            Posuden
        } = oAutomobil


        if (Posuden === 1) {
            $('#table_body_vozila').append('<tr style="color:#ff0000";><td>' + Marka + '</td><td>' + Model + '</td><td>' + Motor + '</td><td>' + Mjenjac + '</td><td>' + DatumRegistracije + '</td><td>' + Oznaka + '</td><td>' + CijenaNajma + ' HRK</td> <td><button onclick="UrediAutomobilForm(' + "'" + ID_aKey + "'" + ')" ><span class="material-icons">edit</span></button></td>' + '<td><button disabled><span class="material-icons">delete</span></button></td></tr> ');
        } else {
            $('#table_body_vozila').append('<tr><td>' + Marka + '</td><td>' + Model + '</td><td>' + Motor + '</td><td>' + Mjenjac + '</td><td>' + DatumRegistracije + '</td><td>' + Oznaka + '</td><td>' + CijenaNajma + ' HRK</td> <td><button onclick="UrediAutomobilForm(' + "'" + ID_aKey + "'" + ')" ><span class="material-icons">edit</span></button></td>' + '<td><button onclick="IzbrisiAutomobil(' + "'" + ID_aKey + "'" + ')"><span class="material-icons">delete</span></button></td></tr> ');
        }

    })

    $(document).ready(function () {
        tableVozila = $('#adminPopuniAutomobile').DataTable()
    })
}

function DodajAutomobilForm() {
    let modalAdd = document.getElementById("dodajAutoModal")
    modalAdd.style.display = "block"

    window.onclick = function (event) {
        if (event.target == modalAdd) {
            modalAdd.style.display = "none"
        }
    }
}

function DodajAutomobil() {
    let _iznajmljen = 0;
    let _defaultDatum = '01/01/2020'
    let _Marka = document.getElementById('marka').value;
    let _Model = document.getElementById('model').value;
    let _Oznaka = document.getElementById('oznaka').value;
    let _Registracija = document.getElementById('registracija').value;
    let _Cijenanajma = document.getElementById('cijenanajma').value;
    let _Mjenjac = document.getElementById('mjenjac').value;
    let _Motor = document.getElementById('motor').value;
    let _Slika = document.getElementById('slika').value;
    let _sKey = firebase.database().ref().child('Automobil').push().key;

    let oAuto = {
        ID_aKey: _sKey,
        Marka: _Marka,
        Model: _Model,
        Oznaka: _Oznaka,
        DatumRegistracije: _Registracija,
        CijenaNajma: _Cijenanajma,
        DatumOdNajam: _defaultDatum,
        DatumDoNajam: _defaultDatum,
        Mjenjac: _Mjenjac,
        Motor: _Motor,
        Slika: _Slika,
        Posuden: _iznajmljen
    };

    // Zapiši u Firebase
    let oZapis = {};
    oZapis[_sKey] = oAuto;
    oDbAutomobil.update(oZapis);
    /* location.reload(); */
}


function UrediAutomobilForm(sKey) {
    /*     let btnUredi = document.getElementById('posaljiUredi')
        btnUredi.addEventListener('click', SendUrediAutomobil(sKey)) */
    let modalRow = document.getElementById("rowAutoModal")
    modalRow.style.display = "block";

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

        if (ID_aKey === sKey) {
            $('#markaInput').val(Marka);
            $('#modelInput').val(Model);
            $('#oznakaInput').val(Oznaka);
            $('#registracijaInput').val(DatumRegistracije);
            $('#cijenanajmaInput').val(CijenaNajma);
            $('#mjenjacInput').val(Mjenjac);
            $('#motorInput').val(Motor);
            $('#slikaInput').val(Slika);
        }
    })


    $("#uredi-automobil-forma").append('<button class="dodaj" onclick="UrediAutomobil(' + "'" + sKey + "'" + ')">UREDI AUTOMOBIL</button>')

    window.onclick = function (event) {
        if (event.target == modalRow) {
            modalRow.style.display = "none"
            window.location.reload()
        }
    }

}

function UrediAutomobil(sKey) {
    let newMarka = $('#markaInput').val();
    let newModel = $('#modelInput').val();
    let newOznaka = $('#oznakaInput').val();
    let newRegistracija = $('#registracijaInput').val();
    let newCijena = $('#cijenanajmaInput').val();
    let newMjenjac = $('#mjenjacInput').val();
    let newMotor = $('#motorInput').val();
    let newSlika = $('#slikaInput').val();
    var s = confirm('Želite li ažurirati podatke?')
    if (s == true) {
        oDbAutomobil.child(sKey).update({
            'Marka': newMarka,
            'Model': newModel,
            'Oznaka': newOznaka,
            'DatumRegistracije': newRegistracija,
            'CijenaNajma': newCijena,
            "Mjenjac": newMjenjac,
            "Motor": newMotor,
            "Slika": newSlika
        })
    }
}

function IzbrisiAutomobil(sKey) {


    let x = confirm('Jeste li sigurni da želite obrisati ovaj automobil?')
    if (x == true) {
        oDbAutomobil.child(sKey).remove()
        window.location.reload()
    }
}

/* -----------------  KORISNICI  ----------------- */

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
    adminPopuniKorisnike()
});


function adminPopuniKorisnike() {
    let tableKorisnici


    aKorisnik.forEach(function (oKorisnik) {
        const {
            ID_kKey,
            Ime,
            Prezime,
            OIB,
            Mobitel,
            Email
        } = oKorisnik

        $('#table_body_korisnici').append('<tr><td>' + Ime + '</td><td>' + Prezime + '</td><td>' + OIB + '</td><td>' + Mobitel + '</td><td>' + Email + '</td><td><button onclick="UrediKorisnikaForm(' + "'" + ID_kKey + "'" + ')" ><span class="material-icons">edit</span></button></td>' + '<td><button onclick="IzbrisiKorisnika(' + "'" + ID_kKey + "'" + ')"><span class="material-icons">delete</span></button></td></tr> ');

    })

    $(document).ready(function () {
        tableKorisnici = $('#adminPopuniKorisnike').DataTable()
    })
}


function DodajKorisnikaForm() {
    let modalAdd = document.getElementById("dodajKorisnikaModal")
    modalAdd.style.display = "block"

    window.onclick = function (event) {
        if (event.target == modalAdd) {
            modalAdd.style.display = "none"
        }
    }
}

function DodajKorisnika() {
    let _Ime = document.getElementById('ime').value;
    let _Prezime = document.getElementById('prezime').value;
    let _Oib = document.getElementById('oib').value;
    let _Mobitel = document.getElementById('mobitel').value;
    let _Mail = document.getElementById('mail').value;
    let _sKey = firebase.database().ref().child('Korisnik').push().key
    let oKorisnik = {
        ID_kKey: _sKey,
        Ime: _Ime,
        Prezime: _Prezime,
        OIB: _Oib,
        Mobitel: _Mobitel,
        Email: _Mail
    };

    // Zapiši u Firebase
    let oZapis = {};
    oZapis[_sKey] = oKorisnik;
    oDbKorisnik.update(oZapis);
    /* location.reload(); */
}


function UrediKorisnikaForm(sKey) {
    let modalRow = document.getElementById("editKorisnikaModal")
    modalRow.style.display = "block";

    aKorisnik.forEach(function (oKorisnik) {
        const {
            ID_kKey,
            Ime,
            Prezime,
            OIB,
            Mobitel,
            Email
        } = oKorisnik

        if (ID_kKey === sKey) {
            $('#imeInput').val(Ime);
            $('#prezimeInput').val(Prezime);
            $('#oibInput').val(OIB);
            $('#mobitelInput').val(Mobitel);
            $('#mailInput').val(Email);
        }
    })


    $("#uredi-korisnika-forma").append('<button class="dodaj" onclick="UrediKorisnika(' + "'" + sKey + "'" + ')">UREDI KORISNIKA</button>')

    window.onclick = function (event) {
        if (event.target == modalRow) {
            modalRow.style.display = "none"
            window.location.reload()
        }
    }

}

function UrediKorisnika(sKey) {
    let newIme = $('#imeInput').val();
    let newPrezime = $('#prezimeInput').val();
    let newOib = $('#oibInput').val();
    let newMobitel = $('#mobitelInput').val();
    let newMail = $('#mailInput').val();
    var s = confirm('Želite li ažurirati podatke?')
    if (s == true) {
        oDbKorisnik.child(sKey).update({
            'Ime': newIme,
            'Prezime': newPrezime,
            'OIB': newOib,
            'Mobitel': newMobitel,
            'Email': newMail
        })
    }
}

function IzbrisiKorisnika(sKey) {


    let x = confirm('Jeste li sigurni da želite obrisati ovog korisnika?')
    if (x == true) {
        oDbKorisnik.child(sKey).remove()
        window.location.reload()
    }
}

// REZERVACIJE

var aRezervacije = [];
oDbRezervacije.on('value', function (oOdgovorPosluzitelja) {
    aRezervacije = [];
    oOdgovorPosluzitelja.forEach(function (oRezervacijeSnapshot) {
        var rRezervacijeSnapshotKey = oRezervacijeSnapshot.key;
        var oRezervacije = oRezervacijeSnapshot.val();
        aRezervacije.push({
            ID_rKey: rRezervacijeSnapshotKey,
            OIB_Korisnika: oRezervacije.OIB_Korisnika,
            ID_Auta: oRezervacije.ID_Auta,
            Rezervacija: oRezervacije.Rezervacija
        });
    });
    adminPopuniRezervacije()
});

function adminPopuniRezervacije() {
    let tableRezervacije
    var listaRezervacija = aRezervacije.reduce((ac, x) => {
        var listaKorisnika = aKorisnik.find(z => z.OIB === x.OIB_Korisnika)
        if (!listaKorisnika) {
            console.log("Ne postoji")
            return ac
        }
        var res = Object.assign({}, x, listaKorisnika)
        ac.push(res)
        return ac
    }, [])

    var listaRezervacijaAuta = listaRezervacija.reduce((ac, x) => {
        var listaVozila = aAutomobil.find(z => z.ID_aKey === x.ID_Auta)
        if (!listaVozila) {
            console.log("Ne postoji")
            return ac
        }
        var res = Object.assign({}, x, listaVozila)
        ac.push(res)
        return ac
    }, [])

    listaRezervacijaAuta.forEach(function (oListaRezervacija) {
        const {
            ID_kKey,
            ID_aKey,
            ID_rKey,
            Ime,
            Prezime,
            OIB,
            Email,
            Mobitel,
            Marka,
            Oznaka,
            CijenaNajma,
            DatumOdNajam,
            DatumDoNajam,
            Posuden,
            Rezervacija
        } = oListaRezervacija

        if (Rezervacija == 0) {
            $('#table_body_rezervacije').append('<tr><td>' + Ime + '</td><td>' + Prezime + '</td><td>' + OIB + '</td><td>' + Mobitel + '</td><td>' + Email + '</td><td>' + Marka + '</td><td>' + Oznaka + '</td><td>' + DatumOdNajam + '</td><td>' + DatumDoNajam + '</td><td>' + CijenaNajma + '</td><td><button disabled><span class="material-icons">delete</span></button></td></tr> ');
        } else {
            $('#table_body_rezervacije').append('<tr style="color: #ff0000;"><td>' + Ime + '</td><td>' + Prezime + '</td><td>' + OIB + '</td><td>' + Mobitel + '</td><td>' + Email + '</td><td>' + Marka + '</td><td>' + Oznaka + '</td><td>' + DatumOdNajam + '</td><td>' + DatumDoNajam + '</td><td>' + CijenaNajma + '</td><td><button onclick="ZavrsiRezervaciju(' + "'" + ID_rKey + "'" + "," + "'" + ID_aKey + "'" + ')"><span class="material-icons">delete</span></button></td></tr> ');
        }

    })

    $(document).ready(function () {
        tableRezervacije = $('#adminPopuniRezervacije').DataTable()
    })
}

function ZavrsiRezervaciju(ID_rKey, ID_aKey) {
    let x = confirm('Jeste li sigurni da želite završiti rezervaciju za ovaj automobil?')
    firebase.database().ref().child('Rezervacije').orderByChild('ID_rKey').equalTo(ID_rKey).on("value", function (snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function (data) {
            childData = data.val()
            let Rezervacija = childData.Rezervacija = 0
            data = {
                Rezervacija
            }
            if (x == true) {
                firebase.database().ref().child('Rezervacije/' + ID_rKey).update(data)
                window.location.reload()
            }

        })
    })

    firebase.database().ref().child('Automobil').orderByChild('ID_aKey').equalTo(ID_aKey).on("value", function (snapshot) {
        console.log(snapshot.val());
        snapshot.forEach(function (data) {
            childData = data.val()
            let Posuden = childData.Posuden = 0
            data = {
                Posuden
            }
            firebase.database().ref().child('Automobil/' + ID_aKey).update(data)
        })
    })
}


/* 			'</td><td><button data-toggle="modal"data-target="#uredi-automobil" onclick="UrediAutomobilForma(' + "'" + aAutomobiliList[i].osoKey + "'" + ')"  class="btn btn-info" ><span  class="glyphicon glyphicon-edit"></span></button></td>'+'<td><button onclick="IzbrisiAutomobil(' + "'" + aAutomobiliList[i].osoKey+ "'" + ')" type="button" id="delete" class="btn btn-danger" ><span class="glyphicon glyphicon-trash"></span></button></td></tr> '); */