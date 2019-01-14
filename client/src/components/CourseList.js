import React from 'react'
import { Card, Icon } from 'semantic-ui-react'

import CourseItem from './CourseItem';

export default function CourseList(props) {
  if (props.data) {
    const results = props.data;
    let courseItems = results.map(courseData => 
      <CourseItem api={props.api} course={courseData} updateList={props.updateList} key={courseData._id}/>
    );
    return (
      <Card.Group centered>
        {courseItems}
      </Card.Group>
        
    );
  }
  return null;
}
