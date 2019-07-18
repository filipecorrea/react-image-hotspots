# react-image-hotspots

React component for rendering images with zoom controls and hotspots.

## Install

Install from `npm` and include it in your project build process:

```
npm install react-image-hotspots --save
```

If your project uses [Yarn](https://yarnpkg.com/en/):

```
yarn add react-image-hotspots
```

## Usage

```jsx
import ImageHotspots from 'react-image-hotspots'

<ImageHotspots
  src='https://raw.githubusercontent.com/filipecorrea/react-image-hotspots/master/src/landscape.jpg'
  alt='Sample image'
  hotspots={
    [
      { x: 10, y: 30, content: <span>Hotspot 1</span> },
      { x: 40, y: 70, content: <span>Hotspot 2</span> },
      { x: 80, y: 30, content: <span>Hotspot 2</span> }
    ]
  }
/>
```

### Component properties

| Props          | Type                         | Default | Description            |
|----------------|------------------------------|---------|------------------------|
| `src`          | String, _required_           |         | Image source           |
| `alt`          | String, _optional_           |         | Image alternative info |
| `hideControls` | Boolean, _optional_          | `false` | Hide controls          |
| `hotspots`     | Array of objects, _optional_ | `[]`    | Hotspots               |
| `hideHotspots` | Boolean, _optional_          | `false` | Hide hotspots          |

### Hotspot properties

| Props     | Type                              | Default | Description                    |
|-----------|-----------------------------------|---------|--------------------------------|
| `x`       | Number, _required_                |         | Percentage horizontal position |
| `y`       | Number, _required_                |         | Percentage vertical position   |
| `content` | React or HTML element, _required_ |         | Hotspot content                |

## Development

### Prerequisites

- [Node.js 10](https://nodejs.org/dist/latest-v10.x/)

### Test

From project directory, run:

```
npm test
```

### Run

From project directory, run:

```
npm start
```

### Build

From project directory, run:

```
npm run build
```
