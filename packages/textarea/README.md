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

| Props          | Observable         | Default | Description                                                                                   |
| -------------- | ------------------ | ------- | --------------------------------------------------------------------------------------------- |
| errormessage   | :heavy_check_mark: |         | Adds a red border on input if set and show the error message below. Also handles aria-invalid |
| defaultvalue   |                    |         | Sets the initial value                                                                        |
| readonly       | true               |         |                                                                                               |
| spellcheck     | true               |         |                                                                                               |
| autocomplete   | true               |         |                                                                                               |
| maxlength      | true               |         | Shows a counter of numbers of letters left                                                    |
| arialabel      | true               |         | Adds aria-label attribute                                                                     |
| arialabelledby | true               |         | Adds aria-labelledby attribute                                                                |

| Methods | Description                    |
| ------- | ------------------------------ |
| reset() | Removes all content from input |
