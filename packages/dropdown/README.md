# @ui-components/dropdown

## Install
```
npm install --save @ui-components/dropdown
```

## Usage
```
<ui-dropdown>
  <ui-dropdown-option>Option 1</ui-dropdown-option>
  <ui-dropdown-option>Option 2</ui-dropdown-option>
</ui-dropdown>
```

## Props and methods ui-dropdown
|  Props | Observable | Default | Description |
| --- | --- | --- | --- |
| errormessage | true | | Adds a red border on input if set and show the error message below. Also handles aria-invalid |
| placeholder | true | | |
| searchable | false | false | Makes the dropdown options searchable |
| searchablesubtitle | false | false | Includes the sub title in the search. Only valid when searchable. |
| emptysearchtext | false | | Text shown when there is no search results. Only valid when searchable. |

| Methods | Description |
| --- | --- |
| reset() | Removes all content from input |

## Props and methods ui-dropdown-option
|  Props | Observable | Default | Description |
| --- | --- | --- | --- |
| selected | false | | |
| value | false | | |
| subtitle | false | | |