
# `showlove`

Expressing feelings is not always straight forward. Sometimes you might
need to remind someone how much you care about them, without doing so
in person.

This is where `showlove` saves the day. It generates and serves a small
web-app that shows different phrases. When you shake the device, it'll
display a new phrase. Simple and effective.

If the app is added to the home-screen, it will work even if you close
down the server.

## Usage

```
showlove <json-path>
```

## Json config

```json
{
  "port": 3620,
  "icon": "heart",
  "title": "Linus <3",
  "color-fill": "#fef",
  "color-stroke": "#f7c",
  "phrases": [
    "I love you because you support me.",
    "I love you because you're my best friend.",
    "I love you because you inspire me.",
    "I love you bacause <blank>"
  ]
}
```

## Icons

Currently two icons are supported, `heart` and `star`. They will use the
`color-fill` and `color-stroke` variables.
