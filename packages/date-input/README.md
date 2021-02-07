# @ui-components/date-input

## Install

```
npm install --save @ui-components/date-input
```

## Usage

```
<ui-date-input></ui-date-input>
```

## Props and methods

| Props             | Observable         | Default | Description                                                                                   |
| ----------------- | ------------------ | ------- | --------------------------------------------------------------------------------------------- |
| data-id           |                    |         | Adds id attribute to the input field.                                                         |
| errormessage      | :heavy_check_mark: |         | Adds a red border on input if set and show the error message below. Also handles aria-invalid |
| locale            |                    | no      | Supports no and en                                                                            |
| hidepicker        |                    | false   |                                                                                               |
| data-aria-invalid | :heavy_check_mark: |         | Adds aria-labelledby attribute. Not needed when using errormessage                            |

| Methods | Description                    |
| ------- | ------------------------------ |
| reset() | Removes all content from input |

## Event

| Event    | Formt      |
| -------- | ---------- |
| onchange | YYYY-MM-DD |
