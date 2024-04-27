# Tokenizr
Simple token replacement for text. Useful for common text that only needs to change in small ways. The input value and token replacements are saved in the browser `localStorage` for when you come back next time.

## Live Site
https://ChrisMBarr.github.io/Tokenizr/

## Example
```
Hello,
My name is {{NAME}}, I am {{AGE}} years old and I work for {{COMPANY}}.

Thanks,
 - {{NAME}}
```

* Replace `{{NAME}}` with `Bob`
* Replace `{{AGE}}` with `55`
* Replace `{{COMPANY}}` with `FooCo`

and you get
```
Hello,
My name is Bob, I am 55 years old and I work for FooCo.

Thanks,
 - Bob
```
