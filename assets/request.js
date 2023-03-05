const requestCoins = async (value) => {
  const baseURL = `https://api.coinlore.net/api/tickers/?start=0&limit=100`;
  const response = await fetch(baseURL);
  const json = await response.json();

  const data = json.data;

  const results = value
    ? divideArray(
        data.filter((coin) =>
          coin.name.toLowerCase().includes(value.toLowerCase())
        ),
        10
      )
    : divideArray(data, 10);

  return{
    results:results,
    total:results.length,
    current:0,
    prev:null,
    next:1,
  }
};

function divideArray(arr, size) {
  // Declaramos un array vacio
  let chunk = [];

  for (let i = 0; i < arr.length; i += size) {
    // Push al array vacio, el tramo desde el indice del loop hasta el valor size + el indicador
    chunk.push(arr.slice(i, i + size));
  }

  return chunk;
}

