import { Component } from 'react';

class App extends Component {
  render() {
    return (
      <main>
        <section aria-label="Character search">
          <h1>Character Explorer</h1>
          <p>Search panel will be added in the next steps.</p>
        </section>

        <section aria-label="Search results">
          <h2>No characters loaded yet</h2>
          <p>Results will appear here after the first portal opens.</p>
        </section>
      </main>
    );
  }
}

export default App;
