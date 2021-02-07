# @ui-components/switch

## Install

```
npm install --save @ui-components/switch
```

## Usage

```
<ui-switch>Label</ui-switch>
```

## Props and methods

| Props             | Observable         | Default | Description                                                                                   |
| ----------------- | ------------------ | ------- | --------------------------------------------------------------------------------------------- |
| errormessage      | :heavy_check_mark: |         | Adds a red border on input if set and show the error message below. Also handles aria-invalid |
| data-aria-invalid | :heavy_check_mark: |         | Adds aria-labelledby attribute. Not needed when using errormessage                            |

| Methods | Description                    |
| ------- | ------------------------------ |
| reset() | Removes all content from input |
