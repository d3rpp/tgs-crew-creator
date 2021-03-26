# Takapuna Grammar School Rowing Club Crew Creator

My NCEA Level 3.4 assesment for Level 3 Computer Science in 2021

# Compiling

whilst this repository can easily run without the need to compile, no changes can be made without recompilation

to compile ensure that you have a recent version of NodeJS and NPM installed

to install all of the required packages, use:
```bash
npm i concurrently tsc-watch typescript sass
```

this will install the typescript compiler and the sass compiler
add a `-g` flag at the end to install this globally.

In order to compile it in watch mode, open a terminal or command prompt and run 
```bash
bash ./.compile.sh
```
this will run the compiler in watch mode, any changes will be reflected immediately

**NOTE:** this will only work for MacOS and Linux, if you use windows, run `./.compile.bat` (untested)

---

# Production

in order to deploy this app to production, for security reason, it may be wise to delete the `src` folder as it is the source code

you should also set the production server to ignore `dotfiles`
