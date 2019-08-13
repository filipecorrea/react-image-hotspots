# react-image-hotspots

React component for rendering images with zoom controls and hotspots.

[Live demo](https://filipecorrea.github.io/react-image-hotspots/)

## Install

Install from _npm_ and include it in your project build process:

```
npm install react-image-hotspots --save
```

Or install from _Yarn_ running:

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

| Props                   | Type                         | Default | Description                |
|-------------------------|------------------------------|---------|----------------------------|
| `src`                   | String, _required_           |         | Image source               |
| `alt`                   | String, _optional_           |         | Image alternative info     |
| `hideFullscreenControl` | Boolean, _optional_          | `false` | Hide fullscreen control    |
| `hideZoomControls`      | Boolean, _optional_          | `false` | Hide zoom controls         |
| `hideMinimap`           | Boolean, _optional_          | `false` | Hide minimap               |
| `hotspots`              | Array of objects, _optional_ | `[]`    | Hotspots                   |
| `background`            | String, _optional_           |         | Container background color |

If image size is smaller than the container size, zoom controls and minimap will be hidden.

### Hotspot properties

| Props     | Type                              | Default | Description                    |
|-----------|-----------------------------------|---------|--------------------------------|
| `x`       | Number, _required_                |         | Percentage vertical position   |
| `y`       | Number, _required_                |         | Percentage horizontal position |
| `content` | React or HTML element, _required_ |         | Hotspot content                |

## Development

### Prerequisites

- [Node.js 10](https://nodejs.org/dist/latest-v10.x/)

Test project running:

```
npm test
```

Run project running:

```
npm start
```

Build project running:

```
npm run build
```
