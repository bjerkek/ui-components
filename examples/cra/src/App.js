import './App.css';
import '@ui-components/button'

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
    </div>
  );
}

export default App;
