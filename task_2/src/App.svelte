<script lang="ts">
  let selected: any;
  let base = {
    answer: 1,
    ready: 1
  }

  const getterApi = (async () => {
    const arr: any = [];
    await fetch("https://open.er-api.com/v6/latest/USD")
            .then(res => res.json())
            .then(data => {
              for (let key in data.rates) {
                if (key !== "USD") arr.push({
                  id: Math.floor(Math.random() * 10000) + 1,
                  cur: key,
                  value: data.rates[key]
                })
              }
            })
            .catch(err => console.log(err));
    return arr;
  })();

</script>

<main>
  <h1>Конвертер валюты</h1>
  <div class="converter-main">
    <div class="titles">
      <div class="titles__usd">USD</div>
      <div class="titles__result">
        {#await getterApi}
          <p>...waiting</p>
        {:then data}
          <form>
            <select
                    bind:value={selected}
                    on:change={() => {
                            base.answer = +(selected.value * base.ready).toFixed(3);
                        }}
            >
              {#each data as currency}
                <option value={currency}>
                  {currency.cur}
                </option>
              {/each}
            </select>
          </form>
        {/await}
      </div>
    </div>
    <div class="inputs">
      <input bind:value={base.ready} on:input={() => {
            base.answer = +(base.ready * selected.value).toFixed(3);
        }} type="number"/>
      <input bind:value={base.answer} on:input={() => {
            base.ready = +(base.answer / selected.value).toFixed(3);
        }} type="number"/>
    </div>
  </div>
</main>

<style>
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    row-gap: 2em;
    background: radial-gradient(99.45% 80.89% at 86.05% 2.8%, #5621d5 0%, #040d1c 100%);
    padding: 15%;
    border-radius: 2em;
    box-shadow: 0 0 2em rgba(0, 0, 0, 0.5);
    color: white;
    font-family: Arial, sans-serif;
    @media (max-width: 810px) {
      font-size: .7em;
    }
    width: 30%;
    text-align: center;
    min-width: 10%;
  }
  input,
  select {
    @media (max-width: 810px) {
      font-size: .7em;
    }
  }

  h1 {
    color: #23dbb0;
  }

  .converter-main {
    display: flex;
    flex-direction: column;
    row-gap: 1.3em;
    background: linear-gradient(84deg, rgba(108, 43, 255, 0.3) 3.94%, rgba(121, 61, 255, 0) 99.55%);
    padding: 3em;
    border-radius: 2em;
    border: 1px solid #5423ca;
    width: 75%;
  }

  .titles,
  .inputs {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-weight: bold;
  }

  .titles__result select {
    font-weight: bold;

  }
  .inputs input {
    outline: none;
    padding: .5em 0;
    border-radius: .3em;
    text-align: center;
    color: #23dbb0;
    border: none;
    font-weight: 600;
    max-width: 40%;
  }
</style>
