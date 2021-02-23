# @ui-components/message

## Install

```
npm install --save @ui-components/message
```

## Usage

```
<ui-message
  data-title="I'm Banner, Bruce Banner"
  data-type="info"
  data-action="Main action"
  data-action-secondary="Secondary"
>
  Burn her! Ah, now we see the violence inherent in the system! Well, we did do the nose. What do you mean? You don't frighten us, English pig-dogs! Go and boil your bottoms, sons of a silly person! I blow my nose at you, so-called Ah-thoor Keeng, you and all your silly English K-n-n-n-n-n-n-n-niggits!
  <ul>
    <li>one</li>
    <li>two</li>
    <li>three</li>
  </ul>
</ui-message>
```

## Props and methods

| Props                 | Observable | Default | Description |
| --------------------- | ---------- | ------- | ----------- |
| data-title            |            |         |             |
| data-type             |            | info    |             |
| data-action           |            |         |             |
| data-action-secondary |            |         |             |

## Event

| Event    | Format                  |
| -------- | ----------------------- |
| dismissclick | When closing the message |
| primaryclick | When clicking the primary action button |
| secondaryclick | When clicking the secondary action button |