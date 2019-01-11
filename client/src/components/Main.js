import React, { Component } from 'react';
import { Container, Header, Accordion, Icon, Divider} from 'semantic-ui-react'

export default class Main extends Component {
  state = { 
    activeIndex: -1,
    courses: 0,
    sections: 0,
    notes: 0,
    terms: 0
  }
  componentDidMount() {
    const { api } = this.props;
    this.setCount();
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
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
      courses: courses.length,
      sections: sections.length,
      notes: notes,
      terms: terms
    });
  }

  render() {
    const { activeIndex, courses, sections, notes, terms } = this.state;
    const iconSize = 'large';
    return (
      <Container align='center'>
        <Accordion>
          <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
            <Icon name='book' size={iconSize}/>
            <span>Courses: {courses}</span>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 0}>
            <p>
              courses listed
            </p>
          </Accordion.Content>
          <Divider />

          <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
            <Icon name='bookmark' size={iconSize}/>
            <span>Sections: {sections}</span>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 1}>
            <p>
              sections listed
            </p>
          </Accordion.Content>
          <Divider />

          <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
            <Icon name='pencil' size={iconSize}/>
            <span>Notes: {notes}</span>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === 2}>
            <p>
              notes listed
            </p>
          </Accordion.Content>
          <Divider />

          <Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
            <Icon name='question' size={iconSize}/>
            <span>Terms: {terms}</span>
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
