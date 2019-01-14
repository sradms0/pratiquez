import React from 'react'
import { List } from 'semantic-ui-react'

import SectionItem from './SectionItem';

export default function SectionList(props) {
  if (props.data) {
    const results = props.data;
    let sectionItems = results.map(sectionData => 
      <SectionItem api={props.api} section={sectionData} updateList={props.updateList} key={sectionData._id}/>
    );
    return (
      <List divided relaxed>
        {sectionItems}
      </List>
        
    );
  }
  return null;
}
