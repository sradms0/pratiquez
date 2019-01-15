import React from 'react'
import { List } from 'semantic-ui-react'

import TermItem from './TermItem';

export default function TermList(props) {
  if (props.data) {
    const results = props.data;
    let termItems = results.map(termData => 
      <TermItem api={props.api} term={termData} updateList={props.updateList} key={termData._id}/>
    );
    return (
      <List divided relaxed>
        {termItems}
      </List>
        
    );
  }
  return null;
}
