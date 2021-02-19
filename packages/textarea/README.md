# @ui-components/textarea

## Install

```
npm install --save @ui-components/textarea
```

## Usage

```
<ui-textarea></ui-textarea>
```

## Props and methods

| Props             | Observable         | Default | Description                                                                                   |
| ----------------- | ------------------ | ------- | --------------------------------------------------------------------------------------------- |
| data-id           |                    |         | Adds id attribute to the input field.                                                         |
| errormessage      | :heavy_check_mark: |         | Adds a red border on input if set and show the error message below. Also handles aria-invalid |
| defaultvalue      |                    |         | Sets the initial value                                                                        |
| readonly          | :heavy_check_mark:               |         |                                                                                               |
| spellcheck        | :heavy_check_mark:               |         |                                                                                               |
| autocomplete      | :heavy_check_mark:               |         |                                                                                               |
| maxlength         | :heavy_check_mark:               |         | Shows a counter of numbers of letters left                                                    |
| arialabel         | :heavy_check_mark:               |         | Adds aria-label attribute                                                                     |
| arialabelledby    | :heavy_check_mark:               |         | Adds aria-labelledby attribute                                                                |
| data-aria-invalid | :heavy_check_mark: |         | Adds aria-labelledby attribute. Not needed when using errormessage                            |

| Methods | Description                    |
| ------- | ------------------------------ |
| reset() | Removes all content from input |
