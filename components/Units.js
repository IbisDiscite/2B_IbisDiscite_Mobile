import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import  {ApolloProvider} from 'react-apollo';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ApolloClient} from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'

// Initialize the Apollo Client
const client = new ApolloClient({
    link: new HttpLink({ uri: 'http://35.185.3.235:5000/graphiql' }),
    cache: new InMemoryCache(),
  });

// Define query types


class UnitResults extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.result}</Text>
      </View>
    )
  }

  _voteForLink = async () => {
    // ... you'll implement this in chapter 6
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    backgroundColor: 'whitesmoke',
    color: '#4A90E2',
    fontSize: 24,
    padding: 10,
  },
})

const UNIT_QUERY = gql`
  query allUnits{
    allUnits{
      nombre
    }
  }
`;

const result = graphql(UNIT_QUERY)(UnitResults);
export default UnitResults;
