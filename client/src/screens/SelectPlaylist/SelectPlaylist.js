import * as React from 'react';
import { Text, ScrollView } from 'react-native';
import { List, ListItem } from 'native-base';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { LoadingScreen } from '../components';

class SelectPlaylist extends React.Component {
  static navigationOptions = {
    headerTitle: 'Select a playlist',
  };

  selectPlaylist = async playlist => {
    const { navigation, selectPlaylist } = this.props;
    await selectPlaylist({
      variables: {
        playlistId: playlist.id,
      },
    });
    navigation.navigate('BuildPlaylist', {
      playlistName: playlist.name,
    });
  };

  render() {
    const { data } = this.props;

    if (data.loading) {
      return <LoadingScreen />;
    }

    return (
      <ScrollView>
        <List>
          {data.playlists.map(playlist => (
            <ListItem key={playlist.id} onPress={() => this.selectPlaylist(playlist)}>
              <Text>{playlist.name}</Text>
            </ListItem>
          ))}
        </List>
      </ScrollView>
    );
  }
}

export default compose(
  graphql(gql`
    query Playlists {
      playlists {
        id
        name
      }
    }
  `),
  graphql(
    gql`
      mutation SelectPlaylist($playlistId: String!) {
        selectPlaylist(playlistId: $playlistId) {
          selectedPlaylist {
            name
          }
        }
      }
    `,
    { name: 'selectPlaylist' }
  )
)(SelectPlaylist);
