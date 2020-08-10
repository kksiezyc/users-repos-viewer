## Available Scripts

### `run project`
- npm install
- npm run start

### `build project`
- npm run build

### `run tests`
- npm run test


### `stack`
 - react
 - redux, redux-thunk
 - scss modules
 - material-ui
 - react-testing-library

### `personal notes`

I've focused on minimizing the amount of renders in-between changing visible user repos.
After changing visible user's repos, only two users are rerendered (previous and active), 
that's why i used such structure for redux and components connected to it, instead of 
passing props via component-tree.

I didn't spend much time on design, it's basic material-ui.
