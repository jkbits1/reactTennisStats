import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

/*export default () => (
  <div>
    <p>info soon</p>
    <Link>
      <a href="">Wait a bit!</a>
    </Link>
  </div>
)*/

export default class extends React.Component {
  static async getInitialProps ({query}) {
    const id = +(query.id);

    debugger;

    if (!process.browser) {
      // server code
      console.log("svr id", id);
      console.log("svr props", this.props);

      const res = await axios.get('http://api.football-data.org/v1/competitions/426/leagueTable');

      return {
        data: res.data,
        standing: res.data.standing.filter(s => s.position === id)
      }
    } else {
      console.log("clnt id", id);
      console.log("clnt props", this.props);

      // client code
      const bplData = JSON.parse(sessionStorage.getItem('bpl'));

      return {
        standing: bplData.standing.filter(s => s.position === id)
      }
    }
  }

  componentDidMount () {
    if (!sessionStorage.getItem('bpl')) {
      console.log("session");

      sessionStorage.setItem('bpl', JSON.stringify(this.props.data));
    }
  }

  render() {
    const detailStyle = {
      ul: {
        marginTop: '100px'
      }
    }

    return (
      <div>
        <Head>
          <title>Info table</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="stylesheet" href="https://unpkg.com/purecss@0.6.1/build/pure-min.css"/>
        </Head>
        <div className="pure-g">
          <div className="pure-u-8-24"></div>
          <div className="pure-u-8-24">
            <h2>{this.props.standing[0].teamName}</h2>
            <img src={this.props.standing[0].crestURI} className="pure-img" alt="crest"/>
            <h3>Points: {this.props.standing[0].points}</h3>
            <div className="pure-u-12-24">
              <ul style={detailStyle.ul}>
                <li><strong>Goals</strong>: {this.props.standing[0].goals}</li>
                <li><strong>Wins</strong>: {this.props.standing[0].wins}</li>
                <li><strong>Losses</strong>: {this.props.standing[0].losses}</li>
                <li><strong>Draws</strong>: {this.props.standing[0].draws}</li>
                <li><strong>Goals against</strong>: {this.props.standing[0].goalsAgainst}</li>
                <li><strong>Goal difference</strong>: {this.props.standing[0].goalDifference}</li>
                <li><strong>Played</strong>: {this.props.standing[0].playedGames}</li>
              </ul>
              <Link href="/stats">Home</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
