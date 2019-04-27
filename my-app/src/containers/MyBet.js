import React, { Component } from 'react';
import 'App.css';
import Card from 'components/Card';
import { load_new_card } from "service/cardService";

class MyBet extends Component {
  state = {
    loaded_card: undefined,
    deck_id: 'new',
    myPrediction: '',
    loadedCardValue: 0,
    previousCardValue: 0,
    canShow: false,
  }

  componentDidMount() {
    this.loadNewCard(false);
  }

  loadNewCard = (canShow) => {
    const self = this;
    const { deck_id } = this.state;
    load_new_card(deck_id).then(res => {
      const card = res.data.cards[0];
      let cardValue = self.makeComparator(card.value);
      self.setState({
        loaded_card: res.data.cards[0], deck_id: res.data.deck_id, canShow: canShow,
        loadedCardValue: cardValue
      });
    }).catch(err => {
      console.log('error with loading cards')
    })
  }

  makeComparator(value) {
    let cardValue = -2;
    switch (value) {
      case '1':
        cardValue = 1;
        break;
      case '2':
        cardValue = 2;
        break;
      case '3':
        cardValue = 3;
        break;
      case '4':
        cardValue = 4;
        break;
      case '5':
        cardValue = 5;
        break;
      case '6':
        cardValue = 6;
        break;
      case '7':
        cardValue = 7;
        break;
      case '8':
        cardValue = 8;
        break;
      case '9':
        cardValue = 9;
        break;
      case '10':
        cardValue = 10;
        break;
      case 'JACK':
        cardValue = 11;
        break;
      case 'QUEEN':
        cardValue = 12;
        break;
      case 'KING':
        cardValue = 13;
        break;
      case 'ACE':
        cardValue = 14;
        break;
    }
    return cardValue;
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
    const { loadedCardValue } = this.state;
    this.setState({ previousCardValue: loadedCardValue, loadedCardValue: 0, myPrediction: myPrediction })
  }

  render() {
    const { loadedCardValue, previousCardValue, loaded_card, canShow, myPrediction } = this.state;

    const renderCard = () => {
      if (loaded_card !== undefined && canShow) {
        return <Card cardData={loaded_card} onClickUp={this.handleClickUp} onClickDown={this.handleClickDown}/>
      }
    };

    const showResult = () => {
      if (myPrediction === 'up') {
        if (previousCardValue < loadedCardValue) {
          return <div>You win!</div>;
        }
        return <div>You loose!</div>;
      } else if (myPrediction === 'down') {
        if (previousCardValue > loadedCardValue) {
          return <div>You win!</div>;
        }
        return <div>You loose!</div>;
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
