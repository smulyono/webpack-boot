# Project <%= name %> 

## Build
```
$ yarn install
$ yarn start
```

## Auto platform aware

### Less support
```
$ yarn add less less-loader 
```

### React support
```
$ yarn add react react-dom

add `react` presets on the .babelrc 
(no need to install babel-preset-react since it is already included by webpack-boot)

```

* Update .eslintrc.* if default is not enough. Here is the default
``` 
{
    "extends" : [
        "react-app",
        "plugin:react/recommended"
    ]
}
```

* Update .babelrc with any other presets or plugin. __Suggested presets__ for react

```
{
  "presets": [
      "env",
      "react",
    ]
}
```


### File loader support

```
$ yarn add file-loader
```


---

Created by generator-webpack-boot
