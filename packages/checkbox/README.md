# @ui-components/checkbox

## Install

```
npm install --save @ui-components/checkbox
```

## Usage

```
<ui-checkbox>Label</ui-checkbox>
```

## Props and methods

| Props                | Observable         | Default | Description                                                                                   |
| -------------------- | ------------------ | ------- | --------------------------------------------------------------------------------------------- |
| errormessage         | :heavy_check_mark: |         | Adds a red border on input if set and show the error message below. Also handles aria-invalid |
| defaultchecked       |                    | false   |                                                                                               |
| inline               |                    | false   |                                                                                               |
| data-aria-label      | :heavy_check_mark: |         | Adds aria-label attribute                                                                     |
| data-aria-labelledby | :heavy_check_mark: |         | Adds aria-labelledby attribute                                                                |

| Methods | Description           |
| ------- | --------------------- |
| reset() | Unchecks the checkbox |

## Event

| Event    | Return type |
| -------- | ----------- |
| onchange | bool        |
