import React from 'react';
import { Grid, Header, Icon, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
      <div className="code-background" >
        <Grid divided='vertically' id='landing-page' verticalAlign='middle' textAlign='center' container>
          <Grid.Row columns={2}>
            <Grid.Column width={10}>
            </Grid.Column>
            <Grid.Column width={8}>
              <h1 className="main-title">Welcome to UH Code Submissions!</h1>
              <Header as='h4' inverted>A platform to prepare for technical interviews with challenging problems and quick feedback.</Header>
              <Header as='h4' inverted>In conjunction with PANDA, Programing and Algorithms Club!</Header>
            </Grid.Column>
          </Grid.Row>
          <Image src='https://raw.githubusercontent.com/uh-code-submissions/uh-code-submissions/main/app/public/images/Panda.png' className="ui large image" centered />
          <Grid.Row columns={3}>
            <Grid.Column textAlign='center'>
              <Icon size="huge" name="search" inverted/>
              <Header as='h2' inverted>Search for Problems</Header>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Icon size="huge" name="pencil" inverted/>
              <Header as='h2' inverted>Write Solutions</Header>
            </Grid.Column>
            <Grid.Column textAlign='center'>
              <Icon size="huge" name="file alternate" inverted/>
              <Header as='h2' inverted>Get Immediate Feedback</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>

    );
  }
}

export default Landing;
