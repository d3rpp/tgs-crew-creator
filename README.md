# Takapuna Grammar School Rowing Club Crew Creator

My NCEA Level 3.4 assesment for Level 3 Computer Science in 2021

# Using
in order to open the index.html, open the one in the `dist` directory

# Compiling

whilst this repository can easily run without the need to compile, no changes can be made without recompilation

to compile ensure that you have a recent version of NodeJS and NPM installed

to install all of the required packages, use:
```bash
npm i
```

this will install the typescript compiler and the sass compiler
add a `-g` flag at the end to install this globally.

In order to compile it in watch mode, open a terminal or command prompt and run 
```bash
npm run dev
```

**note**
This compilation process requires:
1. php to be installed, this is used as a web server
2. port 1234 to be open
it will build without these but the watch server requires both of these conditions

this will run the compiler in watch mode, any changes will be reflected immediately

**NOTE:** this will only work for MacOS and Linux, if you use windows, run `./.compile.bat` (untested)

---

# Production

in order to deploy this app to production the code should be served with the `dist` folder as the root directory

you should also set the production server to ignore `dotfiles`
