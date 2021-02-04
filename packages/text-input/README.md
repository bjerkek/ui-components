# @ui-components/text-input

## Install

```
npm install --save @ui-components/text-input
```

## Usage

```
<ui-text-input></ui-text-input>
```

## Props and methods

| Props                | Observable         | Default | Description                                                                                   |
| -------------------- | ------------------ | ------- | --------------------------------------------------------------------------------------------- |
| data-id              |                    |         | Adds id attribute to the input field.                                                         |
| errormessage         | :heavy_check_mark: |         | Adds a red border on input if set and show the error message below. Also handles aria-invalid |
| defaultvalue         |                    |         | Sets the initial value                                                                        |
| data-placeholder     | :heavy_check_mark: |         | Adds placeholder attribute                                                                    |
| data-readonly        | :heavy_check_mark: |         | Adds readonly attribute                                                                       |
| data-spellcheck      | :heavy_check_mark: |         | Adds spellcheck attribute                                                                     |
| data-autocomplete    | :heavy_check_mark: |         | Adds autocomplete attribute                                                                   |
| data-maxlength       | :heavy_check_mark: |         | Adds maxlength attribute                                                                      |
| data-minlength       | :heavy_check_mark: |         | Adds minlength attribute                                                                      |
| data-aria-label      | :heavy_check_mark: |         | Adds aria-label attribute                                                                     |
| data-aria-labelledby | :heavy_check_mark: |         | Adds aria-labelledby attribute                                                                |

| Methods | Description                    |
| ------- | ------------------------------ |
| reset() | Removes all content from input |
