import React, { Component } from 'react';
import { Container, Header, Accordion, Icon, Divider} from 'semantic-ui-react';

// Components
import Nav  from './Nav';
import CourseList from './CourseList';
import SectionList from './SectionList';
import TermList from './TermList';
import NoteList from './NoteList';

export default class Main extends Component {
  state = { 
    activeIndex: -1,
    courses:  {data: null, count: 0},
    sections: {data: null, count: 0},
    terms:    {data: null, count: 0},
    notes:    {data: null, count: 0}
  }

  componentDidMount() {
    this.fetchAllLists();
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  fetchListHandler = type => {
    this.props.api[type].all()
      .then(res => {
        this.setState({ [type]: {data: [...res.data], count: res.data.length} });
      })
      .catch(err => this.props.errState('set', err));
  }

  fetchAllLists = () => {
    ['courses', 'sections', 'notes', 'terms']
      .forEach(i => this.fetchListHandler(i));
  }

  render() {
    const { activeIndex, courses, sections, notes, terms } = this.state;
    const iconSize = 'large';
    return (
      <div>
        <Nav api={this.props.api} updateList={this.fetchListHandler} user={this.props.user} userState={this.props.userState} errState={this.props.errState}/>
        <Container align='center'>
          <Accordion>
            <Accordion.Title active={activeIndex === 0} index={0} onClick={this.handleClick}>
              <Icon name='book' size={iconSize}/>
              <span>Courses: {courses.count}</span>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <CourseList api={this.props.api} data={courses.data} updateList={this.fetchListHandler}/>
            </Accordion.Content>
            <Divider />

            <Accordion.Title active={activeIndex === 1} index={1} onClick={this.handleClick}>
              <Icon name='bookmark' size={iconSize}/>
              <span>Sections: {sections.count}</span>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <SectionList api={this.props.api} data={sections.data} updateList={this.fetchListHandler}/>
            </Accordion.Content>
            <Divider />

            <Accordion.Title active={activeIndex === 2} index={2} onClick={this.handleClick}>
              <Icon name='pencil' size={iconSize}/>
              <span>Notes: {notes.count}</span>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 2}>
              <NoteList api={this.props.api} data={notes.data} updateList={this.fetchListHandler}/>
            </Accordion.Content>
            <Divider />

            <Accordion.Title active={activeIndex === 3} index={3} onClick={this.handleClick}>
              <Icon name='question' size={iconSize}/>
              <span>Terms: {terms.count}</span>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 3}>
              <TermList api={this.props.api} data={terms.data} updateList={this.fetchListHandler}/>
            </Accordion.Content>
            <Divider />
          </Accordion>
        </Container>

        <Container align='left' text>
          <Header as='h2'>Welcome to pratiquez!</Header>
          <Header as='h4'>A Study Application</Header>
          <p>
            This application is currently in production with many features lacking. Mainly, its study feature.
            However, the architecture of this tool is at a minimal point to where you may test out building items (courses, sections, etc).
            To begin, use the '+' symbol in the navigation menu to create items.
          </p>
        </Container>

      </div>
    )
  }
}
