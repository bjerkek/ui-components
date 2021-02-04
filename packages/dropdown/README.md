# @ui-components/dropdown

## Install

```
npm install --save @ui-components/dropdown
```

## Usage

```
<ui-dropdown>
  <ui-dropdown-option value="option_1">Option 1</ui-dropdown-option>
  <ui-dropdown-option value="option_2">Option 2</ui-dropdown-option>
</ui-dropdown>
```

## Props and methods ui-dropdown

| Props              | Observable         | Default | Description                                                                                   |
| ------------------ | ------------------ | ------- | --------------------------------------------------------------------------------------------- |
| data-id            |                    |         | Adds id attribute to the input field.                                                         |
| errormessage       | :heavy_check_mark: |         | Adds a red border on input if set and show the error message below. Also handles aria-invalid |
| placeholder        | :heavy_check_mark: |         |                                                                                               |
| searchable         |                    | false   | Makes the dropdown options searchable                                                         |
| searchablesubtitle |                    | false   | Includes the sub title in the search. Only valid when searchable.                             |
| emptysearchtext    |                    |         | Text shown when there is no search results. Only valid when searchable.                       |

| Methods | Description                    |
| ------- | ------------------------------ |
| reset() | Removes all content from input |

## Props and methods ui-dropdown-option

| Props           | Observable | Default | Description |
| --------------- | ---------- | ------- | ----------- |
| defaultselected |            |         |             |
| value           |            |         |             |
| subtitle        |            |         |             |
