import React from 'react';
import { Grid, Header, Icon, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className="code-landing-background" >
        <Grid divided='vertically' id='landing-page' verticalAlign='middle' textAlign='center' container>
          <Grid.Row columns={2}>
            <Grid.Column width={10}>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as='h1' inverted>Welcome to UH Code Submissions!</Header>
              <Header as='h4' inverted>A platform to prepare for technical interviews with challenging problems and quick feedback.</Header>
              <Header as='h4' inverted>In conjunction with PANDA, Programing and Algorithms Club!</Header>
              <Image src='../../../public/images/Panda.png' className="ui small image" centered />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={3}>
            <Grid.Column textAlign='center'>
              <Icon size="huge" name="search" inverted/>
              <Header as='h2' inverted>Search for Problems</Header>
              <Header as='h3' inverted/>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Icon size="huge" name="pencil" inverted/>
              <Header as='h2' inverted>Write Solutions</Header>
              <Header as='h3' inverted/>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Icon size="huge" name="file alternate" inverted/>
              <Header as='h2' inverted>Get Immediate Feedback</Header>
              <Header as='h3' inverted/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

    );
  }
}

export default Landing;
