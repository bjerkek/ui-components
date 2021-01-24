import './App.css';
import '@ui-components/button'
import '@ui-components/amount-input'
import '@ui-components/number-input'
import '@ui-components/text-input'
import '@ui-components/checkbox'
import '@ui-components/date-input'
import '@ui-components/label'

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
      <br />
      <br />
      <br />
      <ui-text-input />
      <br />
      <br />
      <br />
      <ui-checkbox>Label</ui-checkbox>
      <br />
      <br />
      <br />
      <ui-date-input showpicker locale="no" />
      <br />
      <br />
      <br />
      <ui-label label="This is a label" />
      <br />
      <ui-label label="This is a label" sublabel="With sublabel" />
    </div>
  );
}

export default App;
