import React from 'react'
import { List } from 'semantic-ui-react'

import NoteItem from './NoteItem';

export default function NoteList(props) {
  if (props.data) {
    const results = props.data;
    let noteItems = results.map(noteData => 
      <NoteItem api={props.api} note={noteData} updateList={props.updateList} key={noteData._id}/>
    );
    return (
      <List divided relaxed>
        {noteItems}
      </List>
        
    );
  }
  return null;
}
