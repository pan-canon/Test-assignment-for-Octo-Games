# Visual Novel Prototype

This repository contains a simple skeleton for a detective visual novel.

## Setup

Open `src/index.html` in a browser to start the prototype.

## Structure

- `src/core`: domain classes.
- `src/adapters`: DOM adapter.
- `src/config`: game configuration.
- `src/styles`: BEM-based styles.
- `src/scripts`: initialization.
- `docs/TZ.md`: technical specification in Russian.

## Configuration

Game content is defined in `src/config/screens.js` as an array of screen objects. Each screen describes images, texts, and optional actions for male and female characters.

### Screen template

```js
{
  id: 'screen-id',
  relationshipThreshold: 2, // optional minimum relationship required to show the screen
  images: {
    male: 'path/to/male-image.png',
    female: 'path/to/female-image.png'
  },
  texts: {
    male: 'Text shown when the male character is selected.',
    female: 'Text shown when the female character is selected.'
  },
  actions: {
    male: [
      { text: 'Option text', effect: 1, next: 'next-screen-id' }
    ],
    female: [
      { text: 'Option text', effect: 1, next: 'next-screen-id' }
    ]
  }
}
```
