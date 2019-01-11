import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

const crewPersonnel = [{
  "gender": "male",
  "name": {
    "title": "mr",
    "first": "same",
    "last": "martin"
  },
  "location": {
    "street": "4267 north street",
    "city": "sunderland",
    "state": "county armagh",
    "postcode": "B2 8WN",
    "coordinates": {
      "latitude": "-84.4802",
      "longitude": "-53.2245"
    },
    "timezone": {
      "offset": "-3:30",
      "description": "Newfoundland"
    }
  },
  "id": {
    "name": "NINO",
    "value": "WR 72 12 08 H"
  },
  "picture": {
    "large": "https://randomuser.me/api/portraits/men/84.jpg",
    "medium": "https://randomuser.me/api/portraits/med/men/84.jpg",
    "thumbnail": "https://randomuser.me/api/portraits/thumb/men/84.jpg"
  },
  "nat": "GB"
}];

describe('App', () => {

  it('should render correctly with no props', () => {
    const component = shallow(<App />);
    expect(component).toMatchSnapshot();
  });

  it('should render banner text correctly with given strings', () => {
 
    const component = shallow(<App crewPersonnel={crewPersonnel[0]} />);
    expect(component).toMatchSnapshot();
  });

});