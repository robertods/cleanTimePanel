const tabla = document.getElementById('tabla');

// Registro del service worker para página offline
window.addEventListener('load', () => {
  if("serviceWorker" in navigator){
    navigator.serviceWorker.register('sw_offline.js')
      .then(registration=>{
        console.log("Service worker offline registrado");
        console.log("Scope: " + registration.scope);
      }, error=>{
        console.log("Service worker offline ha fallado");
        console.log(err);
      });
  }  
});

const registrosRef = db.collection('registros');

registrosRef
.onSnapshot( snap => {
  console.log(snap)
  let registros = [];
  snap.forEach( snapHijo => {
    registros.push({
      id: snapHijo.id,
      ...snapHijo.data(),
      receivedTime: formateaFecha(snapHijo.data().receivedTime),
      registerTime: formateaFecha(snapHijo.data().registerTime)
    });
  });
  console.log(registros);
  registros = registros.sort((a, b) => (a.receivedTime < b.receivedTime) ? 1 : -1);
  tabla.innerHTML = "";

  const frag = document.createDocumentFragment();
  registros.forEach(reg => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${reg.receivedTime}</td>
      <td>${reg.dni}</td>
      <td>${reg.type}</td>
      <td>${reg.position.lat}</td>
      <td>${reg.position.lng}</td>
      <td>${reg.registerTime}</td>
    `;
    frag.appendChild(tr);
  });
  tabla.appendChild(frag);

});

function formateaFecha(fecha){
  let res =  moment(fecha.toDate())
                  .format()
                  .replace("T", " ")
                  .replace("-03:00", "");
  return res;
}