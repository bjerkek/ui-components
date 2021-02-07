# @ui-components/amount-input

## Install

```
npm install --save @ui-components/amount-input
```

## Usage

```
<ui-amount-input></ui-amount-input>
```

## Props and methods

| Props                | Observable         | Default | Description                                                                                   |
| -------------------- | ------------------ | ------- | --------------------------------------------------------------------------------------------- |
| data-id              |                    |         | Adds id attribute to the input field.                                                         |
| errormessage         | :heavy_check_mark: |         | Adds a red border on input if set and show the error message below. Also handles aria-invalid |
| defaultvalue         |                    |         | Sets the initial value                                                                        |
| locale               |                    | no      | Supports no and en                                                                            |
| allowdecimals        |                    | false   | Uses , when locale=no and . when locale=en. Uses 2 decimals                                   |
| data-placeholder     | :heavy_check_mark: |         | Adds placeholder attribute                                                                    |
| data-readonly        | :heavy_check_mark: |         | Adds readonly attribute                                                                       |
| data-spellcheck      | :heavy_check_mark: |         | Adds spellcheck attribute                                                                     |
| data-autocomplete    | :heavy_check_mark: |         | Adds autocomplete attribute                                                                   |
| data-maxlength       | :heavy_check_mark: |         | Adds maxlength attribute                                                                      |
| data-minlength       | :heavy_check_mark: |         | Adds minlength attribute                                                                      |
| data-aria-label      | :heavy_check_mark: |         | Adds aria-label attribute                                                                     |
| data-aria-labelledby | :heavy_check_mark: |         | Adds aria-labelledby attribute                                                                |
| data-aria-invalid    | :heavy_check_mark: |         | Adds aria-labelledby attribute. Not needed when using errormessage                            |

| Methods | Description                    |
| ------- | ------------------------------ |
| reset() | Removes all content from input |

## Event

| Event    | Format                  |
| -------- | ----------------------- |
| onchange | Returns 500.00 as 50000 |
