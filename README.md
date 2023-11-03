
### Due date
* 11/7 threshold goals (mvp)
* 11/14 target goals (expectation)
* stretch goals

project plan: https://docs.google.com/document/d/1t15SbiCAqZoMu0GFLgzn3APV9Gcw8uJvULoN0XGPI7A/edit?usp=sharing

github: https://github.com/yishanhsieh/info590-fa2023-final-project

Task management tool: HackMD (sync to the readme file)

---

### Task Management (To-do)


| Status      | Item              | Task                                             | Due   |
| ----------- | ----------------- | ------------------------------------------------ | ----- |
| v           | EntryPoint screen | move from entry to question                      | 10/17 |
| v           |                   | Basic layout                                     | 10/17 |
| v           | Random questions  | Test get playlist API(album metadata & song url) | 10/17 |
| v           |                   | randomly get songs                               | 10/24 |
| v           | Random options    | randomly get 3 random options + correct answer   | 10/24 |
| v           |                   | regenerate options & song when clicking a button | 10/24 |
| v           | answer logics     | correct status                                   | 10/31 |
| v           |                   | incorrect status                                 | 10/31 |
| v           | Layout design     | Beautify the entrypoint page                     | 10/31 |
|             |                   | Beautify the layout - random song page           | 11/7  |
|             |                   | Show options with albumName and albumImge        | 11/7  |
| v           |                   | Change fake data to API data                     | 11/7  |
| strech goal | Random Quesiton   | randomly select five songs                       | 11/14 |
|             |                   | show how many questions answered / all           | 11/14 |
|             |                   | when correct, the bkgColor turns green           | 11/14 |

 
---
### Design
:pencil: Wireframe: https://whimsical.com/final-project-cross-platform-programming-GJL24cdD6P8ZwZZknsGmcq

Other design tools:
https://excalidraw.com/
https://www.eraser.io/home


---

### Good resources:

expo go can't run react-native-sound-player
https://forums.expo.dev/t/expo-react-native-track-player/62714

How to use Axios in Reat Native(By Rapid API)
https://rapidapi.com/guides/axios-react-native

How to build an app with react native
https://mihnea.hashnode.dev/how-to-build-an-app-with-react-native

How to hide confidential key(process.env)
https://nodejs.org/api/process.html

SongGuessingGame github project
https://github.com/tigarcia/SongGuessingGame

React Navigation
https://reactnavigation.org/docs/navigating/

Let's build a quiz app with React Native | Expo
https://www.youtube.com/watch?v=esWUVic6IcU&t=2359s




# **---note taking---**


## Text shadow
- This stackoverflow provides Snack example: https://stackoverflow.com/questions/62497218/react-native-textshadow-not-rendering-well-on-sides

## Button shadow
- Notes: IOS and Android render button shadow differently. Android requires `elevation`, while IOS supports props like `shadowColor` . Be sure to use a condition (if it's IOS, then blablabla) or just write both props.
- Resource: https://docs.expo.dev/ui-programming/react-native-styling-buttons/

## Custom fonts
- Install : ``` npx expo install expo-font```
resource: https://docs.expo.dev/versions/latest/sdk/font/#installation
 - Notes: You got to download the fond file into ./assest/fonts, and it seems only Inter-Black works. [The Google Fonts expo packages](https://docs.expo.dev/develop/user-interface/fonts/#use-a-google-font) claim to work out but it doesn't.The log said they cannot locate the font. 
 


## [git]replace main by a branch
https://stackoverflow.com/questions/40864278/git-fixing-conflict-between-master-and-feature-branch-before-pull-request


## process Env version problem
https://docs.expo.dev/guides/environment-variables/


## how to make music Options init status = null

## playSound asynchronously to avoid wrong execution order.
:question: why the song played is always a step behind the albumname?

:robot_face: Due to the order of execution of **asynchronous** functions and the timing of state updates in your code, when you call playSound(songUrl) immediately **after** calling getRandomTrack(), it doesn't guarantee that the songUrl state will be updated before you call playSound().

In RandomOption.js:

```javascript!
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import { Audio } from "expo-av";
import axios from "axios";
import AlbumName from "./AlbumName";

const fakeSong = [
  {
    track: {
      albumName: "ピースサイン",
      songUrl:
        "https://p.scdn.co/mp3-preview/e4ff9d81aaa848d09bb60899f4a0b818b42428fb?cid=d8a5ed958d274c2e8ee717e6a4b0971d",
    },
  },
  ... other fake data
];

export default function RandomOption() {
  const [album, SetAlbum] = useState();
  const [songUrl, SetSongUrl] = useState();
  const [sound, setSound] = useState();

  const getRandomTrack = () => {
    const randomId = Math.floor(Math.random() * fakeSong.length);
    const selectedAlbum = fakeSong[randomId].track.albumName;
    const selectedSong = fakeSong[randomId].track.songUrl;
    SetAlbum(selectedAlbum);
    SetSongUrl(selectedSong);
  };

  async function playSound(songUrl) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync({
      uri: songUrl,
    });
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Button
          title="random song"
          onPress={() => {
            getRandomTrack();
            playSound(songUrl); //soundUrl
          }}
        />
        <Text>Album: {album}</Text>
        <AlbumName selectedAlbum={album} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
    marginTop: 30,
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: "center",
  },
});
```

## includes
Difference between `(randomAlbum !== selectedAlbum)` and `!optionAlbum.includes(selectedAlbum)` :

 ``(randomAlbum !== selectedAlbum)`` ensures that the random album is not the same as the selected album, while the second condition ``(!optionAlbum.includes(selectedAlbum))`` ensures that the selected album is not already part of the random options. 

## shuffle an array
[freeCodeCamp- How to Shuffle an Array of Items Using JavaScript or TypeScript](https://www.freecodecamp.org/news/how-to-shuffle-an-array-of-items-using-javascript-or-typescript/)

There are two ways. One uses for loop, and the other uses .sort().
(I don't know why, but .sort()doesn't change the order of my array.)

## too many re-renders error
The "too many re-renders" error is typically caused by calling a state-setting function within a component's render function, which creates an infinite loop of re-renders. In your code, this error occurs because you are calling the `getRandomOptions` function within the component's render method. Since `getRandomOptions` updates state using `setFinalRandomOptions`, it triggers a re-render, which, in turn, calls `getRandomOptions` again, causing an infinite loop.

## computing order problem
To get an array of random options, there are three steps:
1. randomly select three options from allAlbumName array (from props)
2. add selectedAlbum (correct answer) in to the array by .push().
3. randomize the arrary order

In the third step, my original code is:

```javascript
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";

export default function RandomOptions({ selectedAlbum, allAlbumName }) {
  //randomly select three options from allAlbumName array
  // add selectedAlbum in to the array
  // randomize the arrary order
  let optionAlbum = [];
  let finalRandomOptions = [];

  function getRandomOptions() {
    while (optionAlbum.length < 3) {
      const randomId = Math.floor(Math.random() * allAlbumName.length);
      let randomAlbum = allAlbumName[randomId];
      if (!optionAlbum.includes(randomAlbum)) {
        optionAlbum.push(randomAlbum);
      }
    }
    return optionAlbum.push(selectedAlbum);
  }
  getRandomOptions(); // selectedAlbum is attached in the last one.
  console.log("tempOption is:", optionAlbum);

 function getfinalRandomOptions() {
    while (finalRandomOptions.length < 4) {
      const randomId = Math.floor(Math.random() * optionAlbum.length);
      const finalCandidates = optionAlbum[randomId];
      if (!finalRandomOptions.includes(finalCandidates)) {
        finalRandomOptions.push(finalCandidates);
      }
    }
    console.log("finalOptions are:", finalRandomOptions);
    return finalRandomOptions;
  } 

 getfinalRandomOptions(); 

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>Random options: {item} </Text>
      </View>
    );
  };

  return (
    <View>
      <Text>Song playing: {selectedAlbum}</Text>

      <View style={{ margin: 10 }}>
        <Text>All albumName: {allAlbumName}</Text>
      </View>

      <View style={{ margin: 10 }}>
      <FlatList data={finalRandomOptions} renderItem={renderItem} />

      </View>
    </View>
  );
}
```

However, the song plays with serious lag and cause a broken sound.

:robot_face: said: The lag you are experiencing in your code is likely due to the synchronous nature of JavaScript. When you call `getfinalRandomOptions()` ,it's performing a lot of computation in a loop. This can block the main thread and make your app appear unresponsive or laggy. In a React Native application, you should avoid performing time-consuming tasks in the main thread. 

So, I finally resort to a simpler way to shuffle an array.