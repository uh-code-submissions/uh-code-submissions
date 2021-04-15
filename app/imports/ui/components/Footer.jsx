import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px', color: 'black' };
    return (
      <footer>
        <div style={divStyle} className="ui center aligned container">
          <hr />
            Copyright @ UH Code Submissions <br />
            University of Hawaiʻi at Mānoa <br />
          <a href="https://github.com/uh-code-submissions">Check out our GitHub!</a>
        </div>
      </footer>
    );
  }
}

export default Footer;
