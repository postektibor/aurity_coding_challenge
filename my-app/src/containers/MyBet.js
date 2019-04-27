import React, { Component } from 'react';
import 'App.css';
import Card from 'components/Card';
import { load_new_card } from "service/cardService";

class MyBet extends Component {
  state = {
    loaded_card: undefined,
    deck_id: 'new',
    myPrediction: '',
    previousCard: undefined,
    loadedCardValue: -1,
    canShow: false,
  }

  componentDidMount() {
    const self = this;
    const { deck_id } = this.state;
    this.loadNewCard(false);
  }

  loadNewCard = (canShow) => {
    const self = this;
    const { deck_id } = this.state;
    load_new_card(deck_id).then(res => {
      const cardValue = res.data.card[0].map(card => {
        let number;
        switch (card.value) {
          case '1':
            number = 1;
            break;
          case '2':
            number = 2;
            break;
          case '3':
            number = 3;
            break;
          case '4':
            number = 4;
            break;
          case '5':
            number = 5;
            break;
          case '6':
            number = 6;
            break;
          case '7':
            number = 7;
            break;
          case '8':
            number = 8;
            break;
          case '9':
            number = 9;
            break;
          case '10':
            number = 10;
            break;
          case 'JACK':
            number = 11;
            break;
          case 'QUEEN':
            number = 12;
            break;
          case 'KING':
            number = 13;
            break;
          case 'ACE':
            number = 14;
            break;
          default:
            number = -2;
            break;
        }
        return number;
      });

      self.setState({
        loaded_card: res.data.cards[0], deck_id: res.data.deck_id, canShow: canShow,
        loadedCardValue: cardValue
      });
    }).catch(err => {
      console.log('error with loading cards')
    })
  }

  handleClickUp = (event) => {
    this.saveCurrentCard('up');
    this.loadNewCard(true);
  }

  handleClickDown = (event) => {
    this.saveCurrentCard('down');
    this.loadNewCard(true);
  }

  saveCurrentCard = (myPrediction) => {
    const { loaded_card } = this.state;
    this.setState({ previosCard: loaded_card, loaded_card: undefined, myPrediction: myPrediction })
  }

  render() {
    const { loaded_card, canShow, previousCard, myPrediction } = this.state;

    const renderCard = () => {
      if (loaded_card !== undefined && canShow) {
        return <Card cardData={loaded_card} onClickUp={this.handleClickUp} onClickDown={this.handleClickDown}/>
      }
    };

    const showResult = () => {
      console.log('showing result')
      if (previousCard && loaded_card) {
        //there can be used case :)
        if (myPrediction === 'up') {
          //there must be own comaparator or using map!
          if (previousCard.value < loaded_card.value) {
            return <div>You win!</div>;
          } else return <div>You loose!</div>;
        } else if (myPrediction === 'down') {
          //there must be own comaparator or using map!
          if (previousCard.value > loaded_card.value) {
            return <div>You win!</div>;
          } else return <div>You loose!</div>;
        }
      }
    }

    return (
      <div>
        {renderCard()}
        <button onClick={this.handleClickUp}>Up</button>
        <button onClick={this.handleClickDown}>Down</button>
        {showResult()}
      </div>
    )
  }
};

export default MyBet;
