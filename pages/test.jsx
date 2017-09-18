<div>
  <p>info soon</p>
  <Link href="/">Wait a bit!</Link>

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
  </div>
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
    <Link><a href="/"></a>Home</Link>
  </div>
</div>


<div>
  <Head>
    <title>Info table</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <link rel="stylesheet" href="https://unpkg.com/purecss@0.6.1/build/pure-min.css"/>
  </Head>
  <div className="pure-g">
    <div className="pure-u-1-3"></div>
    <div className="pure-u-1-3">
      <h1>League info</h1>
      <table className="pure-table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Team</th>
            <th>P</th>
            <th>GL</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
          </tr>
        </thead>
        <tbody>
          {this.props.data.standing.map((standing, i) => {
            const oddOrNot = i % 2 == 1 ? "pure-table-odd" : "";
            return (
              <tr key="{i}" className={oddOrNot}>
                <td>{standing.position}</td>
                <td><img className="pure-img logo" src={standing.crestURI} alt=""/></td>
                <td>{standing.points}</td>
                <td>{standing.goals}</td>
                <td>{standing.wins}</td>
                <td>{standing.draws}</td>
                <td>{standing.losses}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <div className="pure-u-1-3"></div>
  </div>
</div>


            {/*<h2>{this.props.standing[0].teamName}</h2>*/}
            {/*<img src={this.props.standing[0].crestURI} className="pure-img" alt="crest"/>
            <h3>Points: {this.props.standing[0].points}</h3>*/}
        {/*<div className="pure-u-12-24">
          <ul style={detailStyle.ul}>
            <li><strong>Goals</strong>: {this.props.standing[0].goals}</li>
            <li><strong>Wins</strong>: {this.props.standing[0].wins}</li>
            <li><strong>Losses</strong>: {this.props.standing[0].losses}</li>
            <li><strong>Draws</strong>: {this.props.standing[0].draws}</li>
            <li><strong>Goals against</strong>: {this.props.standing[0].goalsAgainst}</li>
            <li><strong>Goal difference</strong>: {this.props.standing[0].goalDifference}</li>
            <li><strong>Played</strong>: {this.props.standing[0].playedGames}</li>
          </ul>
          <Link><a href="/"></a>Home</Link>
        </div>*/}
