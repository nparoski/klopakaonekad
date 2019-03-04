let menu = document.getElementById('menu-main');
let output = document.getElementById('menu-output');

menu.addEventListener('click', function (e) {
  switch (e.target.id) {
    case "menu-kuvana":
      output.innerHTML = `
      <ol class="mt-3 pl-3">
        <li>Testo sa krompirom 79din/100gr</li>
        <li>Gulas 79din/100gr</li>
        <li>Grasak sa belim mesom 65din/100gr</li>
        <li>Boranija 45din/100gr</li>
        <li>Rizoto sa crvenim pasuljom 50din/100gr</li>
        <li>Belo meso sa sampinjonima 75din/100gr</li>
        <li>Pileca supa 30din/100gr</li>
      </ol>`;
      break;
    case "menu-pecena":
      output.innerHTML = `
      <ol class="mt-3 pl-3">
        <li>Lazanje 79din/100gr</li>
        <li>Svinjska rebarca 99din/100gr</li>
        <li>Piletina na meksicki nacin 75din/100gr</li>
        <li>Pohovani kackavalj 99din/100gr</li>
        <li>Pohovano belo meso 99din/100gr</li>
        <li>Pohovano belo meso sa susamom 99din/100gr</li>
        <li>Karadjordjeve 119din/100gr</li>
        <li>Grilovano belo meso 119din/100gr</li>
      </ol>`;
      break;
    case "menu-prilozi":
      output.innerHTML = `
      <ol class="mt-3 pl-3">
        <li>Pire krompir 35din/100gr</li>
        <li>Testenina 20din/100gr</li>
        <li>Pomfrit 70din/100gr</li>
        <li>Peceni krompirici 50din/100gr</li>
        <li>Spanat 45din/100gr</li>
        <li>Kupus salata 30din/100gr</li>
        <li>Hleb 10din/3kom</li>
      </ol>`;
      break;
    case "menu-dezerti":
      output.innerHTML = `
      <ol class="mt-3 pl-3">
        <li>Pita sa jabukom 60din/100gr</li>
      </ol>`;
      break;
    default:
      
  }
});