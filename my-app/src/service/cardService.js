import axios from 'axios';

export function load_new_card(id) {
  return axios.get('https://deckofcardsapi.com/api/deck/'+id+'/draw/?count=1');
}
