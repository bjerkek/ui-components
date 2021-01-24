import './App.css';
import '@ui-components/button'
import '@ui-components/amount-input'
import '@ui-components/number-input'

function App() {
  const onClick = () => {
    console.log('button clicked')
  }

  return (
    <div className="App">
      <ui-button>My button</ui-button>
      <br />
      <br />
      <br />
      <ui-button kind="primary">My button</ui-button>
      <br />
      <br />
      <br />
      <ui-button kind="primary" disabled onClick={() => onClick()}>My button</ui-button>
      <br />
      <br />
      <br />
      <ui-amount-input allowdecimals errormessage="Something is wrong" />
      <br />
      <br />
      <br />
      <ui-number-input />
    </div>
  );
}

export default App;
