import React from 'react';
import Notes from './Notes';
import uuid from 'uuid'
import connect from '../libs/connect'


class App extends React.Component {

  render() {
    const {notes} = this.props

    return (
      <div>
        <button onClick={this.addNote}>+</button>
        <Notes
          notes={notes}
          onNoteClick={this.activateNoteEdit}
          onEdit={this.editNote}
          onDelete={this.deleteNote}
          />
      </div>
    )
  }
  addNote = () => {
    // It would be possible to write this in an imperative style.
    // I.e., through `this.state.notes.push` and then
    // `this.setState({notes: this.state.notes})` to commit.
    //
    // I tend to favor functional style whenever that makes sense.
    // Even though it might take more code sometimes, I feel
    // the benefits (easy to reason about, no side effects)
    // more than make up for it.
    //
    // Libraries, such as Immutable.js, go a notch further.
    this.setState({
      notes: [...this.state.notes,
        {
          id: uuid.v4(),
          task: 'New Task'
        }
    ]})
  }
  deleteNote = (id, e) => {
    e.stopPropagation()

    this.setState({
      notes: this.state.notes.filter(note => note.id !== id)
    })
  }
  activateNoteEdit = (id) => {
    this.setState({
      notes: this.state.notes.map(note => {
        if(note.id === id) {
          note.editing = true
        }
        return note
      })
    })
  }
  editNote = (id, task) => {
    this.setState({
      note: this.state.notes.map(note => {
        if(note.id) {
          note.editNote = false
          note.task = task
        }
        return note
      })
    })
  }
}

export default connect(({notes}) => ({
  notes
}))(App)
