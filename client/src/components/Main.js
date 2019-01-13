import React, { Component } from 'react';
import { Container, Header, Accordion, Icon, Divider} from 'semantic-ui-react'

import CourseList from './CourseList'

export default class Main extends Component {
  state = { 
    activeIndex: -1,
    courses:  {data: null, count: 0},
    sections: {data: null, count: 0},
    terms:    {data: null, count: 0},
    notes:    {data: null, count: 0}
  }

  componentDidMount() {
    this.setCount();
  }

  handleClick = (e, titleProps) => {
    const { index, type } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
    
    this.fetchListHandler(type);
  }

  fetchListHandler(type) {
    return {
      'courses': this.coursesListHandler(),
    }
    [type];
  }

  coursesListHandler = e => {
    this.props.api.courses.all()
      .then(res => {
        this.setState({ courses: {data: [...res.data]} });
      })
      .catch(err => this.props.errState('set', err));
  }

  // get nested count of terms and notes from sections
  setCount = () => {
    const count = (obj, key) => (
      obj[ Object.keys(obj) [Object.keys(obj).indexOf(key)]  ].length
    );

    const { courses } = this.props.user
    const { sections } = courses[0];
    let terms = 0;
    let notes = 0;
    sections.forEach(i => {
      terms += count(i, 'terms');
      notes += count(i, 'notes');
    });

    this.setState({
      courses:  { count: courses.length },
      sections: { count: sections.length },
      notes:    { count: notes },
      terms:    { count: terms }
    });
  }

  render() {
    const { activeIndex, courses, sections, notes, terms } = this.state;
    const iconSize = 'large';
    return (
      <Container align='center'>
        <Accordion>
          <Accordion.Title type='courses' active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name='book' size={iconSize}/>
            <span>Courses: {courses.count}</span>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <CourseList api={this.props.api} data={this.state.courses.data}/>
          </Accordion.Content>
          <Divider />

          <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
            <Icon name='bookmark' size={iconSize}/>
            <span>Sections: {sections.count}</span>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <p>
              sections listed
            </p>
          </Accordion.Content>
          <Divider />

          <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
            <Icon name='pencil' size={iconSize}/>
            <span>Notes: {notes.count}</span>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <p>
              notes listed
            </p>
          </Accordion.Content>
          <Divider />

          <Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
            <Icon name='question' size={iconSize}/>
            <span>Terms: {terms.count}</span>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 3}>
            <p>
              terms listed
            </p>
          </Accordion.Content>
          <Divider />
        </Accordion>
      </Container>
    )
  }
}
