import './App.css';
import api from './apiservices'
import { Component } from 'react';
import { Card, Button } from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
       dataCharacters: null,
       dataComics: null,
    }
    this.getCharacters = this.getCharacters.bind(this)
  }

  componentDidMount() {
    this.getCharacters()
  }

  getCharacters = async () => {
    this.setState({dataComics: null})
    await api.getCharacters()
      .then(response => this.setState({dataCharacters: response.data.data.results}))
  }

  getComics = async (characterId) => {
    await api.getComics(characterId)
      .then(response => this.setState({dataComics: response.data.data.results}))
  }

  render() {
    const listCharacters = 
      this.state.dataCharacters 
        ?
      this.state.dataCharacters.map((elem) => (
        <Card key={elem.id}>
          <Card.Img variant="top" src={elem.thumbnail.path + "/portrait_medium.jpg"} />
          <Card.Body>
            <Card.Title>{elem.name}</Card.Title>
            <Button onClick={() => this.getComics(elem.id)} variant="primary">See comics</Button>
          </Card.Body>
        </Card>
      ))
        :
      null

    const listComics =
      <div>
        <div className="Back">
          <Button onClick={() => this.setState({dataComics: null})} variant="primary">Back</Button>
        </div>
        {this.state.dataComics
          ?
        this.state.dataComics.map((elem) => (
            <Card key={elem.id}>
              <Card.Img variant="top" src={elem.thumbnail.path + "/portrait_medium.jpg"} />
              <Card.Body>
                <Card.Title>{elem.title}</Card.Title>
              </Card.Body>
            </Card>
        ))
          :
        null}
      </div>

    return (
      <div className="App">
        <div>
          {this.state.dataCharacters && this.state.dataComics == null ? listCharacters : null}
          {this.state.dataComics ? listComics : null}
        </div>
      </div>
    );
  }
}

export default App;
