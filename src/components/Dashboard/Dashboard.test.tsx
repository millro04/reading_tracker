import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Dashboard from './Dashboard';
import DashboardView from './DashboardView';
import firebase from '../../services/Firebase/Firebase';
import { firestore, onSnapshot } from '../../services/Firebase/__mocks__/Firebase';

firebase.firestore = firestore;

test('Dashboard component renders', () => {
  const component: ShallowWrapper = shallow(<Dashboard />);
  expect(component).toMatchSnapshot();
});

test('DashboardView component renders', () => {
  const component: ShallowWrapper = shallow(
    <DashboardView
      ListGraphData={[
        {
          title: 'Graph Title',
          data: [0, 5, 10],
          labels: ['2020-01-01', '2020-01-02', '2020-01-03'],
        },
      ]}
    />,
  );
  expect(component).toMatchSnapshot();
});

test('Dashboard Component calls firebase onSnapshot when component is mounted', async () => {
  shallow(<Dashboard />);
  expect(onSnapshot).toHaveBeenCalled();
});

test('formatBookDataForGraphs returns data in proper format', async () => {
  // Arrange
  const input = [
    {
      bookName: 'Book One',
      minutesRead: 15,
      dateRead: '2020-02-01',
    },
    {
      bookName: 'Book Two',
      minutesRead: 20,
      dateRead: '2020-02-01',
    },
  ];
  const expected = [
    {
      title: 'Minutes Read Per Day - Book One',
      data: [15],
      labels: ['2020-02-01'],
    },
    {
      title: 'Minutes Read Per Day - Book Two',
      data: [20],
      labels: ['2020-02-01'],
    },
  ];
  const component: ShallowWrapper = shallow(<Dashboard />).instance();
  component.setState({ bookData: input });
  // Act
  const result = component.formatBookDataForGraphs();
  // Assert
  expect(result).toEqual(expected);
});
