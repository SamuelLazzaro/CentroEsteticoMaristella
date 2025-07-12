window.addEventListener("DOMContentLoaded", () => {
  fetch('../prezzi.csv')
    .then(response => {
      if (!response.ok) throw new Error("Errore nel caricamento del file CSV");
      return response.text();
    })
    .then(csvText => aggiornaPrezziDaCSV(csvText))
    .catch(error => console.error("Errore:", error));
});

function aggiornaPrezziDaCSV(csvText) {
  const lines = csvText.split('\n').filter(line => line.trim() !== '');

  for (let i = 1; i < lines.length; i++) {
    const cells = lines[i].split(';');

    const id = cells[1]?.trim();        // Colonna B (indice 1)
    const prezzo = cells[2]?.trim();    // Colonna C (indice 2)

    if (!id || !prezzo) continue;

    const element = document.getElementById(`price-${id}`);
    if (element) {
      element.innerText = `${parseFloat(prezzo).toFixed(2)} €`;
    }
  }
}
