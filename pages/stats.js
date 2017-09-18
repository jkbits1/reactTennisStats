import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';

export default class extends React.Component {
  constructor () {
      super();

      // this.sessionStorageId = 'bpl';
      this.sessionStorageId = 'team5';  
    }

  static async getInitialProps () {
    if (!process.browser) {
      // const url = 'http://api.football-data.org/v1/competitions/426/leagueTable';
      const url = 'https://tennis-stats.herokuapp.com/teams/3';
      
      const res = await axios.get(url);

      // console.log("stats info", res);


      const getSetsCount = (won, player) => {
        let idx = 0;

        if (won === false) {
          idx = 1;
        }

        const info = player.Sets.split('');
        const filt = info.filter(s => {
          return s !== ' ';
        });
        const newJoin = filt.join('');

        return Number(newJoin.split('-')[idx]);
      };

      const getGamesCount = (won, player) => {
        let idx = 0;

        if (won === false) {
          idx = 1;
        }

        const info = player.Games.split('');
        const filt = info.filter(s => {
          return s !== ' ';
        });

        const newJoin = filt.join('');

        return Number(newJoin.split('-')[idx]);
      };

      const getWonCount = player => getSetsCount(true, player);
      const getLostCount = player => getSetsCount(false, player);

      const getGamesWon = player => getGamesCount(true, player);
      const getGamesLost = player => getGamesCount(false, player);

      const rawPlayerInfo = res.data;

      const processedPI = rawPlayerInfo.map(player => {
        const playerProcessed = Object.assign({}, player);

        playerProcessed.SetsWon = getWonCount(player);
        playerProcessed.SetsLost = getLostCount(player);

        playerProcessed.GamesWon = getGamesWon(player);
        playerProcessed.GamesLost = getGamesLost(player);

        return playerProcessed;
      });


      // return {data: res.data}          
      return {
        data: {
          standing: processedPI,
        }
      };       

      // axios.get(url)
      // .then(resp => {
      //   console.log("resp", resp.data);
      //     // return {data: resp.data}          

      //   return {
      //     data: {
      //       standing: resp.data,
      //   }};        
      // });
    } 
    else {
      return {data: JSON.parse(sessionStorage.getItem(this.sessionStorageId))};
    }
  }

  componentDidMount () {
    if (!sessionStorage.getItem(this.sessionStorageId)) {
      sessionStorage.setItem(this.sessionStorageId, JSON.stringify(this.props.data));
    }
  }

  render () {
    const logoStyle = {
      width: '30px'
    };

    return (
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
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Played</th>
                  <th>Won</th>
                  <th>SetsWon</th>
                  <th>SetsLost</th>
                  <th>GamesWon</th>
                  <th>GamesLost</th>
                </tr>
              </thead>
              <tbody>
                {this.props.data.standing.map((standing, i) => {
                  const oddOrNot = i % 2 == 1 ? "pure-table-odd" : "";
                  return (
                    <tr key={i} className={oddOrNot}>
                      {/* <td>{standing.position}</td>
                      <td><img className="pure-img logo" src={standing.crestURI} style={logoStyle} alt=""/></td>
                      <td>{standing.points}</td>
                      <td>{standing.goals}</td>
                      <td>{standing.wins}</td>
                      <td>{standing.draws}</td>
                      <td>{standing.losses}</td>
                      <td><Link href={`/details?id=${standing.position}`}>More info</Link></td> */}

                      <td className="colNumber">{standing.Rank}</td>
                      <td className="table-player-name">{standing.Name}</td>
                      <td className="colNumber">{standing.Played}</td>
                      <td className="colNumber">{standing.Won}</td>
                      <td className="colNumber">{standing.SetsWon}</td>
                      <td className="colNumberLeft">{standing.SetsLost}</td>
                      <td className="colNumber">{standing.GamesWon}</td>
                      <td className="colNumberLeft">{standing.GamesLost}</td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="pure-u-1-3"></div>
        </div>
      </div>
    );
  }
}
