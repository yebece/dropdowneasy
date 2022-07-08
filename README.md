!["Banner"](banner.png)
Dropdown Easy is a multi-purpose JavaScript library to make using dropdown elements in your project much more easier and advanced.

## Installation

You can install it via npm package manager.
```npm
npm install dropdown-easy
```
or via [GitHub](https://github.com/yebece/dropdown-easy/releases/tag/v1.0.0).

## Usage
You can simply start using it by including it in HTML.
```html
<script src="dropdown.js"></script>
```
You must have a container element to open dropdown menu when container triggered. The container element must have "dropdown" as class, and the dropdown menu itself must have "dropdown-menu" as class. Then you can fill and stylize "dropdown-menu" as you want. Here's the structure:

```html
<element class="dropdown">
    <element class="dropdown-menu">
        ...
    </element>
</element>
```
Then you can utilitize and stylize the dropdown menu as you want. Like the example below:

```html
<div class="dropdown fade@0.1s-ease-in secondary-click">
    <div class="dropdown-menu">
        <ul>
            <li>Copy</li>
            <li>Paste</li>
            <li>Cut</li>
            <li>Delete</li>
        </ul>
    </div>
</div>
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
