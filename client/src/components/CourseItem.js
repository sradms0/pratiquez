import React from 'react'
import { Card } from 'semantic-ui-react'

export default function CourseItem(props){
  return (
    <Card
      link
      header={props.course.title}
      meta={`Sections: ${props.course.sections.length}`}    
    />
  )
}
