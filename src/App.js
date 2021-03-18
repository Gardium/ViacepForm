import "./App.css";
import React, { useState } from "react";

function App() {
  const [logradouro, setLogradouro] = useState(null);
  const [bairro, setBairro] = useState(null);
  const [cidade, setCidade] = useState(null);
  const [uf, setUf] = useState(null);
  const [numero, setNumero] = useState(null);
  const [isValid, setisValid] = useState(false);

  function limpar() {
    setBairro("");
    setCidade("");
    setLogradouro("");
    setUf("");
  }

  function isEmpty(e) {
    const { value } = e.target;

    if (value?.split() !== "") {
      setNumero(value);
    }
  }
  function onFocusCep(e) {
    e.target.style.border = "3px solid transparent";
  }
  function onBlurCep(ev) {
    const { value } = ev.target;

    const cep = value?.replace(/[^0-9]/g, "");
    if (cep?.length !== 8) {
      ev.target.style.border = "3px solid #df4759";
      limpar();

      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.erro) {
          ev.target.style.border = "3px solid #df4759";
          limpar();
          return;
        }
        setLogradouro(data.logradouro);
        setCidade(data.localidade);
        setBairro(data.bairro);
        setUf(data.uf);
      })
      .then(() => {
        setisValid(true);
      });
  }
  return (
    <div className="App">
      <form>
        <div className="tresCampos">
          <div className="container">
            <label>Cep</label>
            <input
              onChange={onFocusCep}
              onBlur={onBlurCep}
              placeholder="00000-000"
              name="cep"
              type="text"
            ></input>
          </div>

          <div className="container">
            <label>Logradouro</label>
            <input
              value={logradouro}
              name="logradouro"
              readonly={true}
              type="text"
            ></input>
          </div>

          <div className="container">
            <label>Numero</label>
            <input
              onBlur={isEmpty}
              readonly={!isValid}
              name="numero"
              type="text"
            ></input>
          </div>
        </div>
        <div className="doisCampos">
          <div className="container">
            <label>Complemento</label>
            <input readonly={!isValid} name="complemento" type="text"></input>
          </div>

          <div className="container">
            <label>Bairro</label>

            <input
              readonly={true}
              value={bairro}
              name="bairro"
              type="text"
            ></input>
          </div>
        </div>
        <div className="umCampoEUmSelect">
          <div className="container">
            <label>Cidade</label>
            <input
              readonly={true}
              value={cidade}
              name="cidade"
              type="text"
            ></input>
          </div>
          <div className="container">
            <label>UF</label>
            <select readonly={true} value={uf} name="uf">
              <option value="">-</option>
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MS">MS</option>
              <option value="MT">MT</option>
              <option value="MG">MG</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RR</option>
              <option value="SC">SC</option>
              <option value="SP">SP</option>
              <option value="SE">SE</option>
              <option value="TO">TO</option>
            </select>
          </div>
        </div>
        <div>
          <button type="submit" disabled={!isValid || !numero}>
            Enviar
          </button>
          <button onClick={limpar} type="reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
