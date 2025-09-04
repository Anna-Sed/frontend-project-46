### Hexlet tests and linter status:
[![Actions Status](https://github.com/Anna-Sed/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Anna-Sed/frontend-project-46/actions)
[![Build](https://github.com/Anna-Sed/frontend-project-46/actions/workflows/build.yml/badge.svg)](https://github.com/Anna-Sed/frontend-project-46/actions/workflows/build.yml)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Anna-Sed_frontend-project-46&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Anna-Sed_frontend-project-46)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Anna-Sed_frontend-project-46&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Anna-Sed_frontend-project-46)

**Difference Generator is a console utility and library that you can use in your projects.**

For install: `make install`

gendiff - utility generates the difference between two files. The utility accepts several types of file extensions: 
1. .json
2. .yml
3. .yaml

The utility accepts files:
1. with absolute paths
2. with relative paths
3. in the current directory

To compare two files you need to enter into the console:
```gendiff your-file1.json your-file2.json```

You can also specify the output format (stylish it`s dafault, json, plain):

```gendiff -f plain your-file1.json your-file2.json```

You can learn about additional options from the command: `gendiff -h`

[![asciicast](https://asciinema.org/a/EQGfXbcsnd5xWStZieIQSzWVp.svg)](https://asciinema.org/a/EQGfXbcsnd5xWStZieIQSzWVp)
