import './App.css';
import '@ui-components/button'
import '@ui-components/amount-input'
import '@ui-components/number-input'
import '@ui-components/text-input'
import '@ui-components/checkbox'
import '@ui-components/date-input'
import '@ui-components/label'
import '@ui-components/switch'
import '@ui-components/dropdown'
import '@ui-components/textarea'

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
      <br />
      <ui-switch>Label</ui-switch>
      <br />
      <br />
      <br />
      <ui-dropdown
          searchable
          searchablesubtitle
          placeholder="Search..."
          emptysearchtext="Sorry, no result"
        >
          <ui-dropdown-option
            selected
            value='-1'
          >
            Please choose an option
          </ui-dropdown-option>
          <ui-dropdown-option
            value='944521836'
            subtitle='944521836'
          >
            SPAREBANK 1 BV
          </ui-dropdown-option>
          <ui-dropdown-option
            value='937888015'
            subtitle='937888015'
          >
            SPAREBANK 1 LOM OG SKJÅK
          </ui-dropdown-option>
          <ui-dropdown-option
            value='937899408'
            subtitle='937899408'
          >
            SPAREBANK 1 NORDVEST
          </ui-dropdown-option>
        </ui-dropdown>
        <br />
        <br />
        <ui-textarea maxlength="900" errormessage="Something is wrong"></ui-textarea>
    </div>
  );
}

export default App;
